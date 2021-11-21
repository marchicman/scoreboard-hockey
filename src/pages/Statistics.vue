<template>
  <q-page padding>
    <h5>Statistiche della partita</h5>
    <ul>
      <li v-for="(event,idx) in events" :key="idx">{{ event.matchTime }} {{ eventTypeName(event.type) }}</li>
    </ul>
  </q-page>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import { eventTypes } from '../utils/enums'

export default defineComponent({
  name: 'Statistics',
  setup () {
    const $store = useStore()

    const events = computed(() => {
      return $store.getters['scoreboard/events']
    })

    const eventTypeName = (evtType) => {
      return eventTypes[evtType].replace('_', ' ')
    }

    return { events, eventTypeName }
  }
})
</script>
