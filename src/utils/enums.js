class Enum {
  constructor (...keys) {
    keys.forEach((key, i) => {
      this[key] = i
    })
    Object.freeze(this)
  }

  *[Symbol.iterator] () {
    for (const key of Object.keys(this)) yield key
  }
}

const eventTypesEnum = new Enum(
  'start_match', // 0
  'end_match', // 1
  'start_period', // 2
  'end_period', // 3
  'goal', // 4
  'begin_penalty', // 5
  'end_penalty', // 6
  'timeout' // 7
)

// const eventTypes = [...eventTypesEnum]; // Array of the enum values as strings

export { eventTypesEnum }
