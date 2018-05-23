import * as React from 'react';
import { Segment, Form, Label, Icon } from 'semantic-ui-react';
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

    return (
      <>
        <Segment>
          <h1>Basic</h1>

          <AXUIDatagrid />
        </Segment>
      </>
    );
  }
}

export default Basic;
