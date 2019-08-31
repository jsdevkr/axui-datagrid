import * as React from 'react';
import { Divider, Checkbox } from 'antd';
import * as Examples from 'examples';
import { CodeViewer, Wrapper, Segment } from 'components';

function getPathValue(
  targetObject: any,
  paths: any[],
  defaultValue?: any,
): any {
  let idx = 0;
  while (idx < paths.length) {
    if (targetObject == null) {
      return;
    }
    targetObject = targetObject[paths[idx]];
    idx += 1;
  }
  return typeof targetObject === 'undefined' ? defaultValue : targetObject;
}

class ExampleRoot extends React.Component<any, any> {
  state = {
    showCode: false,
  };

  render() {
    const name = getPathValue(this.props, ['match', 'params', 'name']);
    const Example = Examples[name];
    const sourceCode = require('raw-loader!examples/' + name + '.tsx');

    return (
      <div>
        {Example ? <Example /> : null}
        <Divider />

        <Wrapper>
          <Segment padded>
            <h4>
              <Checkbox
                checked={this.state.showCode}
                onChange={e => this.setState({ showCode: e.target.checked })}
              >
                Source Code
              </Checkbox>
            </h4>
            {this.state.showCode && <CodeViewer code={sourceCode} />}
          </Segment>
        </Wrapper>
      </div>
    );
  }
}

export default ExampleRoot;
