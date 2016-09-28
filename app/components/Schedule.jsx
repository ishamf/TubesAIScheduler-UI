import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {DAY_PERCENT, SLOT_PERCENT, DAYS, SLOTS} from '../values'

import ScheduleItem from './ScheduleItem'
import ScheduleDropTarget from './ScheduleDropTarget'
import Course from './Course'

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

class BaseSchedule extends React.Component {
  render () {
    const {schedule} = this.props

    return (
      <div className='schedule' style={gridScheduleStyle} ref={(rootEl) => {
        this.state = rootEl
      }}>
        {(() => {
          let acc = []
          for (let day = 0; day < DAYS; day++) {
            for (let slot = 0; slot < SLOTS; slot++) {
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
        })()}
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

const ScheduleConnector = connect(state => {
  return {
    schedule: state.get('schedule')
  }
})

export default ScheduleConnector(BaseSchedule)
