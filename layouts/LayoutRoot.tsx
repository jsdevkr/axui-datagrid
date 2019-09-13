import React from 'react';
import styled from 'styled-components';

const Style = styled.div``;
const LayoutRoot: React.FC = props => {
  return <Style>{props.children}</Style>;
};

export default LayoutRoot;
