import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
  width: 350px;
  padding: 20px;
`;
const ControlBox: React.FC = props => {
  return <Style>{props.children}</Style>;
};

export default ControlBox;
