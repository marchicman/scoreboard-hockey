export function matchTime (state) {
  return state.matchTime
}

export function timeoutTime (state) {
  return state.timeoutTime
}

export function warmupTime (state) {
  return state.warmupTime
}

export function intervalTime (state) {
  return state.intervalTime
}

export function matchMode (state) {
  return !state.timeoutMode &&
         !state.warmupMode &&
         !state.breakMode
}

export function playMode (state) {
  return state.playMode
}

export function penaltyMode (state) {
  return state.penaltyMode
}

export function timeoutMode (state) {
  return state.timeoutMode
}

export function warmupMode (state) {
  return state.warmupMode
}

export function timeoutTeam (state) {
  return state.timeoutTeam
}

export function homeTeam (state) {
  return state.teams[0]
}

export function homeTeamName (state) {
  return state.teams[0].name
}

export function visitorTeam (state) {
  return state.teams[1]
}

export function visitorTeamName (state) {
  return state.teams[1].name
}

export function period (state) {
  return state.period
}

export function breakMode (state) {
  return state.breakMode
}

export function events (state) {
  return state.events
}

export function infoMsg (state) {
  if (state.timeoutMode) {
    // una delle due squadre ha chiesto un Timeout
    return 'Timeout ' + state.timeoutTeam
  } else if (state.warmupMode) {
    return 'Riscaldamento'
  } else if (state.breakMode) {
    return 'Intervallo'
  } else {
    return ''
  }
}
