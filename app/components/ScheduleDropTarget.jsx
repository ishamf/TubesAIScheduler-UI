import React, { PropTypes } from 'react'
import {DropTarget} from 'react-dnd'

import {DRAG_TYPE_SCHEDULE_ITEM} from '../values'

const scheduleDropTarget = {
  drop () {
    console.log('Dropped')
  }
}

function dndCollect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const ScheduleDropTarget = ({connectDropTarget, isOver}) => (
  connectDropTarget(
    <div className='course-drop-target' style={{backgroundColor: isOver ? 'white' : 'transparent'}} />
  )
)

const ScheduleDND = DropTarget(DRAG_TYPE_SCHEDULE_ITEM, scheduleDropTarget, dndCollect)

export default ScheduleDND(ScheduleDropTarget)
