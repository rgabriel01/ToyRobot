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
    //master events
    this.place = this.place.bind(this)
    this.move = this.move.bind(this)
    this.rotate = this.rotate.bind(this)
    this.report = this.report.bind(this)

    //realtime events
    this.placeRealtimeEvent = this.placeRealtimeEvent.bind(this)
    this.moveRealTimeEvent = this.moveRealTimeEvent.bind(this)
    this.leftRealTimeEvent = this.leftRealTimeEvent.bind(this)
    this.rightRealTimeEvent = this.rightRealTimeEvent.bind(this)
    this.reportRealTimeEvent = this.reportRealTimeEvent.bind(this)

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

  place(toyRobot, x,y,f) {
    let newCoordinates = evalAndPrepCoordinates.bind(toyRobot)(x, y, f)
    let orientationGuideLine = {
      east: 90,
      south: 180,
      west: 270,
      north: 360
    }

    toyRobot.state.robot.orientation = f
    toyRobot.state.robot.orientationInDegrees = orientationGuideLine[f]
    toyRobot.state.robot.rowNumber = newCoordinates.newYAxisValue
    toyRobot.state.robot.columnNumber = newCoordinates.newXAxisValue

    return toyRobot

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

  move(toyRobot) {
    let resultingMovementValue
    switch(toyRobot.state.robot.orientation) {
      case 'north':
        resultingMovementValue = toyRobot.state.robot.rowNumber - 1
        toyRobot.state.robot.rowNumber = (resultingMovementValue < 0) ? toyRobot.state.robot.rowNumber : resultingMovementValue
        break
      case 'south':
        resultingMovementValue = toyRobot.state.robot.rowNumber + 1
        toyRobot.state.robot.rowNumber = (resultingMovementValue > (toyRobot.props.rows - 1)) ? toyRobot.state.robot.rowNumber : resultingMovementValue
        break
      case 'west':
        resultingMovementValue = toyRobot.state.robot.columnNumber - 1
        toyRobot.state.robot.columnNumber = (resultingMovementValue < 0) ? toyRobot.state.robot.columnNumber : resultingMovementValue
        break
      case 'east':
        resultingMovementValue = toyRobot.state.robot.columnNumber + 1
        toyRobot.state.robot.columnNumber = (resultingMovementValue > (toyRobot.props.columns - 1)) ? toyRobot.state.robot.columnNumber : resultingMovementValue
        break
    }
    return toyRobot
  }

  rotate(toyRobot, direction) {
    let orientationGuideLine = {
      90: 'east',
      180: 'south',
      270: 'west',
      360: 'north'
    }
    let currentOrientationDegrees = toyRobot.state.robot.orientationInDegrees
    let newOrientationDegrees
    if (direction === 'left') {
      newOrientationDegrees = ((currentOrientationDegrees - 90) === 0) ? 360 : currentOrientationDegrees - 90
    } else {
      newOrientationDegrees = ((currentOrientationDegrees + 90) > 360) ? 90 : currentOrientationDegrees + 90
    }
    toyRobot.state.robot.orientation = orientationGuideLine[newOrientationDegrees]
    toyRobot.state.robot.orientationInDegrees = newOrientationDegrees
    return toyRobot
  }

  report(toyRobot) {
    toyRobot.state.isReportVisible = true
    return toyRobot
  }

  placeRealtimeEvent(x,y,f) {
    let newState = this.place(this, x, y, f)
    this.setState(newState.state)
  }

  moveRealTimeEvent() {
    let newState = this.move(this)
    this.setState(newState.state)
  }

  leftRealTimeEvent() {
    let newState = this.rotate(this, 'left')
    this.setState(newState.state)
  }

  rightRealTimeEvent() {
    let newState = this.rotate(this, 'right')
    this.setState(newState.state)
  }

  reportRealTimeEvent() {
    let newState = this.report(this)
    this.setState(newState.state)
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
    let toyRobot = this
    let commands = this.state.spooledCommands.slice(0) //clone
    for (var index in commands) {
      let command = commands[index]
      if (command.indexOf('place') === 0) {
        let coordinates = command.split('-')
        let xCoordinates = parseInt(coordinates[1])
        let yCoordinates = parseInt(coordinates[2])
        let orientation = coordinates[3]
        toyRobot = this.place(toyRobot, xCoordinates, yCoordinates, orientation)
      } else if (command.indexOf('move') === 0) {
        toyRobot = this.move(toyRobot)
      }
    }
    this.setState(toyRobot.state)
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
            placeCommandClickHandler={ isRealtime ? this.placeRealtimeEvent : this.addPlaceToSpool}
            moveCommandClickHandler={ isRealtime ? this.moveRealTimeEvent : this.addMoveToSpool}
            leftCommandClickHandler={ isRealtime ? this.leftRealTimeEvent : this.addLeftToSpool}
            rightCommandClickHandler={isRealtime ? this.rightRealTimeEvent : this.addRightToSpool}
            reportCommandClickHandler={isRealtime ? this.reportRealTimeEvent : this.addReportToSpool}
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