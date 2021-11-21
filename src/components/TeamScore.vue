<template lang="html">
  <div class="column" >
    <div class="col" :style="styleObject">
      <q-card flat class="my-card">
         <q-card-section class="q-pt-none">
           <q-item>
             <q-item-section class="text-h6">{{ teamName }}</q-item-section>
           </q-item>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="flex items-center justify-center">
            <div class="column items-center cursor-pointer">
              <span class="teamscore" @click="score = true" :disable="playMode">{{ teamScore }}</span>
            </div>
          </q-card-section>

          <q-separator inset />
          <q-card-actions>
             <q-btn push
                    color="white"
                    text-color="primary"
                    label="Timeout"
                    @click="callTimeout" :disable="playMode">
               <q-badge color="orange" floating>{{ teamTimeout }}</q-badge>
              </q-btn>
              <q-btn
                    push
                    color="white"
                    text-color="primary"
                    label="Penalità"
                    @click="penalty = true" :disable="playMode"/>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col" :style="styleObject">
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
                <q-btn label="Ok" type="submit" color="primary"/>
                <q-btn label="Chiudi" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
          </q-form>
        </q-card-section>
       </q-card>
      </q-dialog>
      <q-dialog v-model="score" @before-show="initializeScoreAssist">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Goal {{ teamName }}</div>
          </q-card-section>
          <q-card-section>
           <q-form
                  @submit="onSubmitScoreAssist"
                  @reset="onResetScoreAssist"
                  class="q-gutter-md">
              <q-input
                v-model.number="goal"
                type="number"
                filled
                label="Goal"/>
              <q-input
                v-model.number="playerGoal"
                type="number"
                filled
                label="Marcatore"/>
              <q-input
                v-model.number="playerAssist"
                type="number"
                filled
                label="Assist"/>
              <div>
                <q-btn label="Ok" type="submit" color="primary"/>
                <q-btn label="Chiudi" type="reset" color="primary" flat class="q-ml-sm" />
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
import { eventTypesEnum } from '../utils/enums'

export default defineComponent({
  name: 'TeamScore',
  components: {
    PlayerPenalty
  },
  props: {
    team: {
      type: Object,
      required: true
    },
    alignStyle: {
      type: String,
      default: 'flex-start'
    }
  },
  setup (props) {
    const $store = useStore()

    const penalty = ref(false)
    const score = ref(false)
    const foulTime = ref(2)
    const foulType = ref(null)
    const foulPlayer = ref(null)
    const goal = ref(0)
    const playerGoal = ref(null)
    const playerAssist = ref(null)
    const styleObject = ref({
      'align-self': props.alignStyle
    })
    const teamId = computed(() => {
      return props.team.id
    })
    const teamName = computed({
      get: () => props.team.name,
      set: val => {
        $store.commit('scoreboard/updateTeamName', { teamId: props.team.id, name: val })
      }
    })
    const teamScore = computed(() => {
      return props.team.score
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

    const onResetScoreAssist = () => {
      score.value = false
    }

    const onSubmitScoreAssist = () => {
      $store.commit('scoreboard/insertEvent', {
        type: eventTypesEnum.goal,
        score: goal.value,
        playerGoal: playerGoal.value,
        playerAssist: playerAssist.value,
        teamId: props.team.id
      })
      onResetScoreAssist()
    }

    const initializeScoreAssist = () => {
      console.log('initializeScoreAssist')
      playerGoal.value = null
      playerAssist.value = null
      goal.value = teamScore.value
    }

    return {
      styleObject,
      score,
      goal,
      playerGoal,
      playerAssist,
      penalty,
      foulTime,
      foulPlayer,
      foulType,
      teamId,
      teamName,
      teamScore,
      teamTimeout,
      teamPenalties,
      playMode,
      callTimeout,
      onReset,
      onSubmit,
      initializeScoreAssist,
      onResetScoreAssist,
      onSubmitScoreAssist
    }
  }
})
</script>

<style lang="css" scoped>
h2 {
  font-family: clockicons !important;
}

.teamscore {
  font-family: clockicons;
  font-size: 18vh;
  color: yellow;
}

.my-card {
  width: 100%;
  max-width: 280px;
}
</style>
