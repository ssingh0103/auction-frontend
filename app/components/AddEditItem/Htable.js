import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import {backendUrl} from '../../constants';
import axios from 'axios';
import history from 'utils/history'
const useStyles = makeStyles({
  table: {
  },
});

const StyledDiv = styled.div`
  margin: 10px;
`;



export default function Htable({ currentItems,handleHistoryDelete }) {
  const classes = useStyles();
    const [bidHistory,setBidHistory] = useState([]);
useEffect(()=>{
    currentItems.sort(function(a, b) {
        const keyA = a.highestBid;
        const keyB = b.highestBid;
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });
    setBidHistory(currentItems);
},[currentItems])


  const handleDelete = (id)=>{

    axios.delete(`${backendUrl}/bidHistory/${id}`).then(res=>{
        handleHistoryDelete(id);
        
    })
}

  return (
    <StyledDiv>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Bid Amount&nbsp;($)</TableCell>
            <TableCell>Delete&nbsp;($)</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {bidHistory.map(item => (
            <TableRow key={_.uniqueId('item')}>
              <TableCell component="th" scope="row">
                {item.highestBidderName}
              </TableCell>
              <TableCell>{item.highestBidderEmail}</TableCell>
              <TableCell>{item.highestBid}</TableCell>
              <TableCell><Button onClick={()=>handleDelete(item._id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledDiv>
  );
}
