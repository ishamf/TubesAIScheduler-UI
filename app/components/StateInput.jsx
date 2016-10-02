import React from 'react'
import { connect } from 'react-redux'
import FileInput from 'react-file-input'

import * as Actions from '../actions'

const StateInput = ({loadFile}) => (
  <FileInput
    placeholder='File Jadwal'
    onChange={(event) => {
      loadFile(event.target.files[0])
    }}
  />
)

export default connect(undefined, Actions)(StateInput)
