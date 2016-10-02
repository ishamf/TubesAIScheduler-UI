import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions'
import {ensureReturnFalse as erf} from '../util'

const Sidebar = ({
  runSimulatedAnnealing,
  runGeneticAlgorithm,
  runHillClimbing
}) => (
  <div>
    <a href='#' className='btn btn-default btn-block' onClick={erf(runSimulatedAnnealing)}>Simulated Annealing</a>
    <a href='#' className='btn btn-default btn-block' onClick={erf(runGeneticAlgorithm)}>Genetic Algorithm</a>
    <a href='#' className='btn btn-default btn-block' onClick={erf(runHillClimbing)}>Hill Climbing</a>
  </div>
)

export default connect(undefined, Actions)(Sidebar)
