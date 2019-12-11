/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import ListItem from '../../components/ListItem';

const StyledDiv = styled.div`
  div[name='button'] {
    margin-top: 20px;
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

  return (
    <StyledDiv>
      {items.map(item => (
        <ListItem
          key={_.uniqueId()}
          currentItem={item}
          bidHandler={handleBid}
        />
      ))}
    </StyledDiv>
  );
}
