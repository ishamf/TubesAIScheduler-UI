import {fromJS, Set} from 'immutable'

export const DAYS = 5
export const SLOTS = 10
export const SLOT_OFFSET = 7
export const DAY_OFFSET = 1
export const DAY_PERCENT = 100.0 / DAYS
export const SLOT_PERCENT = 100.0 / SLOTS

export const DRAG_TYPE_SCHEDULE_ITEM = 'schedule-item'

export const SLOT_POSITIONS = (() => {
  let acc = []
  for (let day = DAY_OFFSET; day < DAYS + DAY_OFFSET; day++) {
    for (let slot = SLOT_OFFSET; slot < SLOTS + SLOT_OFFSET; slot++) {
      acc.push(
        fromJS({day, slot})
      )
    }
  }

  return new Set(acc)
})()
