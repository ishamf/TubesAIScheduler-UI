import React from 'react'
import {DragSource} from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'

import {flow} from '../util'
import * as Actions from '../actions'
import {DRAG_TYPE_SCHEDULE_ITEM} from '../values'

const sItemSource = {
  beginDrag ({name, beginDrag}) {
    console.log('Start!')

    const dragItem = {
      name: name
    }

    beginDrag(dragItem)
    return dragItem
  },
  endDrag ({name, moveCourse, endDrag}, monitor) {
    console.log('End!')
    endDrag()
    if (monitor.didDrop()) {
      const {day, slot, room} = monitor.getDropResult()

      moveCourse(name, day, slot, room)
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
    <div className={classNames({
      'course': true,
      'mod-dragged': isDragging
    })}>
      {name} at {room}
    </div>
  )
)

const DNDSpec = DragSource(DRAG_TYPE_SCHEDULE_ITEM, sItemSource, dndCollect)
const Connector = connect(undefined, Actions)

export default flow(DNDSpec, Connector)(Course)
