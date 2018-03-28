import * as React from 'react';
import { Table } from 'semantic-ui-react';

interface iProps {
  name: string;
  defaultValue?: string;
  description?: string;
  required?: boolean;
  type?: string;
}
interface iState {}

export class PropsTableRow extends React.Component<iProps, iState> {
  constructor(props) {
    super(props);
  }

  render() {
    const { defaultValue, description, name, required, type } = this.props;

    return (
      <Table.Row key={name}>
        <Table.Cell collapsing>
          <code>{name}</code>
        </Table.Cell>
        <Table.Cell collapsing>{defaultValue}</Table.Cell>
        <Table.Cell collapsing>
          <code>{`{${type}}`}</code>
        </Table.Cell>
        <Table.Cell>{description}</Table.Cell>
      </Table.Row>
    );
  }
}
