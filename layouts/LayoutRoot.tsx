import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
`;
const LayoutRoot: React.FC = props => {
  return <Style>{props.children}</Style>;
};

export default LayoutRoot;
