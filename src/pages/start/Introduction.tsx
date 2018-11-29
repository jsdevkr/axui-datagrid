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
const feature08 = require('assets/datagrid-feature-08.png');
const feature09_1 = require('assets/datagrid-feature-09-1.png');
const feature09_2 = require('assets/datagrid-feature-09-2.png');
const feature10 = require('assets/datagrid-feature-10.png');


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
 {/* Formatting of data  */}
          <h3>Formatting of data</h3>
          <p>
          You can use 'date', 'money' predefined in 'columns> col.formatter',
            or you can change the values as desired using a user-defined
            function.{' '}
          </p>
          <NavLink to={'examples/Formatter'}>
            <Button type={'primary'} size={'small'} ghost>
              View Examples
            </Button>
            <br />
            <img src={feature08} width={'100%'} style={{ maxWidth: 800 }} />
          </NavLink>

          <Divider />
{/* change columns */}
          <h3>Change Columns</h3>
          <p>
          This is an example of changing the columns props in the datagrid.{' '}
          </p>
          <NavLink to={'examples/ChangeColumns'}>
            <Button type={'primary'} size={'small'} ghost>
              View Examples
            </Button>
            <br />
            <img src={feature09_1} width={'50%'} style={{ maxWidth: 800 }} />
            <img src={feature09_2} width={'50%'} style={{ maxWidth: 800 }} />
          </NavLink>

          <Divider />

          <h3>Frozen column and row</h3>
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

          <h3>Multi column header</h3>
          <p>
          The column in the datagrid can be created with the context 'column: &#91; &#93;' you write. Inside '&#91; &#93;', one '&#123; &#125;' means a one column. 
          <br/>So if you want to create multi column header, you can use 'columns : &#91; &#93;' in the column what you want to create a multi column header. 
          <br/>For example, columns : &#91; &#123; &#125; , &#123; &#123; &#125; &#123; &#125; &#125; &#93; context means that this datagrid has three columns, and the second column is a multi column header which has 2 columns.
          </p>
          

          <NavLink to={'examples/MultiColumnHeader'}>
            <Button type={'primary'} size={'small'} ghost>
              View Examples
            </Button>
            <br />
            <img src={feature03} width={'100%'} style={{ maxWidth: 800 }} />
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

          {/* Event */}
          <h3>Event</h3>
          <p>onBeforeEvent, onAfterEvent props을 이용하면 keydown, click등의 이벤트가 발생될때 callback을 받을 수 있습니다.</p>
          <NavLink to={'examples/EventReceive'}>
            <Button type={'primary'} size={'small'} ghost>
              View Examples
            </Button>
            <br />
            <img src={feature10} width={'100%'} style={{ maxWidth: 800 }} />
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

          <h3>Foot Summary</h3>
          <p>
            You can use footSum props.<br></br>
            The value of the footSum column, which consists of an array, can be determined using the built-in collector
            (avg, sum) function.<br></br> 
            Alternatively, you can define your own function.
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
