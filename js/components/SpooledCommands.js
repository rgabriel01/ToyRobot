import React from 'react';
import ReactDOM from 'react-dom';

function SpooledCommands(props) {
  return (
    <div className='row mb16'>
      <div className='col-xs-12 command-container'>
        <h4>Command List</h4>
        <ul className="list-group">
          {renderCommandItem()}
        </ul>
        <div className='form-group'>
          <button type='button' className='btn btn-primary btn-block' onClick={props.spooledCommandsOnClickHandler}>Execute!</button>
        </div>
      </div>
    </div>
  )

  function renderCommandItem() {
    return props.commands.map(function(command) {
      let key = Math.random().toString(36).substring(7)
      return (
        <li className="list-group-item" key={key}>{command}</li>
      )
    })
  }
}

export default SpooledCommands