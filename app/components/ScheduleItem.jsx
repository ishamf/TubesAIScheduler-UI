import React, { PropTypes } from 'react'
import {DAY_PERCENT, SLOT_PERCENT} from '../values'

const ScheduleItem = ({schedule}) => (
  <div className='schedule-item' style={{
    width: `${DAY_PERCENT}%`,
    height: `${SLOT_PERCENT * schedule.duration}%`,
    top: `${SLOT_PERCENT * schedule.time.slot}%`,
    left: `${DAY_PERCENT * schedule.time.day}%`
  }}>
    {schedule.name} at {schedule.room}
  </div>
)

export default ScheduleItem
