import { createAction } from 'redux-actions'
import * as AI from './ai-service'

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
