import {fromJS} from 'immutable'

const defaultState = fromJS({
  rooms: [
    '7602', '7606'
  ],
  schedule: {
    'AI': {
      name: 'AI',
      time: {
        day: 0,
        slot: 2
      },
      duration: 2,
      room: '7602'
    },
    'Jarkom': {
      name: 'Jarkom',
      time: {
        day: 1,
        slot: 3
      },
      duration: 2,
      room: '7602'
    }
  }
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'MOVE':
      const {name, destination} = action.payload
      return state.setIn(`schedule.${name}.time`, destination)
    default:
      return state
  }
}
