/**
 *
 * AdminPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AgGridReact } from 'ag-grid-react';
import makeSelectAdminPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { columnDefs } from './gridHeaders';
import { backendUrl } from '../../constants';
import axios from 'axios';
import AdminList from 'components/AdminList';
import AddEditItem from '../../components/AddEditItem';

export function AdminPage() {
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });

  const [value, setValue] = React.useState(0);
  const [data, setData] = useState(null);
  const [items, setItems] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .get(`${backendUrl}/item`)
      .then(response => {
        setItems(response.data);
        const newData = [];
        response.data.forEach(item => {
          const temp = {};
          temp.id = item.identifier;
          temp.title = item.title;
          temp.hb = item.highestBid;
          temp.hbe = item.highestBidderEmail;
          temp.hbn = item.highestBidderName;
          newData.push(temp);
        });
        setData(newData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="List" />
        <Tab label="Add Item" />
        <Tab label="Item Three" />
      </Tabs>
      {value == 0 && <AdminList data={data} />}
      {value == 1 && <AddEditItem />}
    </div>
  );
}

AdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminPage: makeSelectAdminPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminPage);
