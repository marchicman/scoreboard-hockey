<template>
  <q-page padding>
    <h5>Statistiche della partita</h5>
    <ul>
      <li v-for="(event,idx) in events" :key="idx">{{ event.matchTime }} ({{ event.matchTimeElapsed }})- Periodo: {{ event.period }} - {{ eventDesc(event) }}</li>
    </ul>
  </q-page>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import { eventTypesEnum } from '../utils/enums'
import { formatTime } from '../utils/dateUtils'

export default defineComponent({
  name: 'Statistics',
  setup () {
    const $store = useStore()

    const events = computed(() => {
      return $store.getters['scoreboard/events']
    })

    const eventDesc = (evt) => {
      let description = ''
      switch (evt.type) {
        case eventTypesEnum.start_match:
          description = 'Partita iniziata ( durata:' + evt.originalMatchTime + ')'
          break
        case eventTypesEnum.end_match:
          description = 'Partita finita'
          break
        case eventTypesEnum.start_period:
          description = 'Inizio periodo'
          break
        case eventTypesEnum.end_period:
          description = 'Fine periodo'
          break
        case eventTypesEnum.goal:
          description = 'Goal squadra ' + evt.teamName + ' goal: ' + evt.playerGoal + (evt.playerAssist ? ' assit:' + evt.playerAssist : '')
          break
        case eventTypesEnum.begin_penalty:
          description = 'Penalità squadra ' + evt.teamName + ' giocatore : ' + evt.player + ' ' + evt.description + ' (' + formatTime(evt.duration) + ')'
          break
        case eventTypesEnum.end_penalty:
          description = 'Fine penalità squadra ' + evt.teamName + ' giocatore : ' + evt.player
          break
        case eventTypesEnum.timeout:
          description = 'Timeout squadra ' + evt.teamName
          break
      }

      return description
    }

    return { events, eventDesc }
  }
})
</script>
