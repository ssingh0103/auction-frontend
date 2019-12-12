import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import axios from 'axios';
import ItemDetails from '../../components/ItemDetails';
import BidHistory from '../../components/BidHistory';
import { backendUrl } from '../../constants';

const StyledDiv = styled.div`
  div[name='button'] {
    margin-top: 20px;
  }
`;

// // Mocking the api call returning items list.
// const item = {
//   id: 1,
//   title: 'Chair 1',
//   description: 'Description',
//   identifier: 'ch_1',
//   startingBid: 10,
//   incrementBid: 1,
//   highestBid: 11,
//   highestBidderEmail: 'jupatel@xactlycorp.com',
//   highestBidderName: 'Jugal Patel',
// };

// Mocking the api call returning items list.
const itemHistory = [
  {
    id: 1,
    itemId: 1,
    highestBid: 11,
    highestBidderEmail: 'jupatel@xactlycorp.com',
    highestBidderName: 'Jugal Patel',
  },
  {
    id: 2,
    itemId: 1,
    highestBid: 12,
    highestBidderEmail: 'ssingh@xactlycorp.com',
    highestBidderName: 'Sunil Singh',
  },
  {
    id: 3,
    itemId: 1,
    highestBid: 27,
    highestBidderEmail: 'jupatel@xactlycorp.com',
    highestBidderName: 'Jugal Patel',
  },
];

export default function ItemPage(props) {
  // This function makes an api call to bid on an item.
  const [item, setItem] = useState(null);
  const [itemHistory, setItemHistory] = useState(null);
  function handleBid(item, bidValue) {
    console.log(`clicked on id: ${item.id}`);
    console.log(`bid: ${bidValue}`);
  }

  useEffect(() => {
    const id = props.match.params.guid;
    console.log(id);
    axios.get(`${backendUrl}/item/${id}`).then(res => {
      console.log(res);
      setItem(res.data);
      const his = [...res.data.history];
      his.sort(function(a, b) {
        const keyA = a.highestBid;
        const keyB = b.highestBid;
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });
      setItemHistory(his);
    });
  }, []);

  return (
    <StyledDiv>
      {item !== null && (
        <ItemDetails
          key={_.uniqueId()}
          currentItem={item}
          bidHandler={handleBid}
        />
      )}
      <br />
      {itemHistory !== null && (
        <BidHistory key={_.uniqueId()} currentItems={itemHistory} />
      )}
    </StyledDiv>
  );
}
