import React from 'react'
import Schedule from './Schedule'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

console.log(DragDropContext)
console.log(HTML5Backend)

class BaseApp extends React.Component {
  render () {
    return (
      <div id='content'>
        <h1>Tubes 1 AI: Scheduling</h1>
        <Schedule />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(BaseApp)
