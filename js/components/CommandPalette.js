import React from 'react';
import ReactDOM from 'react-dom';
import Place from './commands/Place';
import Generic from './commands/Generic';

function CommandPalette(props) {
  return (
    <div>
      <div className='row mb16'>
        <div className='col-xs-12'>
          <h3 className='m0'>Command Palette</h3>
          <div className='checkbox'>
            <label>
              <input type='checkbox' onChange={props.realtimeCheckboxOnChangeHandler} checked={props.isRealtime}/>Go Realtime?
            </label>
          </div>
        </div>
      </div>
      <div className='row mb8'>
        <Place
          placeCommandClickHandler={props.placeCommandClickHandler}
        />
      </div>
      <div className='row mb8'>
        <Generic
          name='Move'
          clickHandler={props.moveCommandClickHandler}
        />
      </div>
      <div className='row mb8'>
        <Generic
          name='Left'
          clickHandler={props.leftCommandClickHandler}
        />
      </div>
      <div className='row mb8'>
        <Generic
          name='Right'
          clickHandler={props.rightCommandClickHandler}
        />
      </div>
      <div className='row mb8'>
        <Generic
          name='Report'
          clickHandler={props.reportCommandClickHandler}
        />
      </div>
    </div>
  )
}

export default CommandPalette