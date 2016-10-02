import React from 'react'
import { connect } from 'react-redux'
import {DropTarget} from 'react-dnd'

import {DAY_PERCENT, SLOT_PERCENT, DRAG_TYPE_SCHEDULE_ITEM} from '../values'

import {flow} from '../util'
import ScheduleItem from './ScheduleItem'
import ScheduleDropTarget from './ScheduleDropTarget'
import Course from './Course'

const scheduleDropTarget = {

}

function dndCollect (connect, monitor) {
  return {
    currentlyDragged: monitor.getItem()
  }
}

class BaseSchedule extends React.Component {
  render () {
    const {schedule, dropTargets} = this.props

    return (
      <div className='schedule' style={gridScheduleStyle}>
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
        {scheduleDropTargets(dropTargets)}
      </div>
    )
  }
}

function scheduleDropTargets (dropTargets) {
  return dropTargets.map(dtMap => {
    const {day, slot, room} = dtMap.toJS()
    return (
      <ScheduleItem
        day={day}
        slot={slot}
        duration={1}
        key={`(${day}, ${slot})`}
      >
        <ScheduleDropTarget day={day} slot={slot} room={room} />
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
    dropTargets: state.getIn(['drag', 'targets'])
  }
})

const ScheduleDND = DropTarget(DRAG_TYPE_SCHEDULE_ITEM, scheduleDropTarget, dndCollect)

export default flow(
  ScheduleConnector,
  ScheduleDND
)(BaseSchedule)
