/**
*
* VideoList
*
*/

import styled from 'styled-components';

const ListItem = styled.li`
  border-top: 1px solid #ccc;
  > a {
    text-decoration: none;
    color: #000;
    transition: padding-left 0.5s ease-out font-weight 0.5s ease background-color 0.5s ease-in;
    display: block;
  }

  > a:hover {
    font-weight: bold;
    padding-left: 0.2em;
    background: #f6f6f6;
  }
`;

export default ListItem;
