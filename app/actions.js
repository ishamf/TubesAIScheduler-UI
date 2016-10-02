import { createAction } from 'redux-actions'
import * as AI from './ai-service'

import {DAYS, SLOTS, DAY_OFFSET, SLOT_OFFSET} from './values'

const moveCourseInUI = createAction('MOVE_COURSE',
  (name, day, slot, room) => ({
    name,
    destination: {
      time: {
        day,
        slot
      },
      room
    }}))

const replaceSchedule = createAction('REPLACE_SCHEDULE')
const replaceRooms = createAction('REPLACE_ROOMS')

export function moveCourse (name, day, slot, room) {
  return async (dispatch) => {
    if (await AI.moveCourse(name, day, slot, room)) {
      dispatch(moveCourseInUI(name, day, slot, room))
    }
  }
}

export function loadString (s) {
  return async (dispatch) => {
    await AI.loadString(s)
    const newSchedule = await AI.getLatestState()
    const newRooms = await AI.getRooms()

    dispatch(replaceRooms(newRooms))
    dispatch(replaceSchedule(newSchedule))
  }
}

const addDropTarget = createAction('ADD_DROP_TARGET') // {day, slot, room}
const clearDropTargets = createAction('CLEAR_DROP_TARGETS')
const changeRoomUI = createAction('CHANGE_ROOM') // (room)
const setDragged = createAction('SET_DRAGGED') // (name)
const clearDragged = createAction('CLEAR_DRAGGED') // (name)

const buildRoomTargets = () => async (dispatch, getState) => {
  dispatch(clearDropTargets())

  const state = getState()
  const name = state.getIn(['drag', 'name'])
  const room = state.get('currentRoom')

  for (let day = DAY_OFFSET; day < DAYS + DAY_OFFSET; day++) {
    for (let slot = SLOT_OFFSET; slot < SLOTS + SLOT_OFFSET; slot++) {
      if (await AI.canMoveCourse(name, day, slot, room)) {
        dispatch(addDropTarget({day, slot, room}))
      }
    }
  }
}

export const changeRoom = (room) => async (dispatch, getState) => {
  dispatch(changeRoomUI(room))
  const state = getState()
  if (state.getIn(['drag', 'isDragging'])) {
    dispatch(buildRoomTargets(room, state.getIn(['drag', 'name'])))
  }
}

export const beginDrag = (dragItem) => async (dispatch) => {
  const name = dragItem.name
  dispatch(setDragged(name))

  // The delay is needed to work around a quirk in Chrome
  // regarding HTML5 drag and drop.
  setTimeout(() => { dispatch(buildRoomTargets()) }, 10)
}

export const endDrag = (dragItem) => async (dispatch) => {
  dispatch(clearDragged())
}
