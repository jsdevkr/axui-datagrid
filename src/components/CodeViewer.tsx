import * as React from 'react';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/darcula';

function trimLineBreak(x: string) {
  return x.replace(/^\r?\n+/, '').replace(/\r?\n+\s*$/, '');
}

class CodeViewer extends React.Component<any, any> {
  render() {
    SyntaxHighlighter.registerLanguage('jsx', jsx);

    prism['pre[class*="language-"]'].borderRadius = '5px';
    prism['pre[class*="language-"]'].border = '1px solid #e7e7e7';

    return (
      <SyntaxHighlighter language="jsx" style={prism}>
        {this.props.code
          ? trimLineBreak(this.props.code)
          : trimLineBreak('' + this.props.children)}
      </SyntaxHighlighter>
    );
  }
}

export default CodeViewer;
