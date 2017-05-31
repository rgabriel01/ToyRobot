import React from 'react';
import ReactDOM from 'react-dom';

function Place(props) {
  return (
    <div className='col-xs-12 command-container'>
      <h4>Place Command</h4>
      <div className='row mb8'>
        <div className='col-xs-4'>
          <h5>X-Axis</h5>
        </div>
        <div className='col-xs-8'>
          <input type='text' className='form-control input-x-axis'/>
        </div>
      </div>
      <div className='row mb8'>
        <div className='col-xs-4'>
          <h5>Y-Axis</h5>
        </div>
        <div className='col-xs-8'>
          <input type='text' className='form-control input-y-axis'/>
        </div>
      </div>
      <div className='row mb8'>
        <div className='col-xs-4'>
          <h5>Orientation</h5>
        </div>
        <div className='col-xs-8'>
          <select className="form-control input-orientation">
            <option value='N'>NORTH</option>
            <option value='S'>SOUTH</option>
            <option value='E'>EAST</option>
            <option value='W'>WEST</option>
          </select>
        </div>
      </div>
      <div className='form-group'>
        <button type='button' className='btn btn-primary btn-block' onClick={triggerPlaceCommand}>Place</button>
      </div>
    </div>
  )

  function triggerPlaceCommand() {
    let xAxisValue = prepAxisValue(document.querySelector('.input-x-axis').value)
    let yAxisValue = prepAxisValue(document.querySelector('.input-y-axis').value)
    let orientationValue = document.querySelector('.input-orientation').value
    props.placeCommandClickHandler(xAxisValue, yAxisValue, orientationValue)

    function prepAxisValue(axisValue) {
      return isNaN(axisValue) ? 0 : parseInt(axisValue)
    }
  }

}

export default Place