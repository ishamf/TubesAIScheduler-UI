import React from 'react'
import Schedule from './Schedule'
import RoomSelector from './RoomSelector'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux'

import {flow} from '../util'
import * as Actions from '../actions'

class BaseApp extends React.Component {
  render () {
    const {
      loadString,
      rooms,
      runSimulatedAnnealing,
      runGeneticAlgorithm,
      runHillClimbing
    } = this.props

    return (
      <div id='content'>
        <h1>Tubes 1 AI: Scheduling</h1>
        <a href='#' onClick={() => loadString(`
          Ruangan
          7602;07.00;14.00;1,2,3,4,5
          7603;07.00;14.00;1,3,5
          7610;09.00;12.00;1,2,3,4,5
          Labdas2;10.00;14.00;2,4

          Jadwal
          IF2110;7602;07.00;12.00;4;1,2,3,4,5
          IF2130;-;10.00;16.00;3;3,4
          IF2150;-;09.00;13.00;2;1,3,5
          IF2170;7610;07.00;12.00;3;1,2,3,4,5
          IF3110;7602;07.00;09.00;2;1,2,3,4,5
          IF3130;-;07.00;12.00;2;3,4,5
          IF3170;7602;07.00;09.00;2;1,2,3,4,5
          IF3111;-;07.00;12.00;2;1,2,3,4,5

          `)}>Load TC Asisten</a>
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
