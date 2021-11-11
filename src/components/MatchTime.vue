<template lang="html">
  <div class="column items-center">
    <CountDown v-model:time="matchTime" v-bind:is-running="playMode" v-bind:size="20" :key="step"/>
    <div class="col">
      <q-btn icon="replay_5" @click="() => decreaseMatchTime(5)" :disable="playMode"/>
      <q-btn icon="remove_circle_outline" @click="() => decreaseMatchTime(1)" :disable="playMode"/>
      <q-btn :icon="btnIcon" @click="onPlayClicked"/>
      <q-btn icon="add_circle_outline" @click="() => increaseMatchTime(1)" :disable="playMode"/>
      <q-btn icon="forward_5" @click="() => increaseMatchTime(5)" :disable="playMode"/>
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
    const increaseMatchTime = (val) => {
      $store.commit('scoreboard/increaseMatchTime', 60 * val)
      step.value += 60 * val
    }
    const decreaseMatchTime = (val) => {
      $store.commit('scoreboard/increaseMatchTime', -60 * val)
      step.value -= 60 * val
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
