import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
  flex: 1;
  padding: 20px;
  background: #fff;
`;
const Viewer: React.FC = props => {
  return <Style>{props.children}</Style>;
};

export default Viewer;
