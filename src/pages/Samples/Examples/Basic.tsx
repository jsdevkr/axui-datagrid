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
    const list = [
      { no: 1, title: '제목' },
      { no: 2, title: '제목' },
      { no: 3, title: '제목' },
      { no: 4, title: '제목' },
      { no: 5, title: '제목' },
      { no: 6, title: '제목' },
      { no: 7, title: '제목' },
      { no: 8, title: '제목' },
      { no: 9, title: '제목' },
      { no: 10, title: '제목' },
      { no: 11, title: '제목' },
      { no: 12, title: '제목' },
      { no: 13, title: '제목' },
      { no: 14, title: '제목' },
      { no: 15, title: '제목' },
      { no: 16, title: '제목' },
      { no: 17, title: '제목' },
      { no: 18, title: '제목' },
      { no: 19, title: '제목' },
      { no: 20, title: '제목' },
    ];

    const columns = [
      {
        key: 'no',
        width: 60,
        label: 'ID',
        align: 'left',
      },
      {
        key: 'title',
        width: 200,
        label: '타이틀',
      },
      {
        key: 'no',
        width: 60,
        label: 'ID',
        align: 'left',
      },
      {
        key: 'title',
        width: 200,
        label: '타이틀',
      },
    ];
    return (
      <>
        <Segment>
          <h1>Basic</h1>

          <DataGrid
            data={list}
            columns={columns}
            options={{
              showLineNumber: true,
              showRowSelector: true,
              asidePanelWidth: 900,
              columnKeys: { deleted: 'D' },
            }}
          />
        </Segment>
      </>
    );
  }
}

export default Basic;
