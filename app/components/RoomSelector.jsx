import React from 'react'
import {connect} from 'react-redux'
import {DropTarget} from 'react-dnd'

import {flow} from '../util'
import * as Actions from '../actions'
import {DRAG_TYPE_SCHEDULE_ITEM} from '../values'

const RoomSelector = ({room, changeRoom}) => (
  <a className='room-selector' href='#' onClick={() => { changeRoom(room) }}>{room}</a>
)

const scheduleDropTarget = {
  hover ({room, changeRoom}) {
    changeRoom(room)
  }
}

function dndCollect () { return {} }

const Connector = connect(state => {
  return {}
}, Actions)

const DNDTarget = DropTarget(DRAG_TYPE_SCHEDULE_ITEM, scheduleDropTarget, dndCollect)

export default flow(
  Connector,
  DNDTarget
)(RoomSelector)
