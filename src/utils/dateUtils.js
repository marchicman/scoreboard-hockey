// formatta mm:ss
export const formatTime = (seconds) => {
  const minutes = Math.round((seconds - 30) / 60) + ''
  const remainingSeconds = (seconds % 60) + ''
  // return (minutes < 10 ? '0' : '') + minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds
  return minutes.padStart(2, '0') + ':' + remainingSeconds.padStart(2, '0')
}

// formatta secondi in ss.dd
export const formatTimeDecimals = (seconds) => {
  const remainingSeconds = (Math.round((seconds % 60) * 100) / 100) + ''
  const ret = remainingSeconds.padStart(2, '0')
  // se ret = 59.9 torno 59.90
  return ret.length === 4 ? ret + '0' : ret
}
