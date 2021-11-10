export default function () {
  return {
    period: 1,
    matchTime: 1200,
    timeout: 60, // durata di un timeout
    interval: 600, // 10 minuti
    playMode: false,
    timeoutMode: false,
    timeoutTeam: '',
    teams: [
      {
        id: 1,
        name: 'Invicta Skate Modena',
        iconUrl: null,
        score: 0,
        timeout: 0,
        penalties: [], // {player: 47, duration: 120, foulTime: 1100}
        completedPenalties: [] // {player: 47, duration: 120, startTime: 1120, endTime: 1000}
      },
      {
        id: 2,
        name: 'TecnoAlt Civitavecchia',
        iconUrl: null,
        score: 0,
        timeout: 0,
        penalties: [], // {player: 47, duration: 120, foulTime: 1100}
        completedPenalties: [] // {player: 47, duration: 120, foulTime: 1100}
      }
    ],
    scores: []
  }
}
