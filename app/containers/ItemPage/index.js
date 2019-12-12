import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import ItemDetails from '../../components/ItemDetails';
import BidHistory from '../../components/BidHistory';

const StyledDiv = styled.div`
  div[name='button'] {
    margin-top: 20px;
  }
`;

// Mocking the api call returning items list.
const item = {
  id: 1,
  title: 'Chair 1',
  description: 'Description',
  identifier: 'ch_1',
  startingBid: 10,
  incrementBid: 1,
  highestBid: 11,
  highestBidderEmail: 'jupatel@xactlycorp.com',
  highestBidderName: 'Jugal Patel',
};

// Mocking the api call returning items list.
const itemHistory = [
  {
    id: 1,
    itemId: 1,
    highestBid: 11,
    highestBidderEmail: 'jupatel@xactlycorp.com',
    highestBidderName: 'Jugal Patel',
  },
  {
    id: 2,
    itemId: 1,
    highestBid: 12,
    highestBidderEmail: 'ssingh@xactlycorp.com',
    highestBidderName: 'Sunil Singh',
  },
  {
    id: 3,
    itemId: 1,
    highestBid: 27,
    highestBidderEmail: 'jupatel@xactlycorp.com',
    highestBidderName: 'Jugal Patel',
  },
];

export default function ItemPage() {
  // This function makes an api call to bid on an item.
  function handleBid(item, bidValue) {
    console.log(`clicked on id: ${item.id}`);
    console.log(`bid: ${bidValue}`);
  }

  return (
    <StyledDiv>
      <ItemDetails
        key={_.uniqueId()}
        currentItem={item}
        bidHandler={handleBid}
      />
      <br />
      <BidHistory key={_.uniqueId()} currentItems={itemHistory} />
    </StyledDiv>
  );
}
