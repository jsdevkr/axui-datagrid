import * as React from 'react';
import { Segment } from 'semantic-ui-react';

interface IProps {}
interface IState {
  emails: string[];
}
class CustomizeStyle extends React.Component<IProps, IState> {
  state = {
    emails: [],
  };

  render() {
    return (
      <>
        <Segment>
          <h1>2</h1>
        </Segment>
      </>
    );
  }
}

export default CustomizeStyle;
