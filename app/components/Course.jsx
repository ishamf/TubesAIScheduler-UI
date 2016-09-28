import React, { PropTypes } from 'react'
import {DragSource} from 'react-dnd'

import {DRAG_TYPE_SCHEDULE_ITEM} from '../values'

const sItemSource = {
  beginDrag ({name}) {
    return {
      name: name
    }
  }
}

function dndCollect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const Course = ({name, room, connectDragSource, isDragging}) => (
  connectDragSource(
    <div className='course' style={{
      opacity: isDragging ? 0.5 : 1
    }}>
      {name} at {room}
    </div>
  )
)

const DNDSpec = DragSource(DRAG_TYPE_SCHEDULE_ITEM, sItemSource, dndCollect)

export default DNDSpec(Course)
