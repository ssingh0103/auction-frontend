/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import ListItem from '../../components/ListItem';
import SearchBar from '../../components/SearchBar';
import { backendUrl } from '../../constants';

const StyledDiv = styled.div`
  padding: 20px;

  div[name='button'] {
    margin-top: 20px;
  }

  div.listing {
    margin: 10px;
  }

  h2 {
    margin-left: 20px;
  }
`;

export default function HomePage({ user }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  // Load the data from the backend.
  useEffect(() => {
    axios
      .get(`${backendUrl}/item`)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // This function makes an api call to bid on an item.
  function handleBid(item, bidValue) {
    const updatedItem = {
      ...item,
      highestBid: parseInt(bidValue),
      highestBidderEmail: user.email,
      highestBidderName: `${user.name} ${user.surname}`,
    };
    axios
      .put(`${backendUrl}/item/highbid/${item._id}`, updatedItem)
      .then(res => {
        axios
          .get(`${backendUrl}/item`)
          .then(response => {
            setItems(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      });
  }

  function handleSearch(searchValue, category) {
    const tempItems = items.filter(
      item =>
        item[category] != null &&
        item[category].toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredItems(tempItems);
    setIsFiltered(true);
  }

  function handleClear() {
    setIsFiltered(false);
  }

  return (
    <StyledDiv>
      <SearchBar searchHandler={handleSearch} clearHandler={handleClear} />
      <div className="listing">
        <Grid container spacing={3}>
          {!isFiltered && items.length === 0 && <h2>No items found.</h2>}
          {isFiltered && filteredItems.length === 0 && (
            <h2>No items found with that criteria.</h2>
          )}
          {!isFiltered &&
            items.map(item => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                key={_.uniqueId('cardId_')}
              >
                <ListItem
                  currentItem={item}
                  bidHandler={handleBid}
                  isLoggedIn={user !== null}
                />
              </Grid>
            ))}
          {isFiltered &&
            filteredItems.map(item => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                key={_.uniqueId('cardId_')}
              >
                <ListItem
                  currentItem={item}
                  bidHandler={handleBid}
                  isLoggedIn={user !== null}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </StyledDiv>
  );
}
