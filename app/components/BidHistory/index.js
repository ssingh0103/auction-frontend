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

export default function BidHistory({ currentItems }) {
  return (
    <StyledDiv>
      <table border="1">
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id}>
              <td>{item.highestBidderName}</td>
              <td>{item.highestBidderEmail}</td>
              <td>{item.highestBid}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="info">
        {currentItems.length === 0 && <h6>No bids yet</h6>}
      </div>
    </StyledDiv>
  );
}
