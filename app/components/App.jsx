import React from 'react'
import Schedule from './Schedule'
import RoomSelector from './RoomSelector'
import StateInput from './StateInput'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux'

import {flow} from '../util'
import * as Actions from '../actions'

class BaseApp extends React.Component {
  render () {
    const {
      rooms,
      runSimulatedAnnealing,
      runGeneticAlgorithm,
      runHillClimbing
    } = this.props

    return (
      <div id='content'>
        <h1>Tubes 1 AI: Scheduling</h1>
        <StateInput />
        <a href='#' onClick={() => runSimulatedAnnealing()}>Simulated Annealing</a>
        <a href='#' onClick={() => runGeneticAlgorithm()}>Genetic Algorithm</a>
        <a href='#' onClick={() => runHillClimbing()}>Hill Climbing</a>
        {rooms.map(room => (
          <RoomSelector room={room} />
        ))}
        <Schedule />
      </div>
    )
  }
}

const DNDContext =
  module.hot &&
  module.hot.data &&
  module.hot.data.dndContext || DragDropContext(HTML5Backend)

if (module.hot) {
  module.hot.dispose((data) => {
    data.dndContext = DNDContext
  })
}

export default flow(
  DNDContext,
  connect((state) => ({
    rooms: state.get('rooms')
  }), Actions)
)(BaseApp)
