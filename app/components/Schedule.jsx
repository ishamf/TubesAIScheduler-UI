import React from 'react'
import { connect } from 'react-redux'

import {DAY_PERCENT, SLOT_PERCENT, DAYS, SLOTS, SLOT_OFFSET} from '../values'

import ScheduleItem from './ScheduleItem'
import ScheduleDropTarget from './ScheduleDropTarget'
import Course from './Course'

class BaseSchedule extends React.Component {
  render () {
    const {schedule} = this.props

    return (
      <div className='schedule' style={gridScheduleStyle}>
        {scheduleDropTargets()}
        {schedule.valueSeq().map((s) => (
          <ScheduleItem
            day={s.getIn(['time', 'day'])}
            slot={s.getIn(['time', 'slot'])}
            duration={s.get('duration')}
            key={s.get('name')}
          >
            <Course name={s.get('name')} room={s.get('room')} />
          </ScheduleItem>
        )).toJS()}
      </div>
    )
  }
}

function scheduleDropTargets () {
  let acc = []
  for (let day = 0; day < DAYS; day++) {
    for (let slot = SLOT_OFFSET; slot < SLOTS + SLOT_OFFSET; slot++) {
      acc.push(
        <ScheduleItem
          day={day}
          slot={slot}
          duration={1}
          key={`(${day}, ${slot})`}
        >
          <ScheduleDropTarget day={day} slot={slot} />
        </ScheduleItem>
      )
    }
  }
  return acc
}

const gridScheduleStyle = {
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
}

const ScheduleConnector = connect(state => {
  return {
    schedule: state.get('schedule')
  }
})

export default ScheduleConnector(BaseSchedule)
