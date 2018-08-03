import * as React from 'react';
import 'styles/globals';
import { Wrapper, Segment } from 'components';

const feature01 = require('assets/datagrid-feature-01.jpg');
const feature02 = require('assets/datagrid-feature-02.jpg');
const feature03 = require('assets/datagrid-feature-03.jpg');
const feature04 = require('assets/datagrid-feature-04.jpg');
const feature05 = require('assets/datagrid-feature-05.jpg');
const feature06 = require('assets/datagrid-feature-06.jpg');

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

        <Segment>
          <h2>Preview Features</h2>

          <h3>Large Data</h3>
          <p>
            <img src={feature01} width={'100%'} style={{ maxWidth: 800 }} />
          </p>

          <h3>Frozen row / col</h3>
          <p>
            <img src={feature02} width={'100%'} style={{ maxWidth: 800 }} />
          </p>

          <h3>Multi header</h3>
          <p>
            <img src={feature03} width={'100%'} style={{ maxWidth: 800 }} />
          </p>

          <h3>Loading</h3>
          <p>
            <img src={feature04} width={'100%'} style={{ maxWidth: 800 }} />
          </p>

          <h3>Row selector</h3>
          <p>
            <img src={feature05} width={'100%'} style={{ maxWidth: 800 }} />
          </p>

          <h3>Inline edit</h3>
          <p>
            <img src={feature06} width={'100%'} style={{ maxWidth: 800 }} />
          </p>
        </Segment>
      </Wrapper>
    );
  }
}

export default Introduction;
