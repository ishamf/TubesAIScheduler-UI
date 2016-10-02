import React from 'react'
import {DropTarget} from 'react-dnd'
import classNames from 'classnames'

import {DRAG_TYPE_SCHEDULE_ITEM} from '../values'

const scheduleDropTarget = {
  drop ({day, slot, room}) {
    return {
      day,
      slot,
      room
    }
  }
}

function dndCollect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const ScheduleDropTarget = ({connectDropTarget, isOver, day, slot}) => (
  connectDropTarget(
    <div className={classNames({
      'course-drop-target': true,
      'mod-active': isOver
    })} />
  )
)

const ScheduleDND = DropTarget(DRAG_TYPE_SCHEDULE_ITEM, scheduleDropTarget, dndCollect)

export default ScheduleDND(ScheduleDropTarget)
