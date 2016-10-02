import React from 'react'
import { connect } from 'react-redux'

import * as Actions from '../actions'
import {ensureReturnFalse as erf} from '../util'

const Sidebar = ({
  runSimulatedAnnealing,
  runGeneticAlgorithm,
  runHillClimbing
}) => (
  <ul className='nav nav-pills nav-stacked'>
    <li><a href='#' onClick={erf(runSimulatedAnnealing)}>Simulated Annealing</a></li>
    <li><a href='#' onClick={erf(runGeneticAlgorithm)}>Genetic Algorithm</a></li>
    <li><a href='#' onClick={erf(runHillClimbing)}>Hill Climbing</a></li>
  </ul>
)

export default connect(undefined, Actions)(Sidebar)
