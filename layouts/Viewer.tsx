import React from 'react';
import styled from 'styled-components';

const Style = styled.div``;
const Viewer: React.FC = props => {
  return <Style>{props.children}</Style>;
};

export default Viewer;
