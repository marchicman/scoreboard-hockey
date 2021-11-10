export const updatePlayMode = (state, playMode) => {
  state.playMode = playMode
}

export const updateMatchTime = (state, matchTime) => {
  state.matchTime = matchTime
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
    console.log('penaltyIdx ' + penaltyIdx)
    if (penaltyIdx > -1) {
      const penalty = team.penalties[penaltyIdx]
      const penaltyComplete = { endTime: state.matchTime, ...penalty }
      penaltyComplete.duration = penaltyComplete.foulTime - penaltyComplete.endTime
      const currentPenalties = team.penalties.filter(p => {
        return p.player !== payload.playerNumber
      })
      team.penalties = [...currentPenalties]
      team.completedPenalties.push(penaltyComplete)
    }
  }
}

export const insertPenalty = (state, payload) => {
  const team = state.teams.filter(t => {
    return t.id === payload.teamId
  })[0]

  if (team) {
    team.penalties.push({ player: payload.foulPlayer, duration: (+payload.foulTime * 60), period: state.period, foulTime: state.matchTime, foulType: payload.foulType })
  }
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
