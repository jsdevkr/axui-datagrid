import React from 'react';
import styled from 'styled-components';

const Style = styled.nav``;
const Nav: React.FC = props => {
  return <Style>{props.children}</Style>;
};

export default Nav;
