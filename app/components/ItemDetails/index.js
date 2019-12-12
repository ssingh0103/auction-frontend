import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const StyledDiv = styled.div`
  background-color: green;
`;

export default function ListItem({ currentItem, bidHandler }) {
  // Get properties of the current item to display
  const {
    title,
    description,
    highestBidValue,
    highestBidName,
    minIncrement,
  } = currentItem;

  // Use bid value to track state of user
  const [bidValue, setBidValue] = useState(highestBidValue + minIncrement);

  // Handler for updating bid value
  const handleBidChange = value => {
    setBidValue(value.target.value);
  };

  return (
    <StyledDiv>
      <div>
        <h3>Image</h3>
        <br />
        <p>Title: {title}</p>
        <p>Description: {description}</p>
        <p>Current bid: {highestBidValue}</p>
        <p>Highest bidder: {highestBidName}</p>
        <p>Minimum increment: {minIncrement}</p>
      </div>
      <input value={bidValue} onChange={handleBidChange} />
      <Button onClick={() => bidHandler(currentItem, bidValue)} color="primary">
        Bid
      </Button>
    </StyledDiv>
  );
}
