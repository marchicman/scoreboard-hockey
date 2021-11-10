<template lang="html">
  <div class="column">
  <q-card>
     <q-card-section class="q-pt-none">
       <q-item clickable>
         <q-item-section class="text-h6">{{ teamName }}</q-item-section>
         <q-popup-edit v-model="teamName" auto-save v-slot="scope">
           <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
         </q-popup-edit>
       </q-item>
      </q-card-section>

      <q-separator inset />

      <q-card-section class="flex items-center justify-center">
        <div class="column items-center cursor-pointer">
          <span class="teamscore">{{ teamScore }}</span>
          <q-popup-edit v-model="teamScore" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
      </q-card-section>

      <q-separator />
      <q-card-actions>
         <q-btn push
                color="white"
                text-color="primary"
                label="Timeout"
                @click="callTimeout">
           <q-badge color="orange" floating>{{ teamTimeout }}</q-badge>
          </q-btn>
          <q-btn
                push
                color="white"
                text-color="primary"
                label="Penalità"
                @click="penalty = true" />
      </q-card-actions>
    </q-card>
      <div class="col">
        <PlayerPenalty v-for="teamPenalty in teamPenalties" :teamId="teamId" :penalty="teamPenalty" :key="teamPenalty.player" class="q-mt-xs"/>
      </div>
      <q-dialog v-model="penalty">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Penalità {{ teamName }}</div>
          </q-card-section>
          <q-card-section>
           <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-gutter-md">
              <q-input
                      v-model.number="foulTime"
                      type="number"
                      filled
                      label="Durata"/>
              <q-input
                v-model.number="foulPlayer"
                type="number"
                filled
                label="Numero giocatore"/>
              <q-input
                      filled
                      v-model="foulType"
                      label="Descrizione"/>
              <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
          </q-form>
        </q-card-section>
       </q-card>
      </q-dialog>
    </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'

import PlayerPenalty from 'components/PlayerPenalty.vue'

export default defineComponent({
  name: 'TeamScore',
  components: {
    PlayerPenalty
  },
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const $store = useStore()

    const penalty = ref(false)
    const foulTime = ref(2)
    const foulType = ref(null)
    const foulPlayer = ref(null)
    const teamId = computed(() => {
      return props.team.id
    })
    /* const teamName = computed(() => {
      return props.team.name
    }) */
    const teamName = computed({
      get: () => props.team.name,
      set: val => {
        $store.commit('scoreboard/updateTeamName', { teamId: props.team.id, name: val })
      }
    })
    const teamScore = computed({
      get: () => props.team.score,
      set: val => {
        $store.commit('scoreboard/updateScore', { teamId: props.team.id, score: val })
      }
    })
    const teamTimeout = computed(() => {
      return props.team.timeout
    })
    const teamPenalties = computed(() => {
      return props.team.penalties
    })
    const playMode = computed(() => {
      return $store.getters['scoreboard/playMode']
    })
    const callTimeout = () => {
      // $store.commit('scoreboard/timeoutCalled', teamName.value)
      $store.commit('scoreboard/timeoutCalled', props.team.id)
    }
    const onReset = () => {
      foulTime.value = 2
      foulPlayer.value = null
      foulType.value = null
      penalty.value = false
    }

    const onSubmit = () => {
      $store.commit('scoreboard/insertPenalty', { teamId: props.team.id, foulTime: foulTime.value, foulPlayer: foulPlayer.value, foulType: foulType.value })
      onReset()
    }

    return { penalty, foulTime, foulPlayer, foulType, teamId, teamName, teamScore, teamTimeout, teamPenalties, playMode, callTimeout, onReset, onSubmit }
  }
})
</script>

<style lang="css" scoped>
h2 {
  font-family: clockicons !important;
}

.teamscore {
  font-family: clockicons;
  font-size: 12vh;
  color: red;
}
</style>
