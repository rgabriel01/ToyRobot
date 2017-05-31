import React from 'react';
import ReactDOM from 'react-dom';

function Move(props) {
  return (
    <div className='col-xs-12 command-container'>
      <h4>Move Command</h4>
      <div className='form-group'>
        <button type='button' className='btn btn-primary btn-block'>Move</button>
      </div>
    </div>
  )
}

export default Move