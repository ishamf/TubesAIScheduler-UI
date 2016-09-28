import React, { PropTypes } from 'react'
import {DAY_PERCENT, SLOT_PERCENT} from '../values'

const Course = ({schedule}) => (
  <div className='schedule-item' style={scheduleStyle(schedule)}>
    {schedule.name} at {schedule.room}
  </div>
)

function scheduleStyle (schedule) {
  return {
    width: `${DAY_PERCENT}%`,
    height: `${SLOT_PERCENT * schedule.duration}%`,
    top: `${SLOT_PERCENT * schedule.time.slot}%`,
    left: `${DAY_PERCENT * schedule.time.day}%`
  }
}

export default Course
