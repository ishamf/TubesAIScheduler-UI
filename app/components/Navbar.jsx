import React from 'react'
import StateInput from './StateInput'
import { connect } from 'react-redux'

const Navbar = () => (
  <nav className='navbar navbar-default'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <a className='navbar-brand' href='#'>Scheduler</a>
      </div>
      <form action='' className='navbar-form navbar-right'>
        <div className='form-group'>
          <StateInput />
        </div>
      </form>
    </div>
  </nav>
)

export default connect((state) => ({}))(Navbar)
