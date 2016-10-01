import React from 'react'

import {DAY_PERCENT, SLOT_PERCENT, SLOT_OFFSET, DAY_OFFSET} from '../values'

const Course = ({slot, day, duration, children}) => (
  <div className='schedule-item' style={scheduleStyle(day, slot, duration)}>
    {children}
  </div>
)

function scheduleStyle (day, slot, duration) {
  return {
    width: `${DAY_PERCENT}%`,
    height: `${SLOT_PERCENT * duration}%`,
    top: `${SLOT_PERCENT * (slot - SLOT_OFFSET)}%`,
    left: `${DAY_PERCENT * (day - DAY_OFFSET)}%`
  }
}

export default Course
