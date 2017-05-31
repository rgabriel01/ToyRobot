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
      let robotPlaceholderClass = doesRobotSitOnThisCell ? props.orientation : ''
      generatedColumns.push(
        <TableCell
          key={`colKey-${column}`}
          robotPlaceholderClass={robotPlaceholderClass}
          orientation={orientation}
        />
      )
    }
    return generatedColumns
  }

}

export default TableRow;