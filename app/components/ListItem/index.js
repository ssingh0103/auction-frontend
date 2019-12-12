import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import SimpleReactValidator from 'simple-react-validator';

const StyledDiv = styled.div`
  display: flex;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.22);

  div.info {
    margin: 20px;
  }

  div.title {
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
  const { title, highestBidValue, highestBidName, minIncrement } = currentItem;

  // Use bid value to track state of user
  const [bidValue, setBidValue] = useState(highestBidValue + minIncrement);

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
        <div className="title">Title: {title}</div>
        <div>Current bid: {highestBidValue}</div>
        <div>Highest bidder: {highestBidName}</div>
        <div>Minimum increment: {minIncrement}</div>

        <div className="section">
          <label htmlFor="schemaName" name="title">
            Bid Value
            <span>
              {validator.message(
                'Bid Value',
                bidValue,
                `required|currency|min:${highestBidValue + minIncrement},num`,
              )}
            </span>
          </label>
          <input
            name="bidValue"
            id="bidValue"
            value={bidValue}
            onChange={handleBidChange}
          />
        </div>

        <div>
          <Button onClick={onBidClick} color="primary">
            Bid
          </Button>
        </div>
      </div>
    </StyledDiv>
  );
}
