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
        slot: 9
      },
      duration: 2,
      room: '7602'
    },
    'Jarkom': {
      name: 'Jarkom',
      time: {
        day: 1,
        slot: 10
      },
      duration: 2,
      room: '7602'
    }
  }
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'MOVE_COURSE':
      const {name, destination} = action.payload
      return state.setIn(['schedule', name, 'time'], fromJS(destination))
    default:
      return state
  }
}
