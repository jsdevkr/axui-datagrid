import * as React from 'react';
import { Segment, Form, Label, Icon } from 'semantic-ui-react';

import 'axui-datagrid/style.scss';
import { DataGrid } from 'axui-datagrid';

interface IProps {}
interface IState {
  emails: string[];
}
class Basic extends React.Component<IProps, IState> {
  state = {
    emails: [],
  };

  render() {
    const list = [{ no: 1, title: '제목' }];
    const columns = [
      {
        key: 'id',
        width: 60,
        label: 'ID',
        align: 'left',
      },
    ];
    return (
      <>
        <Segment>
          <h1>Basic</h1>

          <DataGrid
            data={list}
            columns={columns}
            options={{ asidePanelWidth: 900, columnKeys: { deleted: 'D' } }}
          />
        </Segment>
      </>
    );
  }
}

export default Basic;
