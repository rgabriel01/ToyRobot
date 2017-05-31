import React from 'react';
import ReactDOM from 'react-dom';

function TableCell(props) {
  let {yAxisIndex, xAxisIndex, robotPlaceholderClass} = props
  return (
    <td className={`${robotPlaceholderClass} fs10 text-muted`}>{`(${xAxisIndex},${yAxisIndex})`}</td>
  )
}

export default TableCell;