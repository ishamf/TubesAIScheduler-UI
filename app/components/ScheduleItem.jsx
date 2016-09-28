import React, { PropTypes } from 'react'

import {DAY_PERCENT, SLOT_PERCENT} from '../values'

const Course = ({slot, day, duration, children}) => (
  <div className='schedule-item' style={scheduleStyle(day, slot, duration)}>
    {children}
  </div>
)

function scheduleStyle (day, slot, duration) {
  return {
    width: `${DAY_PERCENT}%`,
    height: `${SLOT_PERCENT * duration}%`,
    top: `${SLOT_PERCENT * slot}%`,
    left: `${DAY_PERCENT * day}%`
  }
}

export default Course
