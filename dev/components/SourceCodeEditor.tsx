import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

export class SourceCodeEditor extends React.Component<any, any> {
  constructor( props ) {
    super( props );

    this.state = {};
  }

  public render() {
    return (
      <SyntaxHighlighter language='javascript' style={docco}>{this.props.code ? this.props.code : this.props.children}</SyntaxHighlighter>
    );
  }
}

