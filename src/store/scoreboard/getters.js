export function matchTime (state) {
  return state.matchTime
}

export function playMode (state) {
  return state.playMode
}

export function timeoutMode (state) {
  return state.timeoutMode
}

export function timeoutTeam (state) {
  return state.timeoutTeam
}

export function homeTeam (state) {
  return state.teams[0]
}

export function visitorTeam (state) {
  return state.teams[1]
}

export function period (state) {
  return state.period
}
