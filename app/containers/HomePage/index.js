/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React,{useEffect} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import ListItem from '../../components/ListItem';
import SearchBar from '../../components/SearchBar';
import axios from 'axios';
import url from '../../constants'

const StyledDiv = styled.div`
  padding: 20px;

  div[name='button'] {
    margin-top: 20px;
  }

  div.listing {
    margin: 10px;
  }
`;

// Mocking the api call returning items list.
const items = [
  {
    id: 1,
    title: 'Chair 1',
    description: 'Description',
    identifier: 'ch_1',
    startingBid: 10,
    minIncrement: 1,
    highestBidValue: 11,
    highestBidEmail: 'jupatel@xactlycorp.com',
    highestBidName: 'Jugal Patel',
  },
  {
    id: 2,
    title: 'Chair 2',
    description: 'Description',
    identifier: 'ch_2',
    startingBid: 10,
    minIncrement: 1,
    highestBidValue: 12,
    highestBidEmail: 'ssingh@xactlycorp.com',
    highestBidName: 'Sunil Singh',
  },
  {
    id: 3,
    title: 'Desk 1',
    description: 'Description',
    identifier: 'dk_1',
    startingBid: 25,
    minIncrement: 1,
    highestBidValue: 27,
    highestBidEmail: 'jupatel@xactlycorp.com',
    highestBidName: 'Jugal Patel',
  },
];

export default function HomePage() {
  // This function makes an api call to bid on an item.
  function handleBid(item, bidValue) {
    console.log(`clicked on id: ${item.id}`);
    console.log(`bid: ${bidValue}`);
  }

  function handleSearch(searchValue, category) {
    // TO DO: Filter listings using the category and value.
    console.log(`search category: ${category}`);
    console.log(`search for: ${searchValue}`);
  }

  useEffect(()=>{
    axios.get(url+'/item').then(res=>{
      console.log(res);
    })
  })

  return (
    <StyledDiv>
      <SearchBar searchHandler={handleSearch} />
      <div className="listing">
        <Grid container spacing={3}>
          {items.map(item => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              key={_.uniqueId('cardId_')}
            >
              <ListItem currentItem={item} bidHandler={handleBid} />
            </Grid>
          ))}
        </Grid>
      </div>
    </StyledDiv>
  );
}
