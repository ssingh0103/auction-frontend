import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import axios from 'axios';
import ItemDetails from '../../components/ItemDetails';
import Grid from '@material-ui/core/Grid';
import { backendUrl } from '../../constants';
import HistoryTable from '../../components/HistoryTable';

const StyledDiv = styled.div`
  margin: 10px;
`;

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
      <Grid container spacing={3}>
        {item !== null && (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={8}
            xl={8}
            key={_.uniqueId('item')}
          >
            <ItemDetails
              key={_.uniqueId()}
              currentItem={item}
              bidHandler={handleBid}
              isLoggedIn={user != null}
            />
          </Grid>
        )}
        {itemHistory !== null && (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={4}
            key={_.uniqueId('hist')}
          >
            <HistoryTable key={_.uniqueId()} currentItems={itemHistory} />
          </Grid>
        )}
      </Grid>
    </StyledDiv>
  );
}
