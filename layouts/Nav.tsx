import React from 'react';
import styled from 'styled-components';

const Style = styled.nav`
  width: 240px;
  background: #333333;
`;
const Nav: React.FC = props => {
  return <Style>{props.children}</Style>;
};

export default Nav;
