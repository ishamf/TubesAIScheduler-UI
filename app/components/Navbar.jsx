import React from 'react'
import RoomSelector from './RoomSelector'
import StateInput from './StateInput'
import { connect } from 'react-redux'

const Navbar = ({rooms}) => (
  <nav className='navbar navbar-default'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <a className='navbar-brand' href='#'>Scheduler</a>
      </div>
      <form action='' className='navbar-form navbar-left'>
        <div className='form-group'>
          <StateInput />
        </div>
      </form>
      <ul className='nav navbar-nav navbar-right'>
        {rooms.map(room => (
          <RoomSelector room={room} />
        ))}
      </ul>
    </div>
  </nav>
)

export default connect((state) => ({
  rooms: state.get('rooms')
}))(Navbar)
