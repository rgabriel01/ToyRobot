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

  render() {
    return (
      <div className='row p50'>
        <div className='col-xs-6'>
          <CommandPalette
            placeCommandClickHandler={this.place}
          />
        </div>
        <div className='col-xs-6'>
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