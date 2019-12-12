import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import axios from 'axios';
import ItemDetails from '../../components/ItemDetails';
import BidHistory from '../../components/BidHistory';
import { backendUrl } from '../../constants';

const StyledDiv = styled.div`
  margin: 10px;
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  div[name='button'] {
    margin-top: 20px;
  }
`;

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
  const { user } = props;
  // This function makes an api call to bid on an item.
  const [item, setItem] = useState(null);
  const [itemHistory, setItemHistory] = useState(null);

  function handleBid(item, bidValue) {
    const updatedItem = {
      ...item,
      highestBid: parseInt(bidValue),
      highestBidderEmail: user.email,
      highestBidderName: `${user.name} ${user.surname}`,
    };
    axios
      .put(`${backendUrl}/item/highbid/${item._id}`, updatedItem)
      .then(res => {
        const id = props.match.params.guid;
        axios.get(`${backendUrl}/item/${id}`).then(res => {
          setItem(res.data);
          setItemHistory(res.data.history);
        });
      });
  }

  useEffect(() => {
    const id = props.match.params.guid;
    axios.get(`${backendUrl}/item/${id}`).then(res => {
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
      {itemHistory !== null && (
        <BidHistory key={_.uniqueId()} currentItems={itemHistory} />
      )}
    </StyledDiv>
  );
}
