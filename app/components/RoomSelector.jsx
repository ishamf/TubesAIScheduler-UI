import React from 'react'
import {connect} from 'react-redux'
import {DropTarget} from 'react-dnd'

import {flow} from '../util'
import * as Actions from '../actions'
import {DRAG_TYPE_SCHEDULE_ITEM} from '../values'

const RoomSelector = ({room, changeRoom, connectDropTarget}) => connectDropTarget(
  <a href='#' onClick={() => { changeRoom(room) }}>{room}</a>
)

const scheduleDropTarget = {
  hover (props) {
    const {room, changeRoom} = props
    changeRoom(room)
  }
}

function dndCollect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const Connector = connect(state => {
  return {}
}, Actions)

const DNDTarget = DropTarget(DRAG_TYPE_SCHEDULE_ITEM, scheduleDropTarget, dndCollect)

export default flow(
  DNDTarget,
  Connector
)(RoomSelector)
