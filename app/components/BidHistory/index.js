import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.22);

  div.info {
    margin: 20px 5px 20px 5px;
  }

  div.itemTitle {
    color: #346f8f;
  }

  div[class='srv-validation-message'] {
    color: #f76321;
    display: inline;
  }

  input[name='bidValue'] {
    margin-left: 5px;
    width: 100px;
  }
`;

export default function BidHistory({ currentItem, bidHandler }) {
  // Get properties of the current item to display
  const {
    itemId,
    highestBid,
    highestBidderEmail,
    highestBidderName,
  } = currentItem;

  return (
    <StyledDiv>
      <div className="info">
        <div>Highest bidder name : {highestBidderName || 'No bids yet'}</div>
        <div>Highest bidder email: {highestBidderEmail || 'No bids yet'}</div>
        <div>Highest bid: {highestBid || 'No bids yet'}</div>
      </div>
    </StyledDiv>
  );
}
