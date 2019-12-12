/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import SimpleReactValidator from 'simple-react-validator';
import { Button } from '@material-ui/core';

const StyledDiv = styled.div`
  padding: 20px;
`;

export default function ManageItemPage({ creating, location }) {
  return <StyledDiv />;
}
