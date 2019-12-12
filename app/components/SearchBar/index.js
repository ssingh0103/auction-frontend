import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import SimpleReactValidator from 'simple-react-validator';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const StyledDiv = styled.div`
  h1 {
    margin-left: 10px;
  }

  div[class='srv-validation-message'] {
    color: #f76321;
    display: inline;
  }

  div.bar {
    display: flex;
  }

  div.section {
    display: inline;
  }

  button {
    margin-top: 15px;
    margin-left: 20px;
    height: 40px;
  }
`;

export default function SearchBar({ searchHandler, clearHandler }) {
  // Use bid value to track state of user
  const [searchValue, setSearchValue] = useState('');

  // Handler for updating bid value
  const handleSearchValueChange = value => {
    setSearchValue(value.target.value);
  };

  // Code for dropdown.
  const classes = useStyles();
  const [category, setCategory] = React.useState('');
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  // Updates the label width for the dropdown.
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  // Change handler for dropdown.
  const handleChange = event => {
    setCategory(event.target.value);
  };

  // Validation
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [validator] = useState(
    new SimpleReactValidator({ messages: { default: '' } }),
  );

  // Fired to validate the input
  const onSearchClick = () => {
    if (validator.allValid()) {
      searchHandler(searchValue, category);
    } else {
      validator.showMessages();
      forceUpdate();
    }
  };

  return (
    <StyledDiv>
      <h1>Search:</h1>
      <div className="bar">
        <div className="section">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={category}
              onChange={handleChange}
              labelWidth={labelWidth}
              error={
                validator.message('Category', category, 'required') != null
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="description">Description</MenuItem>
              <MenuItem value="identifier">Identifier</MenuItem>
              <MenuItem value="highestBidderEmail">Highest Bidder</MenuItem>
            </Select>
            <FormHelperText
              error={
                validator.message('Category', category, 'required') != null
              }
            >
              Select a category
            </FormHelperText>
          </FormControl>
        </div>
        <div className="section">
          <TextField
            id="searchValue"
            label="Search"
            value={searchValue}
            onChange={handleSearchValueChange}
            error={
              validator.message('Search Value', searchValue, `required`) != null
            }
            helperText={
              'Search value is required' &&
              validator.message('Search Value', searchValue, `required`)
            }
          />
        </div>
        <Button onClick={onSearchClick} variant="contained" color="primary">
          Search
        </Button>
        <Button onClick={clearHandler} variant="contained" color="secondary">
          Clear
        </Button>
      </div>
    </StyledDiv>
  );
}
