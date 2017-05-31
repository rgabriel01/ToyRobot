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
        rowNumber: 0,
        columnNumber: 0
      }
    }
    this.place = this.place.bind(this)
    this.move = this.move.bind(this)
  }

  place(x,y,f) {
    let newCoordinates = evalAndPrepCoordinates.bind(this)(x, y, f)
    this.setState({
      robot: {
        orientation: f,
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

  render() {
    return (
      <div className='row p50'>
        <div className='col-xs-12 col-sm-6'>
          <CommandPalette
            placeCommandClickHandler={this.place}
            moveCommandClickHandler={this.move}
          />
        </div>
        <div className='col-xs-12 col-sm-6 table-responsive'>
          <Table
            tableDimension={{rows: this.props.rows, columns: this.props.columns}}
            robot={this.state.robot}
          />
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