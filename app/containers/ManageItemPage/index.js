/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';

const StyledDiv = styled.div`
  padding: 20px;
`;

export default function ManageItemPage({ creating, location }) {
  const [item, setItem] = useState(location.state.item);

  return (
    <StyledDiv>
      <div>
        Item:
        <Grid container spacing={3} />
      </div>
    </StyledDiv>
  );
}
