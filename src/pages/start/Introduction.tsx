import * as React from 'react';
import 'styles/globals';
import { Button, Divider } from 'antd';
import { CodeViewer, Wrapper, Segment } from 'components';

interface IProps {}
interface IState {}

class Introduction extends React.Component<IProps, IState> {
  state = {};

  render() {
    const {} = this.state;

    return (
      <Wrapper>
        <h1>axui-datagrid</h1>

        <Segment>
          <h2>Introduction</h2>
          <p>
            axui-datagrid is the 'datagrid UI component'. Designed for modern
            web application development. And I made it using 'React + ES6 + TS'.
          </p>
          <p>
            'datagrid UI component' is a UI that shows data as a spreadsheet It
            says. There are so many features that axui-datagrid needs to be a
            complete `datagrid UI component`. However, the function of
            outputting and controlling a large amount of data at a high speed is
            more important than the function having all functions. We've also
            optimized it for developers using 'React + ES6 + TS'.
          </p>
        </Segment>
      </Wrapper>
    );
  }
}

export default Introduction;
