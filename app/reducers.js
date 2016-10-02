import {fromJS, Set} from 'immutable'

const defaultState = fromJS({
  drag: {
    isDragging: false,
    targets: new Set(),
    padding: new Set(),
    hovered: null,
    valid: false,
    name: null
  },
  currentRoom: '7602',
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
    case 'ADD_DROP_TARGET':
      return state.updateIn(['drag', 'targets'], set => set.add(fromJS(payload)))
    case 'ADD_DROP_TARGET_PADDING':
      return state.updateIn(['drag', 'padding'], set => set.add(fromJS(payload)))
    case 'CLEAR_DROP_TARGETS':
      return state
        .updateIn(['drag', 'targets'], set => set.clear())
        .updateIn(['drag', 'padding'], set => set.clear())
    case 'SET_DRAGGED':
      return state
        .setIn(['drag', 'name'], payload)
        .setIn(['drag', 'isDragging'], true)
    case 'CLEAR_DRAGGED':
      return state
        .setIn(['drag', 'name'], null)
        .setIn(['drag', 'hovered'], null)
        .setIn(['drag', 'valid'], false)
        .setIn(['drag', 'isDragging'], false)
        .updateIn(['drag', 'targets'], set => set.clear())
        .updateIn(['drag', 'padding'], set => set.clear())
    case 'CHANGE_ROOM':
      return state.setIn(['currentRoom'], payload)
    case 'HOVERED_OVER':
      return state
        .setIn(['drag', 'hovered'], fromJS(payload.position))
        .setIn(['drag', 'valid'], payload.canDrop)
    default:
      return state
  }
}
