<template lang="html">
  <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section>
          <span class="digit">{{ playerNumber }}</span>
        </q-card-section>

        <q-separator vertical />

        <q-card-section>
           <CountDown v-bind:time="penaltyDuration"
                      v-bind:is-running="playMode"
                      @time-elapsed="onPenaltyEnd"
                      @update:time="onUpdateTime"
                      :key="step"/>
        </q-card-section>

      </q-card-section>
      <q-menu
       touch-position
       context-menu>
       <q-item clickable v-close-popup>
            <q-item-section @click="onPenaltyEnd">Chiudi</q-item-section>
       </q-item>
       <q-item clickable v-close-popup>
            <q-item-section @click="() => adjustPenalty(1)">+1 sec</q-item-section>
       </q-item>
       <q-item clickable v-close-popup>
            <q-item-section @click="() => adjustPenalty(-1)">-1 sec</q-item-section>
       </q-item>
   </q-menu>
    </q-card>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'

import CountDown from 'components/CountDown.vue'

export default defineComponent({
  name: 'PlayerPenalty',
  components: {
    CountDown
  },
  props: {
    teamId: {
      type: Number,
      required: true
    },
    penalty: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const $store = useStore()

    const step = ref(0)
    const playerNumber = computed(() => {
      return props.penalty.player > 10 ? props.penalty.player + '' : '0' + props.penalty.player
    })
    /* const penaltyDuration = computed(() => {
      return props.penalty.duration
    }) */
    // const penaltyDuration = ref(props.penalty.duration)
    const penaltyDuration = computed({
      get: () => props.penalty.duration,
      set: val => {
        $store.commit('scoreboard/updatePenaltyDuration', {
          teamId: props.teamId,
          playerNumber: props.penalty.player,
          duration: val
        })
      }
    })
    const playMode = computed(() => {
      return $store.getters['scoreboard/playMode']
    })
    const onPenaltyEnd = () => {
      console.log('penalità finita ' + props.penalty.player)
      $store.commit('scoreboard/finishPenalty', { teamId: props.teamId, playerNumber: props.penalty.player })
    }
    const adjustPenalty = (val) => {
      console.log(penaltyDuration.value)
      penaltyDuration.value += val
      step.value += val
    }
    const onUpdateTime = (val) => {
      penaltyDuration.value = val
    }
    return { step, playerNumber, penaltyDuration, playMode, onPenaltyEnd, onUpdateTime, adjustPenalty }
  }
})
</script>

  <style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 350px

  .digit
    font-family: clockicons
    font-size: 10vh
    color: red

  </style>
