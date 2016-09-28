import React, { PropTypes } from 'react'
import {DragSource} from 'react-dnd'
import { connect } from 'react-redux'

import {flow} from '../util'
import * as Actions from '../actions'
import {DRAG_TYPE_SCHEDULE_ITEM} from '../values'

const sItemSource = {
  beginDrag ({name}) {
    return {
      name: name
    }
  },
  endDrag ({name, moveCourse}, monitor) {
    if (monitor.didDrop()) {
      const {day, slot} = monitor.getDropResult()

      console.log(name, day, slot)
      moveCourse(name, day, slot)
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
const Connector = connect(undefined, Actions)

export default flow(DNDSpec, Connector)(Course)
