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

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case 'MOVE_COURSE':
      const {name, destination} = payload
      return state
        .setIn(['schedule', name, 'time'], fromJS(destination.time))
        .setIn(['schedule', name, 'room'], fromJS(destination.room))
    case 'REPLACE_ROOMS':
      return state.set('rooms', fromJS(payload))
    case 'REPLACE_SCHEDULE':
      return state.set('schedule', fromJS(payload))
    default:
      return state
  }
}
