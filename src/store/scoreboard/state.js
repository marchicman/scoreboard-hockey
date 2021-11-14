export default function () {
  return {
    matchStartTime: null,
    matchEndTime: null,
    periodStartTime: null,
    periodEndTime: null,
    originalMatchTime: null,
    period: 1,
    matchTime: 1200,
    timeoutTime: 60, // durata di un timeout
    warmupTime: 1200,
    intervalTime: 600, // 10 minuti
    playMode: false,
    timeoutMode: false,
    breakMode: false,
    warmupMode: false,
    timeoutTeam: '',
    teams: [
      {
        id: 1,
        name: 'Team 1',
        iconUrl: null,
        score: 0,
        timeout: 0,
        penalties: [], // {player: 47, duration: 120, foulTime: 1100}
        completedPenalties: [] // {player: 47, duration: 120, startTime: 1120, endTime: 1000}
      },
      {
        id: 2,
        name: 'Team 2',
        iconUrl: null,
        score: 0,
        timeout: 0,
        penalties: [], // {player: 47, duration: 120, foulTime: 1100}
        completedPenalties: [] // {player: 47, duration: 120, foulTime: 1100}
      }
    ],
    events: []
  }
}
