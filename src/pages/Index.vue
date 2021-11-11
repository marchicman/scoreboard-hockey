<template>
  <q-page>
      <div class="row items-start justify-center">
        <div class="col-3">
            <TeamScore :team="homeTeam"/>
        </div>
        <div class="col-6">
          <div class="column items-center">
            <div class="col">
              <MatchTime />
            </div>
            <div class="col-auto q-mt-md">
              <span class="period_label">Periodo</span>
            </div>
            <div class="col-auto period_digit cursor-pointer">
              <span>{{ period }}</span>
              <q-popup-edit v-model="period" auto-save v-slot="scope">
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </div>
          </div>
        </div>
        <div class="col-3">
          <TeamScore :team="visitorTeam"/>
        </div>
      </div>
      <q-dialog
          v-model="timeoutMode">
          <q-card>
            <q-card-section class="justify-center">
              <div class="text-h6">Timeout {{ timeoutTeam }}</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="column items-center">
                <CountDown v-bind:time="60" @time-elapsed="onTimeoutEnd"/>
              </div>
            </q-card-section>
         </q-card>
      </q-dialog>
      <q-dialog
              v-model="breakMode">
             <q-card persistent style="width: 700px; max-width: 80vw;">
                <q-card-section class="justify-center">
                  <div class="text-h6">Intervallo</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <div class="column items-center">
                    <CountDown v-bind:time="600" @time-elapsed="onBreakEnd"/>
                  </div>
                </q-card-section>
             </q-card>
      </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import MatchTime from 'components/MatchTime.vue'
import TeamScore from 'components/TeamScore.vue'
import CountDown from 'components/CountDown.vue'
// import CountDownDialog from 'components/CountDownDialog.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    CountDown,
    MatchTime,
    TeamScore
  },
  setup () {
    const $store = useStore()

    const breakMode = computed(() => {
      return $store.getters['scoreboard/breakMode']
    })
    const period = computed({
      get: () => $store.getters['scoreboard/period'],
      set: val => {
        $store.commit('scoreboard/updatePeriod', val)
      }
    })
    const homeTeam = computed(() => {
      return $store.getters['scoreboard/homeTeam']
    })
    const visitorTeam = computed(() => {
      return $store.getters['scoreboard/visitorTeam']
    })
    const timeoutMode = computed(() => {
      return $store.getters['scoreboard/timeoutMode']
    })
    const timeoutTeam = computed(() => {
      return $store.getters['scoreboard/timeoutTeam']
    })
    const onBreakEnd = () => {
      breakMode.value = false
    }
    const onTimeoutEnd = () => {
      $store.commit('scoreboard/finishTimeout')
    }

    return { breakMode, period, timeoutMode, timeoutTeam, homeTeam, visitorTeam, onTimeoutEnd, onBreakEnd }
  }
})
</script>

<style lang="css" scoped>
.period_label {
    font-weight: bold;
    font-size: 3vh;

}

.period_digit {
  font-family: clockicons;
  font-size: 8vh;
  color: red;
}

.clock {
  font-family: clockicons;
  font-size: 10vh;
  color: red;
}
</style>
