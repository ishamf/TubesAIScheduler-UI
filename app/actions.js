import { createAction } from 'redux-actions'

export const moveCourse = createAction('MOVE_COURSE',
  (name, day, slot, room) => ({
    name,
    destination: {
      time: {
        day,
        slot
      },
      room
    }}))
