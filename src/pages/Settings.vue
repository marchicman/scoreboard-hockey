<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-md" style="max-width: 300px">

      <q-input
          v-model="homeTeam"
          label="Nome Squadra casa"/>

      <q-input
          v-model="visitorTeam"
          label="Nome Squadra ospite"/>

      <q-input
        v-model.number="matchTime"
        type="number"
        label="Tempo Periodo (sec.)"/>

      <q-input
             v-model.number="timeoutTime"
             type="number"
             label="Tempo Time-out (sec.)"/>

     <q-input
            v-model.number="intervalTime"
            type="number"
            label="Tempo Intervallo (sec.)"/>

      <q-input
             v-model.number="warmupTime"
             type="number"
             label="Tempo Riscaldamento (sec.)"/>
   </div>
  </q-page>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Settings',
  setup () {
    const $store = useStore()

    const homeTeam = computed({
      get: () => $store.getters['scoreboard/homeTeamName'],
      set: val => {
        $store.commit('scoreboard/updateHomeTeamName', val)
      }
    })

    const visitorTeam = computed({
      get: () => $store.getters['scoreboard/visitorTeamName'],
      set: val => {
        $store.commit('scoreboard/updateVisitorTeamName', val)
      }
    })

    const matchTime = computed({
      get: () => $store.getters['scoreboard/matchTime'],
      set: val => {
        $store.commit('scoreboard/updateMatchTime', val)
      }
    })

    const timeoutTime = computed({
      get: () => $store.getters['scoreboard/timeoutTime'],
      set: val => {
        $store.commit('scoreboard/updateTimeoutTime', val)
      }
    })

    const intervalTime = computed({
      get: () => $store.getters['scoreboard/intervalTime'],
      set: val => {
        $store.commit('scoreboard/updateIntervalTime', val)
      }
    })

    const warmupTime = computed({
      get: () => $store.getters['scoreboard/warmupTime'],
      set: val => {
        $store.commit('scoreboard/updateWarmupTime', val)
      }
    })

    return { homeTeam, visitorTeam, matchTime, timeoutTime, intervalTime, warmupTime }
  }
})
</script>
