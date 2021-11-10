<template lang="html">
  <div class="column items-center">
    <CountDown v-model:time="matchTime" v-bind:is-running="playMode" v-bind:size="20" :key="step"/>
    <div class="col">
      <q-btn icon="remove_circle_outline" @click="decreaseMatchTime" :disable="playMode"/>
      <q-btn :icon="btnIcon" @click="onPlayClicked"/>
      <q-btn icon="add_circle_outline" @click="increaseMatchTime" :disable="playMode"/>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

import CountDown from 'components/CountDown.vue'

export default defineComponent({
  name: 'MatchTime',
  components: {
    CountDown
  },
  setup () {
    const $store = useStore()

    const step = ref(0)
    const btnIcon = ref('play_arrow')
    const matchTime = computed({
      get: () => $store.getters['scoreboard/matchTime'],
      set: val => {
        $store.commit('scoreboard/updateMatchTime', val)
      }
    })
    const playMode = computed({
      get: () => $store.getters['scoreboard/playMode'],
      set: val => {
        $store.commit('scoreboard/updatePlayMode', val)
      }
    })
    const onPlayClicked = () => {
      playMode.value = !playMode.value
      btnIcon.value = playMode.value ? 'pause' : 'play_arrow'
    }
    const increaseMatchTime = () => {
      $store.commit('scoreboard/increaseMatchTime', 60)
      step.value += 60
    }
    const decreaseMatchTime = () => {
      $store.commit('scoreboard/updatePlayMode', -60)
      step.value -= 60
    }
    return {
      step,
      matchTime,
      playMode,
      btnIcon,
      onPlayClicked,
      increaseMatchTime,
      decreaseMatchTime
    }
  }
})
</script>
