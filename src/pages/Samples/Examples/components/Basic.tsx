import * as React from 'react';
import { Segment, Form, Label, Icon } from 'semantic-ui-react';

import 'axui-datagrid/style.scss';
import { AXUIDatagrid } from 'axui-datagrid';

interface IProps {}
interface IState {
  emails: string[];
}
class Basic extends React.Component<IProps, IState> {
  state = {
    emails: [],
  };

  render() {
    const { emails } = this.state;

    const list = [{ no: 1, title: '제목' }];

    return (
      <>
        <Segment>
          <h1>Basic</h1>

          <AXUIDatagrid data={list} />
        </Segment>
      </>
    );
  }
}

export default Basic;
