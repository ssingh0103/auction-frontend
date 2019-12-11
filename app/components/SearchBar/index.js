import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const StyledDiv = styled.div``;

export default function SearchBar({ searchHandler }) {
  // Use bid value to track state of user
  const [searchValue, setSearchValue] = useState('');

  // Handler for updating bid value
  const handleSearchValueChange = value => {
    setSearchValue(value.target.value);
  };

  const classes = useStyles();
  const [category, setCategory] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setCategory(event.target.value);
  };

  return (
    <StyledDiv>
      <p>Search:</p>
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
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="description">Description</MenuItem>
          <MenuItem value="identifier">Identifier</MenuItem>
          <MenuItem value="highestBidEmail">Highest Bidder</MenuItem>
        </Select>
      </FormControl>
      <input value={searchValue} onChange={handleSearchValueChange} />
      <Button
        onClick={() => searchHandler(searchValue, category)}
        color="primary"
      >
        Search
      </Button>
    </StyledDiv>
  );
}
