import React from 'react'
import RoomSelector from './RoomSelector'
import { connect } from 'react-redux'

const RoomTabBar = ({rooms}) => (
  <ul className='nav nav-tabs nav-justified'>
    {rooms.map(room => (
      <RoomSelector room={room} key={room}/>
    ))}
  </ul>
)

export default connect((state) => ({
  rooms: state.get('rooms')
}))(RoomTabBar)
