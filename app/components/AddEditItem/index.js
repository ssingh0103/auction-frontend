/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import SimpleReactValidator from 'simple-react-validator';
import { Button } from '@material-ui/core';

const StyledDiv = styled.div`
  padding: 20px;
`;

export default function AddEditItem({ creating, item }) {
  const [item, setItem] = useState(item);

  const handleFieldChange = nameValue => {
    setItem({ ...item, [nameValue.target.name]: nameValue.target.value });
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
  const onSaveClick = () => {
    if (validator.allValid()) {
      // TODO: Make axios request to save item.
      console.log(item);
    } else {
      validator.showMessages();
      forceUpdate();
    }
  };

  return (
    <StyledDiv>
      <div>
        <div name="section">
          <label htmlFor="title" name="title">
            Title:
            {validator.message('Title', item.title, 'required')}
          </label>
          <input
            type="title"
            id="title"
            name="title"
            value={item.title}
            onChange={handleFieldChange}
          />
        </div>

        <Button onClick={onSaveClick}>Save</Button>
      </div>
    </StyledDiv>
  );
}
