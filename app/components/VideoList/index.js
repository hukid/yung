/**
*
* VideoList
*
*/

import React from 'react';
import { Link } from 'react-router';
// import styled from 'styled-components';

import List from './List';
import ListItem from './ListItem';

function VideoList(props) {
  let content = '';

  if (props.items) {
    content = props.items.map((item, index) => (
      <ListItem key={`item-${index}`}>
        <Link to={`/${index}`}>
          item
        </Link>
      </ListItem>
    ));
  }

  return (
    <List>
      {content}
    </List>
  );
}

VideoList.propTypes = {
  items: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]).isRequired,
};

export default VideoList;
