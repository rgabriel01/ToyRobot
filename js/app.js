import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table';

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
      <div className='p50'>
        <Table
          tableDimension={{rows: 5, columns: 5}}
          robot={this.state.robot}
        />
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));