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
  const [currentItem, setCurrentItem] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCurrentItem(null);
  };

  useEffect(() => {
    axios
      .get(`${backendUrl}/item`)
      .then(response => {
        dataSetter(response.data);
        setItems(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const dataSetter = items => {
    const newData = [];
    items.forEach(item => {
      const temp = {};
      temp.id = item._id;
      temp.identifier = item.identifier;
      temp.title = item.title;
      temp.hb = item.highestBid;
      temp.hbe = item.highestBidderEmail;
      temp.hbn = item.highestBidderName;
      newData.push(temp);
    });
    setData(newData);
  };

  useEffect(() => {
    if (value == 0) {
      axios
        .get(`${backendUrl}/item`)
        .then(response => {
          const newData = [];
          dataSetter(response.data);
          setItems(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [value]);

  const handleEdit = item => {
    const { id } = item;

    axios.get(`${backendUrl}/item/${id}`).then(res => {
      setCurrentItem(res.data);
      setValue(1);
    });
  };

  const handleSave = item => {
    axios.post(`${backendUrl}/item/`, item).then(res => {
      const newItems = [...items, res.data];
      setItems(newItems);
      setValue(0);
    });
  };

  const handleUpdate = item => {
    const id = item._id;
    axios.put(`${backendUrl}/item/${id}`, item).then(res => {
      setCurrentItem(res.data);
      setValue(0);
    });
  };
  const handleDelete = item => {
    const { id } = item;

    console.log('Deleting');
    axios.delete(`${backendUrl}/item/${id}`).then(res => {
      axios
        .get(`${backendUrl}/item`)
        .then(response => {
          dataSetter(response.data);
          setItems(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="List" />
        <Tab label="Add/Edit Item" />
      </Tabs>
      {value == 0 && (
        <AdminList
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
      {value == 1 && (
        <AddEditItem
          currentItem={currentItem}
          handleSave={handleSave}
          handleUpdate={handleUpdate}
        />
      )}
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
