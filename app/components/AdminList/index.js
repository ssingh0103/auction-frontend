/**
 *
 * AdminList
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react';
import { columnDefs } from './gridHeaders';

/* Actions components which renders delete button */
class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    const rowData = this.props.data;
    this.props.handleClick(rowData);
  }

  render() {
    // put in render logic
    return (
      <div>
        <a href="" onClick={this.handleClick}>
          Delete
        </a>
      </div>
    );
  }
}

const newColumnDefs = [
  ...columnDefs,
  {
    headerName: 'Edit',
    cellRendererFramework: Actions,
    cellRendererParams: {
      handleClick: item => console.log(item),
    },
  },
];

function AdminList({ data }) {
  const onGridReady = params => {
    params.api.resetRowHeights();
  };
  //  columnDefs.push({
  //   headerName: 'Button Col 1',
  //   cellRenderer: 'buttonRenderer',
  //   cellRendererParams: {
  //     onClick: (item)=>console.log(item),
  //     label: 'Click'
  //  });

  return (
    <div
      className="ag-theme-balham"
      style={{
        height: '500px',
        width: '1200px',
      }}
    >
      <AgGridReact
        columnDefs={newColumnDefs}
        rowData={data}
        onGridReady={onGridReady}
      />
    </div>
  );
}

AdminList.propTypes = {};

export default AdminList;
