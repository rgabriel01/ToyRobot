import React from 'react';
import ReactDOM from 'react-dom';

function Generic(props) {
  return (
    <div className='col-xs-12 command-container'>
      <h4>{`${props.name} Command`}</h4>
      <div className='form-group'>
        <button type='button' className='btn btn-primary btn-block' onClick={props.clickHandler}>{props.name}</button>
      </div>
    </div>
  )
}

export default Generic