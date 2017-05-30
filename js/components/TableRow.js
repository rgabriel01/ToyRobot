import React from 'react';
import ReactDOM from 'react-dom';
import TableCell from './TableCell';

function TableRow(props) {
  return (
    <tr>
      {renderColumns()}
    </tr>
  )

  function renderColumns() {
    let {columns, isRobotOnCurrentRow, robotCurrentColumnPosition, orientation} = props
    let generatedColumns = []
    for (let column = 0; column < columns; column++ ) {
      let isRobotOnCurrentColumn = robotCurrentColumnPosition === column
      let doesRobotSitOnThisCell = isRobotOnCurrentColumn && isRobotOnCurrentRow
      let robotPlaceholderClass = doesRobotSitOnThisCell ? getOrientationName() : ''
      generatedColumns.push(
        <TableCell
          key={`colKey-${column}`}
          robotPlaceholderClass={robotPlaceholderClass}
          orientation={orientation}
        />
      )
    }
    return generatedColumns

    function getOrientationName() {
      let orientation = ''
      switch(props.orientation) {
        case 'N':
          orientation = 'north'
          break;
        case 'S':
          orientation = 'south'
          break;
        case 'W':
          orientation = 'west'
          break;
        case 'E':
          orientation = 'east'
          break;
      }
      return orientation
    }
  }

}

export default TableRow;