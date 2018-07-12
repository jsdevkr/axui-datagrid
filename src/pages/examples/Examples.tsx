import * as React from 'react';
import { Divider } from 'antd';
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

export const ExampleRoot = (props: any) => {
  const name = getPathValue(props, ['match', 'params', 'name']);
  const Example = Examples[name];
  const sourceCode = require('!raw-loader!examples/' + name + '.tsx');

  return (
    <div>
      {Example ? <Example /> : null}
      <Divider />

      <Wrapper>
        <Segment padded>
          <h4>Source Code </h4>
          <CodeViewer code={sourceCode} />
        </Segment>
      </Wrapper>
    </div>
  );

  /*

   */
};

export default ExampleRoot;
