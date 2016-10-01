import {fromJS} from 'immutable'

const defaultState = fromJS({
  rooms: [],
  schedule: {}
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
