import React from 'react'
import {DropTarget} from 'react-dnd'
import classNames from 'classnames'
import { connect } from 'react-redux'

import {flow} from '../util'
import * as Actions from '../actions'
import {DRAG_TYPE_SCHEDULE_ITEM} from '../values'

const scheduleDropTarget = {
  canDrop ({canDrop}) {
    return canDrop
  },
  hover ({hoveredOver, day, slot, room, canDrop}) {
    hoveredOver({position: {day, slot, room}, canDrop})
  },
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
    connectDropTarget: connect.dropTarget()
  }
}

const ScheduleDropTarget = ({connectDropTarget, day, slot, room, isDrop, hovered, draggedDuration, dragValid}) => {
  const isOver = hovered && isPartOf(hovered.toJS(), day, slot, room, draggedDuration)

  return connectDropTarget(
    <div className={classNames({
      'course-drop-target': true,
      'mod-active': isOver,
      'mod-error': !dragValid
    })} />
  )
}

function isPartOf ({day, slot, room}, cDay, cSlot, cRoom, draggedDuration) {
  return (
    day === cDay &&
    room === cRoom &&
    slot <= cSlot && cSlot < slot + draggedDuration
  )
}

const ScheduleDND = DropTarget(DRAG_TYPE_SCHEDULE_ITEM, scheduleDropTarget, dndCollect)

const Connector = connect(state => {
  const draggedName = state.getIn(['drag', 'name'])
  return {
    draggedName,
    hovered: state.getIn(['drag', 'hovered']),
    dragValid: state.getIn(['drag', 'valid']),
    draggedDuration: state.getIn(['schedule', draggedName, 'duration'])
  }
}, Actions)

export default flow(
  ScheduleDND,
  Connector
)(ScheduleDropTarget)
