import * as React from 'react';
import { Button, Divider } from 'semantic-ui-react';

interface iProps {
}

interface iState {
}


export class Introduction extends React.Component<iProps, iState> {
  constructor(props) {
    super(props);

  }

  public render() {
    return (
      <div>
        <h1>Intro</h1>
      </div>
    )
  }
}