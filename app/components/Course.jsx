import React, { PropTypes } from 'react'

const Course = ({name, room}) => (
  <div className='course'>
    {name} at {room}
  </div>
)

export default Course
