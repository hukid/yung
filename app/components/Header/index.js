/**
*
* Header
*
*/

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Title from './Title';


const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3em;
  padding-left: 3em;
  background-color: #881212;
`;

function Header() {
  return (
    <Wrapper>
      <Title>
        <FormattedMessage {...messages.header} />
      </Title>
    </Wrapper>
  );
}

export default Header;
