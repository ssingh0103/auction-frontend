import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import {
  Button,
  TextField,
  InputLabel,
  Input,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SimpleReactValidator from 'simple-react-validator';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import FormHelperText from '@material-ui/core/FormHelperText';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: '100%',
  },
  media: {
    height: 400,
    backgroundColor: '#E5E5E5',
    margin: 12,
  },
  identifier: {
    fontSize: 12,
  },
  formControl: {
    width: '70%',
    padding: 5,
  },
  placeBid: {
    width: '30%',
  },
  description: {
    height: 60,
  },
});

const StyledDiv = styled.div`
  display: flex;

  &:hover {
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  div.info {
    margin: 20px 5px 20px 5px;
  }

  div[class='srv-validation-message'] {
    color: #f76321;
    display: inline;
  }

  input[name='bidValue'] {
    margin-left: 5px;
    width: 100px;
  }

  div.title {
    font-size: 16px;
  }

  pre.description {
    font-family: 'Poppins', sans-serif;
  }
`;

function truncateString(str, length) {
  if (str.length > length) {
    return `${str.substring(0, length - 3)} ...`;
  }
  return str;
}

export default function ListItem({
  currentItem,
  bidHandler,
  isLoggedIn,
  detailsClickHandler,
}) {
  // Get properties of the current item to display
  const {
    title,
    startingBid,
    highestBid,
    highestBidderEmail,
    description,
    incrementBid,
    identifier,
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

  const clickHandler = isLoggedIn
    ? () => detailsClickHandler(currentItem)
    : () => {};

  // Sytling for Card
  const classes = useStyles();

  return (
    <StyledDiv>
      <Card className={classes.card}>
        <CardActionArea onClick={clickHandler}>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography className={classes.identifier} color="textSecondary">
              <em>{identifier}</em>
            </Typography>
            <Typography
              className={classes.description}
              variant="body2"
              gutterBottom
              component="p"
            >
              <pre className="description">
                {truncateString(description, 75)}
              </pre>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {highestBid
                ? `Current Bid: $${highestBid}`
                : `Minimum Bid: $${startingBid}`}
              &nbsp;({highestBid ? `${highestBidderEmail}` : 'No bids yet'})
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="searchValue">
              {'Bid value is required' &&
                validator.message(
                  'Bid Value',
                  bidValue,
                  `required|currency|min:${maxBidValue},num`,
                )}
            </InputLabel>
            <Input
              id="bidValue"
              value={bidValue}
              onChange={handleBidChange}
              error={
                validator.message(
                  'Bid Value',
                  bidValue,
                  `required|currency|min:${maxBidValue},num`,
                ) != null
              }
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
          <Button
            className={classes.placeBid}
            disabled={!isLoggedIn}
            onClick={onBidClick}
            variant="contained"
            color="primary"
          >
            Place Bid
          </Button>
        </CardActions>
      </Card>
    </StyledDiv>
  );
}
