import * as React from 'react';
import { NavLink } from 'react-router-dom';
import 'styles/globals';
import { Wrapper, Segment } from 'components';
import { Divider, Button } from 'antd';

const feature01 = require('assets/datagrid-feature-01.jpg');
const feature02 = require('assets/datagrid-feature-02.jpg');
const feature03 = require('assets/datagrid-feature-03.jpg');
const feature04 = require('assets/datagrid-feature-04.jpg');
const feature05 = require('assets/datagrid-feature-05.jpg');
const feature06 = require('assets/datagrid-feature-06.jpg');
const feature07 = require('assets/datagrid-feature-07.jpg');

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
            To represent large amounts of data in the browser, a large amount of
            HTML nodes Required. However, if you represent a large amount of
            HTML nodes in your browser The browser will slow down and
            inconvenience you. Because axui-datagrid only prints the areas that
            need to be displayed in the grid container area, it can process
            large amounts of data quickly.{' '}
          </p>
          <NavLink to={'examples/LargeData'}>
            <Button type={'primary'} size={'small'} ghost>
              View Examples
            </Button>
            <br />
            <img src={feature01} width={'100%'} style={{ maxWidth: 800 }} />
          </NavLink>

          <Divider />

          <h3>Frozen row / col</h3>
          <p>
            If options.frozenColumnIndex and options.frozenRowIndex are
            specified, then 'DataGrid' You can set the frame fixed area.
          </p>

          <NavLink to={'examples/FrozenColumnRow'}>
            <Button type={'primary'} size={'small'} ghost>
              View Examples
            </Button>
            <br />
            <img src={feature02} width={'100%'} style={{ maxWidth: 800 }} />
          </NavLink>

          <Divider />

          <h3>Multi header</h3>
          <p>
            You can set up multiple-line headers by adding columns inside
            'columns> col'.
          </p>

          <NavLink to={'examples/MultiColumnHeader'}>
            <Button type={'primary'} size={'small'} ghost>
              View Examples
            </Button>
            <br />
            <img src={feature03} width={'100%'} style={{ maxWidth: 800 }} />
          </NavLink>

          <Divider />

          <h3>Loading</h3>
          <p>You can express the loading status with loading props</p>
          <NavLink to={'examples/LoadingState'}>
            <Button type={'primary'} size={'small'} ghost>
              View Examples
            </Button>
            <br />
            <img src={feature04} width={'100%'} style={{ maxWidth: 800 }} />
          </NavLink>

          <Divider />

          <h3>Row selector</h3>
          <p>
            'options> showRowSelector' If you set the value to true, a check box
            appears, allowing you to select each row of 'datagrid'.
          </p>
          <NavLink to={'examples/RowSelector'}>
            <Button type={'primary'} size={'small'} ghost>
              View Examples
            </Button>
            <br />
            <img src={feature05} width={'100%'} style={{ maxWidth: 800 }} />
          </NavLink>

          <Divider />

          <h3>Inline edit</h3>
          <p>
            If you define the editor attribute in 'columns> col', you can use
            the editor mode of that column. You can activate editor mode using
            double-click or return key.
          </p>
          <NavLink to={'examples/InlineEdit'}>
            <Button type={'primary'} size={'small'} ghost>
              View Examples
            </Button>
            <br />
            <img src={feature06} width={'100%'} style={{ maxWidth: 800 }} />
          </NavLink>

          <Divider />

          <h3>Foot Summary</h3>
          <p>
            You can use footSum props The value of the footSum column, which
            consists of an array, can be determined using the built-in collector
            (avg, sum) function, Alternatively, you can define your own
            function.
          </p>
          <NavLink to={'examples/FootSum'}>
            <Button type={'primary'} size={'small'} ghost>
              View Examples
            </Button>
            <br />
            <img src={feature07} width={'100%'} style={{ maxWidth: 800 }} />
          </NavLink>
        </Segment>
      </Wrapper>
    );
  }
}

export default Introduction;
