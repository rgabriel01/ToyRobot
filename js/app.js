import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import CommandPalette from './components/CommandPalette'
import SpooledCommands from './components/SpooledCommands'
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      robot: {
        orientation: 'north',
        orientationInDegrees: 360,
        rowNumber: 0,
        columnNumber: 0
      },
      isReportVisible: false,
      isRealtime: true,
      isPlaceCommandPresent: false,
      spooledCommands:[]
    }
    this.renderReport = this.renderReport.bind(this)
    this.updateRealtimeState = this.updateRealtimeState.bind(this)
    this.renderSpooledCommandsList = this.renderSpooledCommandsList.bind(this)
    //realtime events
    this.place = this.place.bind(this)
    this.move = this.move.bind(this)
    this.rotate = this.rotate.bind(this)
    this.left = this.left.bind(this)
    this.right = this.right.bind(this)
    this.report = this.report.bind(this)
    //spooled commands
    this.addPlaceToSpool = this.addPlaceToSpool.bind(this)
    this.addMoveToSpool = this.addMoveToSpool.bind(this)
    this.addLeftToSpool = this.addLeftToSpool.bind(this)
    this.addRightToSpool = this.addRightToSpool.bind(this)
    this.addReportToSpool = this.addReportToSpool.bind(this)
    this.addCommandToSpool = this.addCommandToSpool.bind(this)
    this.executeSpooledCommands = this.executeSpooledCommands.bind(this)
  }

  updateRealtimeState(event) {
    let value = event.currentTarget.checked
    this.setState({isRealtime: value})
  }

  place(x,y,f) {
    let newCoordinates = evalAndPrepCoordinates.bind(this)(x, y, f)
    let orientationGuideLine = {
      east: 90,
      south: 180,
      west: 270,
      north: 360
    }
    this.setState({
      robot: {
        orientation: f,
        orientationInDegrees: orientationGuideLine[f],
        rowNumber: newCoordinates.newYAxisValue,
        columnNumber: newCoordinates.newXAxisValue
      }
    })

    function evalAndPrepCoordinates(updatingXAxisValue, updatingYAxisValue){
      let rowsMaxValue = this.props.rows - 1
      let columnsMaxValue = this.props.columns - 1
      let newXAxisValue = (updatingXAxisValue > columnsMaxValue) ? columnsMaxValue : updatingXAxisValue
      let newYAxisValue = (updatingYAxisValue > rowsMaxValue) ? rowsMaxValue : updatingYAxisValue
      return {
        newXAxisValue: newXAxisValue,
        newYAxisValue: newYAxisValue
      }
    }
  }

  move() {
    let state = this.state
    let resultingMovementValue
    switch(this.state.robot.orientation) {
      case 'north':
        resultingMovementValue = state.robot.rowNumber - 1
        state.robot.rowNumber = (resultingMovementValue < 0) ? state.robot.rowNumber : resultingMovementValue
        break
      case 'south':
        resultingMovementValue = state.robot.rowNumber + 1
        state.robot.rowNumber = (resultingMovementValue > (this.props.rows - 1)) ? state.robot.rowNumber : resultingMovementValue
        break
      case 'west':
        resultingMovementValue = state.robot.columnNumber - 1
        state.robot.columnNumber = (resultingMovementValue < 0) ? state.robot.columnNumber : resultingMovementValue
        break
      case 'east':
        resultingMovementValue = state.robot.columnNumber + 1
        state.robot.columnNumber = (resultingMovementValue > (this.props.columns - 1)) ? state.robot.columnNumber : resultingMovementValue
        break
    }
    this.setState(state)
  }

  rotate(direction) {
    let orientationGuideLine = {
      90: 'east',
      180: 'south',
      270: 'west',
      360: 'north'
    }
    let currentOrientationDegrees = this.state.robot.orientationInDegrees
    let newOrientationDegrees
    if (direction === 'left') {
      newOrientationDegrees = ((currentOrientationDegrees - 90) === 0) ? 360 : currentOrientationDegrees - 90
    } else {
      newOrientationDegrees = ((currentOrientationDegrees + 90) > 360) ? 90 : currentOrientationDegrees + 90
    }
    this.state.robot.orientation = orientationGuideLine[newOrientationDegrees]
    this.state.robot.orientationInDegrees = newOrientationDegrees
    this.setState(this.state)
  }

  left() {
    this.rotate('left')
  }

  right() {
    this.rotate('right')
  }

  report() {
    this.setState({isReportVisible: true})
  }

  addPlaceToSpool(x,y,f){
    this.setState({isPlaceCommandPresent: true}, cb.bind(this) )
    function cb() {
      this.addCommandToSpool.bind(this)(`place-${x}-${y}-${f}`)
    }
  }

  addMoveToSpool() {
    this.addCommandToSpool.bind(this)('move')
  }

  addLeftToSpool() {
    this.addCommandToSpool.bind(this)('left')
  }

  addRightToSpool() {
    this.addCommandToSpool.bind(this)('right')
  }

  addReportToSpool() {
    this.addCommandToSpool.bind(this)('report')
  }

  addCommandToSpool(command) {
    if (!this.state.isPlaceCommandPresent) { return }
    let spooledCommands = this.state.spooledCommands.slice(0)
    spooledCommands.push(command)
    this.setState({spooledCommands: spooledCommands})
  }

  executeSpooledCommands() {
    console.log('yolol!')
  }

  renderReport() {
    let {orientation, rowNumber, columnNumber} = this.state.robot
    let reportVisibilityClass = this.state.isReportVisible ? '' : 'hidden'
    return (
      <div className={`alert alert-success ${reportVisibilityClass}`}>
        {`Robot is at X: ${columnNumber} Y: ${rowNumber}, facing the ${orientation}`}
      </div>
    )
  }

  renderSpooledCommandsList() {
    return this.state.isRealtime ? [] : <SpooledCommands commands={this.state.spooledCommands} spooledCommandsOnClickHandler={this.executeSpooledCommands}/>
  }

  render() {
    let {isRealtime} = this.state
    return (
      <div className='row p50'>
        <div className='col-xs-12 col-sm-6'>
          <CommandPalette
            placeCommandClickHandler={ isRealtime ? this.place : this.addPlaceToSpool}
            moveCommandClickHandler={ isRealtime ? this.move : this.addMoveToSpool}
            leftCommandClickHandler={ isRealtime ? this.left : this.addLeftToSpool}
            rightCommandClickHandler={isRealtime ? this.right : this.addRightToSpool}
            reportCommandClickHandler={isRealtime ? this.report : this.addReportToSpool}
            realtimeCheckboxOnChangeHandler={this.updateRealtimeState}
            isRealtime={this.state.isRealtime}
          />
          {this.renderSpooledCommandsList()}
        </div>
        <div className='col-xs-12 col-sm-6 table-responsive'>
          <Table
            tableDimension={{rows: this.props.rows, columns: this.props.columns}}
            robot={this.state.robot}
          />
        </div>
        <div className='col-xs-12 col-sm-6'>
          {this.renderReport()}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Main
    rows={5}
    columns={5}
  />
  , document.getElementById('root')
);