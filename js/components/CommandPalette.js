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
        <Generic name='Left'/>
      </div>
      <div className='row mb8'>
        <Generic name='Right'/>
      </div>
      <div className='row mb8'>
        <Generic name='Report'/>
      </div>
    </div>
  )
}

export default CommandPalette