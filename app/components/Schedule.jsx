import React from 'react'
import { connect } from 'react-redux'

import {DAY_PERCENT, SLOT_PERCENT, SLOT_POSITIONS} from '../values'

import {flow} from '../util'
import ScheduleItem from './ScheduleItem'
import ScheduleDropTarget from './ScheduleDropTarget'
import Course from './Course'

class BaseSchedule extends React.Component {
  render () {
    const {schedule, dropTargets, currentRoom, dropTargetPadding} = this.props

    return (
      <div className='schedule' style={gridScheduleStyle}>
        {schedule.valueSeq()
          .filter(s => s.get('room') === currentRoom)
          .map(s => (
            <ScheduleItem
              day={s.getIn(['time', 'day'])}
              slot={s.getIn(['time', 'slot'])}
              duration={s.get('duration')}
              key={s.get('name')}
            >
              <Course
                name={s.get('name')}
                room={s.get('room')}
                hue={s.get('hue')}
              />
            </ScheduleItem>
          )).toJS()}
        {scheduleDropTargets(dropTargets, dropTargetPadding, currentRoom)}
      </div>
    )
  }
}

function scheduleDropTargets (dropTargets, padding, currentRoom) {
  return SLOT_POSITIONS.map(dtMap => {
    const {day, slot} = dtMap.toJS()
    return (
      <ScheduleItem
        hidden={!dropTargets.has(dtMap) && !padding.has(dtMap)}
        day={day}
        slot={slot}
        duration={1}
        key={`(${day}, ${slot})`}
      >
        <ScheduleDropTarget day={day} slot={slot} room={currentRoom} canDrop={!padding.has(dtMap)} />
      </ScheduleItem>)
  })
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
    schedule: state.get('schedule'),
    currentRoom: state.get('currentRoom'),
    dropTargets: state.getIn(['drag', 'targets']),
    dropTargetPadding: state.getIn(['drag', 'padding'])
  }
})

export default flow(
  ScheduleConnector
)(BaseSchedule)
