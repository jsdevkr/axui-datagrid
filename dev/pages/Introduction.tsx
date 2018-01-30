import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, List } from 'semantic-ui-react';

export const Introduction = (props) => (
  <Container>
    <Segment basic padded>
      <h1>Introduction</h1>
    </Segment>

    <Segment basic padded>
      <Header as='h2' dividing>Background</Header>
      <p>
        AXUI datagrid is a 'datagrid' component created with 'React + ES6 + TS' code for chrome application development.<br/>
        A 'datagrid' is a component that represents data as a spreadsheet. The DataGrid component has many different functions depending on the user's various needs.
        AXUI datagrid believes that expressing large amounts of data at high speed and supporting developers fully support 'React + ES6 + TS' development environment is the most important value.
      </p>
      <List>
        <List.Item icon='check' content='React + ES6 + TS' />
        <List.Item icon='check' content='Expressing large amounts of data' />
        <List.Item icon='check' content='Formatting data' />
      </List>
      <p>
        Installation instructions are provided in the <Link to='/usage'>Usage</Link> section.
      </p>
    </Segment>

    <Segment basic padded>
      <Header as='h2' dividing>React + ES6 + TS</Header>
      <p>
        The AXUI datagrid was developed using the React framework. So do not use jQuery.<br/>
        In order to adapt to rapidly changing JS development environment, we use 'babel' to create code based on ES6 + TS, and use Typescript for systematic development.
        If you're trying to build a web application with React, and you want to make all the code you use in your project complete ES6 + TS, the AXUI datagrid will be a good choice.
      </p>
    </Segment>

    <Segment basic padded>
      <Header as='h2' dividing>Expressing large amounts of data</Header>
      <p>

      </p>
    </Segment>

    <Segment basic padded>
      <Header as='h2' dividing>Formatting data</Header>
      <p>

      </p>
    </Segment>

  </Container>
);