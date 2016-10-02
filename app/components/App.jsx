import React from 'react'
import Schedule from './Schedule'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import RoomTabBar from './RoomTabBar'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import {flow} from '../util'

class BaseApp extends React.Component {
  render () {
    return (
      <div id='content'>
        <Navbar />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <Sidebar />
            </div>
            <div className='col-md-9'>
              <RoomTabBar />
              <div className='panel panel-default'>
                <div className='panel-body'>
                  <Schedule />
                </div>
              </div>
            </div>
          </div>
        </div>
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
  DNDContext
)(BaseApp)
