import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {DAY_PERCENT, SLOT_PERCENT} from '../values'

import ScheduleItem from './ScheduleItem'
import Course from './Course'

const BaseSchedule = ({schedule}) => (
  <div className='schedule' style={{
    background: `repeating-linear-gradient(
      0deg,
      hsla(0, 0%, 63%, 0.2),
      hsla(0, 0%, 60%, 0.2) ${SLOT_PERCENT}%,
      hsla(0, 0%, 40%, 0.2) ${SLOT_PERCENT}%,
      hsla(0, 0%, 40%, 0.2) ${SLOT_PERCENT * 2}%
    ), repeating-linear-gradient(
      90deg,
      hsla(0, 0%, 63%, 0.2),
      hsla(0, 0%, 60%, 0.2) ${DAY_PERCENT}%,
      hsla(0, 0%, 40%, 0.2) ${DAY_PERCENT}%,
      hsla(0, 0%, 40%, 0.2) ${DAY_PERCENT * 2}%
    )`
  }}>
    {schedule.valueSeq().map((s) => (
      <ScheduleItem
        day={s.getIn(['time', 'day'])}
        slot={s.getIn(['time', 'slot'])}
        duration={s.get('duration')}
      >
        <Course name={s.get('name')} room={s.get('room')} />
      </ScheduleItem>
    )).toJS()}
  </div>
)

export default connect(state => {
  return {
    schedule: state.get('schedule')
  }
})(BaseSchedule)
