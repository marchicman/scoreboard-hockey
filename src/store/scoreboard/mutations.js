import { eventTypesEnum } from '../../utils/enums'
import { formatTime } from '../../utils/dateUtils'

export const updatePlayMode = (state, playMode) => {
  if (!state.matchStartTime) {
    // è iniziato il match
    state.matchStartTime = new Date()
    state.originalMatchTime = state.matchTime // salvo la durata iniziale potrebbe tornare utile...
    insertEvent(state, {
      type: eventTypesEnum.start_match,
      originalMatchTime: formatTime(state.originalMatchTime)
    })
  }
  if (!state.periodStartTime) {
    // è iniziato il match
    state.periodStartTime = new Date()
    insertEvent(state, {
      type: eventTypesEnum.start_period
    })
  }
  state.playMode = playMode
}

export const updateMatchTime = (state, matchTime) => {
  state.matchTime = matchTime
  if (matchTime === 0) {
    // il periodo è finito
    state.periodStartTime = null
    state.playMode = false
    insertEvent(state, {
      type: eventTypesEnum.end_period
    })
    // se non è l'ultimo periodo verrà tolto alla fine del periodo successivo
    insertEvent(state, {
      type: eventTypesEnum.end_match
    })
  }
}

export const increaseMatchTime = (state, step) => {
  console.log(step)
  state.matchTime += step
}

export const timeoutCalled = (state, teamId) => {
  const team = state.teams.filter(t => {
    return t.id === teamId
  })[0]

  if (team) {
    state.timeoutMode = true
    state.timeoutTeam = team.name
    team.timeout++
    insertEvent(state, {
      type: eventTypesEnum.timeout,
      teamId: teamId,
      teamName: team.name
    })
  }
}

export const finishTimeout = (state) => {
  state.timeoutMode = false
  state.timeoutTeam = ''
}

export const updateScore = (state, payload) => {
  const team = state.teams.filter(t => {
    return t.id === payload.teamId
  })[0]

  if (team) {
    team.score = payload.score
    state.scores.push({ period: state.period, teamId: payload.teamId, scoreTime: state.matchTime })
  }
}

export const finishPenalty = (state, payload) => {
  const team = state.teams.filter(t => {
    return t.id === payload.teamId
  })[0]

  if (team) {
    const penaltyIdx = team.penalties.findIndex(p => {
      return p.player === payload.playerNumber
    })
    if (penaltyIdx > -1) {
      const penalty = team.penalties[penaltyIdx]
      const penaltyComplete = { endTime: state.matchTime, ...penalty }
      penaltyComplete.duration = penaltyComplete.foulTime - penaltyComplete.endTime
      const currentPenalties = team.penalties.filter(p => {
        return p.player !== payload.playerNumber
      })
      team.penalties = [...currentPenalties]
      team.completedPenalties.push(penaltyComplete)
      insertEvent(state, {
        type: eventTypesEnum.end_penalty,
        teamId: payload.teamId,
        teamName: team.name,
        player: payload.playerNumber
      })
    }
  }
}

export const beginPenalty = (state, payload) => {
  state.penaltyMode = true
}

export const insertPenalty = (state, payload) => {
  const team = state.teams.filter(t => {
    return t.id === payload.teamId
  })[0]

  if (team) {
    const obj = { player: payload.foulPlayer, duration: (+payload.foulTime * 60), foulTime: state.matchTime, foulType: payload.foulType }
    team.penalties.push(obj)
    insertEvent(state, {
      type: eventTypesEnum.begin_penalty,
      teamId: payload.teamId,
      teamName: team.name,
      player: obj.player,
      duration: obj.duration,
      description: obj.foulType
    })
  }
  state.penaltyMode = false
}

export const updatePeriod = (state, payload) => {
  state.period = payload
}

export const updateTeamName = (state, payload) => {
  const team = state.teams.filter(t => {
    return t.id === payload.teamId
  })[0]

  if (team) {
    team.name = payload.name
  }
}

export const updatePenaltyDuration = (state, payload) => {
  const team = state.teams.filter(t => {
    return t.id === payload.teamId
  })[0]

  if (team) {
    const penaltyIdx = team.penalties.findIndex(p => {
      return p.player === payload.playerNumber
    })
    if (penaltyIdx > -1) {
      const penalty = team.penalties[penaltyIdx]
      penalty.duration = payload.duration
    }
  }
}

export const insertEvent = (state, payload) => {
  const event = { ...payload }
  event.period = state.period
  event.matchTime = formatTime(state.matchTime)
  event.eventDate = new Date()
  event.matchTimeElapsed = formatTime(state.originalMatchTime - state.matchTime)
  switch (payload.type) {
    case eventTypesEnum.goal: {
      const team = state.teams.filter(t => {
        return t.id === payload.teamId
      })[0]
      if (team) {
        team.score = payload.score
        event.teamName = team.name
      }
      break
    }
    case eventTypesEnum.end_match:
      // rimozione di un eventuale end_match precedente dovuto alla fine periodo
      state.events = state.events.filter(e => {
        return e.type !== eventTypesEnum.end_match
      })
      break
  }
  state.events.push(event)
}

export const updateHomeTeamName = (state, payload) => {
  state.teams[0].name = payload
}

export const updateVisitorTeamName = (state, payload) => {
  state.teams[1].name = payload
}

export const updateTimeoutTime = (state, payload) => {
  state.timeoutTime = payload
}

export const updateWarmupTime = (state, payload) => {
  state.warmupTime = payload
}

export const updateIntervalTime = (state, payload) => {
  state.intervalTime = payload
}

export const updateBreakMode = (state, value) => {
  state.breakMode = value
}

export const updateWarmUpMode = (state, value) => {
  state.warmupMode = value
}
