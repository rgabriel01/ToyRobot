import React from 'react';
import ReactDOM from 'react-dom';
import TableRow from './TableRow';

function Table(props) {
  return (
    <table className='table table-bordered'>
      <tbody>
        {renderTableContent()}
      </tbody>
    </table>
  )

  function renderTableContent() {
    let {rows, columns} = props.tableDimension
    let {orientation, rowNumber, columnNumber} = props.robot
    let generatedRows = []
    for (let row = 0; row < rows; row++ ) {
      let isRobotOnCurrentRow = (rowNumber === row)
      generatedRows.push(
        <TableRow
          key={`rowKey-${row}`}
          isRobotOnCurrentRow={isRobotOnCurrentRow}
          robotCurrentColumnPosition={columnNumber}
          columns={columns}
          orientation={orientation}
          yAxisIndex={row}
        />
      )
    }
    return generatedRows
  }

}

export default Table;