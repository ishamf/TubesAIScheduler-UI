import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions'
import {ensureReturnFalse as erf} from '../util'

const Sidebar = ({
  conflictCount,
  roomPercentage,
  randomizeSchedule,
  runSimulatedAnnealing,
  runGeneticAlgorithm,
  runHillClimbing
}) => (
  <div>
    <a href='#' className='btn btn-default btn-block' onClick={erf(randomizeSchedule)}>Randomize</a>
    <a href='#' className='btn btn-default btn-block' onClick={erf(runSimulatedAnnealing)}>Simulated Annealing</a>
    <a href='#' className='btn btn-default btn-block' onClick={erf(runGeneticAlgorithm)}>Genetic Algorithm</a>
    <a href='#' className='btn btn-default btn-block' onClick={erf(runHillClimbing)}>Hill Climbing</a>
    <br />
    <div className='panel panel-default'>
      <div className='panel-body'>
        Conflicts: {conflictCount} <br />
        Room Percentage: {roomPercentage.toFixed(3)}% <br />
      </div>
    </div>
  </div>
)

export default connect(state => {
  return {
    conflictCount: state.get('conflictCount'),
    roomPercentage: state.get('roomPercentage')
  }
}, Actions)(Sidebar)
