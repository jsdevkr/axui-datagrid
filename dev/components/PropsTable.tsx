import * as React from 'react';
import { Table } from 'semantic-ui-react';
import { map } from 'lodash';
import { PropsTableRow } from './PropsTableRow';

export const PropsTable = ({ props }) => (
  <Table basic='very'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Default</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {map(props, ({ name, ...rest }) => <PropsTableRow {...rest} key={name} name={name} />)}
    </Table.Body>
  </Table>
);