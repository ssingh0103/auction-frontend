import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
  },
});

const StyledDiv = styled.div`
  margin: 10px;
`;

export default function HistoryTable({ currentItems }) {
  const classes = useStyles();

  return (
    <StyledDiv>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Bid Amount&nbsp;($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems.map(item => (
            <TableRow key={_.uniqueId('item')}>
              <TableCell component="th" scope="row">
                {item.highestBidderName}
              </TableCell>
              <TableCell>{item.highestBidderEmail}</TableCell>
              <TableCell>{item.highestBid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledDiv>
  );
}
