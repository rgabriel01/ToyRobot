import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import CommandPalette from './components/CommandPalette'
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      robot: {
        orientation: 'N',
        rowNumber: 0,
        columnNumber: 0
      }
    }
    this.place = this.place.bind(this)
  }

  place(x,y,f) {
    debugger
    this.setState({
      robot: {
        orientation: f,
        rowNumber: x,
        columnNumber: y
      }
    })
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
            tableDimension={{rows: 5, columns: 5}}
            robot={this.state.robot}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));