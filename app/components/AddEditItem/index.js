/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import SimpleReactValidator from 'simple-react-validator';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const StyledDiv = styled.div`
  padding: 20px;
  div[class='srv-validation-message'] {
    color: #f76321;
    display: inline;
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: 600,
    },
  },
}));

export default function AddEditItem({ creating, currentItem, saveItem }) {
  const [item, setItem] = useState({
    title: '',
    description: '',
    identifier: '',
    startingBid: 1,
    incrementBid: 1,
  });

  useEffect(() => {
    if (currentItem != null) {
      const tmpCopy = _.cloneDeep(currentItem);
      setItem(tmpCopy);
    }
  }, [currentItem]);

  const handleFieldChange = event => {
    setItem({ ...item, [event.target.id]: event.target.value });
  };

  // Validation
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [validator] = useState(
    new SimpleReactValidator({ messages: { default: '' } }),
  );

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

  // Styles
  const classes = useStyles();

  return (
    <StyledDiv>
      <div className={classes.root}>
        <div className="input">
          <TextField
            id="title"
            label="Title"
            error={validator.message('Title', item.title, 'required') != null}
            helperText={
              'Title is required' &&
              validator.message('Title', item.title, 'required')
            }
            value={item.title}
            onChange={handleFieldChange}
            variant="outlined"
          />
        </div>
        <div className="input">
          <TextField
            id="description"
            label="Description"
            value={item.description}
            onChange={handleFieldChange}
            multiline
            rows="10"
            variant="outlined"
          />
        </div>
        <div className="input">
          <TextField
            id="identifier"
            label="Identifier"
            error={
              validator.message(
                'Identifier',
                item.identifier,
                'required|string',
              ) != null
            }
            helperText={
              'Identifier is required' &&
              validator.message('Identifier', item.identifier, 'required')
            }
            value={item.identifier}
            onChange={handleFieldChange}
            variant="outlined"
          />
        </div>
        <div className="input">
          <TextField
            id="startingBid"
            label="Starting Bid"
            error={
              validator.message(
                'Starting Bid',
                item.startingBid,
                'required|currency|min:1,num',
              ) != null
            }
            helperText={
              'Starting bid is required' &&
              validator.message(
                'Starting Bid',
                item.startingBid,
                'required|currency|min:1,num',
              )
            }
            value={item.startingBid}
            onChange={handleFieldChange}
            variant="outlined"
          />
        </div>
        <div className="input">
          <TextField
            id="incrementBid"
            label="Minimum Increment"
            error={
              validator.message(
                'Minimum Increment',
                item.incrementBid,
                'required|currency|min:1,num',
              ) != null
            }
            helperText={
              'Minimum increment is required' &&
              validator.message(
                'Minimum Increment',
                item.incrementBid,
                'required|currency|min:1,num',
              )
            }
            value={item.incrementBid}
            onChange={handleFieldChange}
            variant="outlined"
          />
        </div>
      </div>
      <div>
        <Button onClick={onSaveClick} variant="contained" color="primary">
          Save
        </Button>
      </div>
    </StyledDiv>
  );
}