import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import SimpleReactValidator from 'simple-react-validator';

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

const ImageDiv = styled.div`
  height: 200px;
  width: 200px;
  margin: 10px;
  border: 1px solid #ececed;
`;

export default function ListItem({ currentItem, bidHandler }) {
  // Get properties of the current item to display
  const { title, highestBid, highestBidderEmail, incrementBid } = currentItem;

  // Use bid value to track state of user
  const [bidValue, setBidValue] = useState(highestBid + incrementBid);

  // Handler for updating bid value
  const handleBidChange = value => {
    setBidValue(value.target.value);
  };

  // Validation
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [validator] = useState(
    new SimpleReactValidator({ messages: { default: '*' } }),
  );

  // Show validation if does not meet criteria.
  validator.showMessages();

  // Fired to validate the input
  const onBidClick = () => {
    if (validator.allValid()) {
      bidHandler(currentItem, bidValue);
    } else {
      validator.showMessages();
      forceUpdate();
    }
  };

  return (
    <StyledDiv>
      <ImageDiv>Image</ImageDiv>
      <div className="info">
        <div className="itemTitle">Title: {title}</div>
        <div>Current bid: {highestBid}</div>
        <div>Highest bidder: {highestBidderEmail}</div>
        <div>Minimum increment: {incrementBid}</div>

        <div className="section">
          <label htmlFor="bidValue" name="title">
            Bid Value
            <span>
              {validator.message(
                'Bid Value',
                bidValue,
                `required|currency|min:${highestBid + incrementBid},num`,
              )}
            </span>
          </label>
          <input
            type="bidValue"
            name="bidValue"
            id="bidValue"
            value={bidValue}
            onChange={handleBidChange}
          />
        </div>

        <div>
          <Button onClick={onBidClick} variant="contained" color="primary">
            Bid
          </Button>
        </div>
      </div>
    </StyledDiv>
  );
}
