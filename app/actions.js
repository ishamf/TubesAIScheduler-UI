import { createAction } from 'redux-actions'

export const moveCourse = createAction('MOVE_COURSE',
  (name, day, slot) => ({
    name,
    destination: {
      day,
      slot
    }}))
