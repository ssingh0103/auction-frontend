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

function AdminList({ data }) {
  const onGridReady = params => {
    params.api.resetRowHeights();
    };
  return (
    <div
      className="ag-theme-balham"
      style={{
        height: '500px',
        width: '1200px',
      }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={data}
        onGridReady={onGridReady}
      />
    </div>
  );
}

AdminList.propTypes = {};

export default AdminList;
