import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import CommandPalette from './components/CommandPalette'
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
      isReportVisible: false
    }
    this.place = this.place.bind(this)
    this.move = this.move.bind(this)
    this.rotate = this.rotate.bind(this)
    this.left = this.left.bind(this)
    this.right = this.right.bind(this)
    this.report = this.report.bind(this)
    this.renderReport = this.renderReport.bind(this)
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

  renderReport() {
    let {orientation, rowNumber, columnNumber} = this.state.robot
    let reportVisibilityClass = this.state.isReportVisible ? '' : 'hidden'
    return (
      <div className={`alert alert-success ${reportVisibilityClass}`}>
        {`Robot is at X: ${columnNumber} Y: ${rowNumber}, facing the ${orientation}`}
      </div>
    )
  }

  render() {
    return (
      <div className='row p50'>
        <div className='col-xs-12 col-sm-6'>
          <CommandPalette
            placeCommandClickHandler={this.place}
            moveCommandClickHandler={this.move}
            leftCommandClickHandler={this.left}
            rightCommandClickHandler={this.right}
            reportCommandClickHandler={this.report}
          />
        </div>
        <div className='col-xs-12 col-sm-6 table-responsive'>
          <Table
            tableDimension={{rows: this.props.rows, columns: this.props.columns}}
            robot={this.state.robot}
          />
        </div>
        <div className='col-xs-12 col-sm-6 table-responsive'>
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