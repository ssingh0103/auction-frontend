import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import SimpleReactValidator from 'simple-react-validator';

const StyledDiv = styled.div`
  display: flex;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.22);

  div.info {
    margin: 20px 5px 20px 5px;
  }

  div.info > div {
    padding-top 6px;
    font-size: 12px;
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
  text-align: center;
`;

export default function ListItem({ currentItem, bidHandler, isLoggedIn }) {
  // Get properties of the current item to display
  const {
    title,
    startingBid,
    highestBid,
    highestBidderEmail,
    incrementBid,
  } = currentItem;
  const maxBidValue = highestBid ? highestBid + incrementBid : startingBid;

  // Use bid value to track state of user
  const [bidValue, setBidValue] = useState(maxBidValue);

  // Handler for updating bid value
  const handleBidChange = value => {
    setBidValue(value.target.value);
  };

  // Validation
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [validator] = useState(
    new SimpleReactValidator({ messages: { default: '' } }),
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
        <div className="itemTitle">
          Title: <strong>{title}</strong>
        </div>
        <div>
          {highestBid
            ? `Current Bid:${highestBid}`
            : `Minimum Bid:${startingBid}`}
        </div>
        <div>
          {highestBid
            ? `Highest bidder: ${highestBidderEmail}`
            : 'No bids yet.'}
        </div>
        <div>Minimum increment: {incrementBid}</div>

        <div className="section">
          <TextField
            id="bidValue"
            label="Bid Value"
            error={
              validator.message(
                'Bid Value',
                bidValue,
                `required|currency|min:${maxBidValue},num`,
              ) != null
            }
            helperText={
              'Bid value is required' &&
              validator.message(
                'Bid Value',
                bidValue,
                `required|currency|min:${maxBidValue},num`,
              )
            }
            value={bidValue}
            onChange={handleBidChange}
          />
        </div>
        <div>
          <Button
            disabled={!isLoggedIn}
            onClick={onBidClick}
            variant="contained"
            color="primary"
          >
            Bid
          </Button>
        </div>
      </div>
    </StyledDiv>
  );
}
