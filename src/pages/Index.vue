<template>
  <q-page>
      <div class="row items-center">
        <div class="col-4" style="align-self:flex-start;">
            <TeamScore :team="homeTeam" style="align-content:stretch;"/>
        </div>
        <div class="col-4">
          <div class="column items-center">
            <div class="col">
              <MatchTime v-show="matchMode"/>
              <CountDown v-bind:time="timeoutTime"
                         @time-elapsed="onTimeoutEnd"
                         v-if="timeoutMode"
                         v-bind:size="18"
                         v-bind:is-running="timeoutMode"/>
              <CountDown v-bind:time="intervalTime"
                         @time-elapsed="onBreakEnd"
                         v-if="breakMode"
                         v-bind:size="18"
                         v-bind:is-running="breakMode"/>
              <CountDown v-bind:time="warmupTime"
                         @time-elapsed="onWarmupEnd"
                         v-if="warmupMode"
                         v-bind:size="18"
                         v-bind:is-running="warmupMode"/>
            </div>
            <div class="col-auto q-mt-md">
              <span class="period_label text-uppercase">Periodo</span>
            </div>
            <div class="col-auto period_digit cursor-pointer">
              <span>{{ period }}</span>
              <q-popup-edit v-model="period" auto-save v-slot="scope">
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </div>
            <div class="col-auto q-mt-md text-center">
              <span class="text-uppercase text-h2 text-bold">{{ infoMsg }}</span>
            </div>
          </div>
        </div>
        <div class="col-4" style="align-self:flex-start;">
          <TeamScore :team="visitorTeam" style="align-content:stretch;" align-style="flex-end"/>
        </div>
      </div>
      <!--  <q-dialog
          v-model="timeoutMode">
          <q-card style="width: 400px; max-width: 80vw;">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Timeout {{ timeoutTeam }}</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="column items-center">
                <CountDown v-bind:time="timeoutTime" @time-elapsed="onTimeoutEnd"/>
              </div>
            </q-card-section>
         </q-card>
      </q-dialog>
      <q-dialog
              v-model="breakMode">
             <q-card style="width: 700px; max-width: 80vw;">
               <q-card-section class="row items-center q-pb-none">
                   <div class="text-h6">Intervallo</div>
                   <q-space />
                   <q-btn icon="close" flat round dense v-close-popup />
                 </q-card-section>
                <q-card-section class="q-pt-none">
                  <div class="column items-center">
                    <CountDown v-bind:time="intervalTime" @time-elapsed="onBreakEnd"/>
                  </div>
                </q-card-section>
             </q-card>
      </q-dialog>
      <q-dialog
              v-model="warmupMode">
             <q-card style="width: 700px; max-width: 80vw;">
               <q-card-section class="row items-center q-pb-none">
                   <div class="text-h6">Riscaldamento</div>
                   <q-space />
                   <q-btn icon="close" flat round dense v-close-popup />
                 </q-card-section>
                <q-card-section class="q-pt-none">
                  <div class="column items-center">
                    <CountDown v-bind:time="warmupTime" @time-elapsed="onWarmupEnd"/>
                  </div>
                </q-card-section>
             </q-card>
      </q-dialog> -->
  </q-page>
</template>

<script>
import { defineComponent, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

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
    const $q = useQuasar()

    const breakMode = computed({
      get: () => $store.getters['scoreboard/breakMode'],
      set: val => {
        $store.commit('scoreboard/updateBreakMode', val)
      }
    })
    const warmupMode = computed({
      get: () => $store.getters['scoreboard/warmupMode'],
      set: val => {
        $store.commit('scoreboard/updateWarmUpMode', val)
      }
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
    /* const timeoutMode = computed(() => {
      return $store.getters['scoreboard/timeoutMode']
    }) */
    const timeoutMode = computed({
      get: () => $store.getters['scoreboard/timeoutMode'],
      set: val => {
        $store.commit('scoreboard/finishTimeout')
      }
    })

    const playMode = computed({
      get: () => $store.getters['scoreboard/playMode'],
      set: val => {
        $store.commit('scoreboard/updatePlayMode', val)
      }
    })

    const matchMode = computed(() => {
      return $store.getters['scoreboard/matchMode']
    })

    const timeoutTeam = computed(() => {
      return $store.getters['scoreboard/timeoutTeam']
    })

    const timeoutTime = computed(() => {
      return $store.getters['scoreboard/timeoutTime']
    })

    const intervalTime = computed(() => {
      return $store.getters['scoreboard/intervalTime']
    })

    const warmupTime = computed(() => {
      return $store.getters['scoreboard/warmupTime']
    })

    const infoMsg = computed(() => {
      return $store.getters['scoreboard/infoMsg']
    })

    const onBreakEnd = () => {
      breakMode.value = false
    }
    const onTimeoutEnd = () => {
      $store.commit('scoreboard/finishTimeout')
    }
    const onWarmupEnd = () => {
      warmupMode.value = false
    }

    const keyListener = (e) => {
      if ($store.getters['scoreboard/penaltyMode']) {
        return
      }
      // https://forum.quasar-framework.org/topic/4859/where-do-i-find-docs-info-on-custom-keyboard-shortcuts-solved/6
      if (e.key === 's' && matchMode.value) {
        playMode.value = !playMode.value
      } else if (e.key === 'b') {
        breakMode.value = !breakMode.value
      } else if (e.key === 'w') {
        warmupMode.value = !warmupMode.value
      } else if (e.key === 'i') {
        onTimeoutEnd()
      } else if (e.key === 'f') {
        $q.fullscreen.toggle()
      } else if (e.key === 'd') {
        $q.dark.toggle()
      }
    }

    onMounted(() => {
      console.log('onMounted')
      document.addEventListener('keydown', keyListener)
    })

    onUnmounted(() => {
      console.log('onUnmounted')
      document.removeEventListener('keydown', keyListener)
    })

    return {
      breakMode,
      matchMode,
      warmupMode,
      playMode,
      period,
      infoMsg,
      timeoutMode,
      timeoutTeam,
      timeoutTime,
      intervalTime,
      warmupTime,
      homeTeam,
      visitorTeam,
      onTimeoutEnd,
      onBreakEnd,
      onWarmupEnd
    }
  }
})
</script>

<style lang="css" scoped>
.period_label {
    font-weight: bold;
    font-size: 5vh;
}

.period_digit {
  font-family: clockicons;
  font-size: 14vh;
  color: yellow;
}

.clock {
  font-family: clockicons;
  font-size: 10vh;
  color: red;
}
</style>
