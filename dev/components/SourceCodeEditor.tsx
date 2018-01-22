import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

export class SourceCodeEditor extends React.Component<any, any> {
  constructor( props ) {
    super( props );

    this.state = {};

    this.editorDidMount = this.editorDidMount.bind(this);

  }

  private editorDidMount( editor, monaco ) {
    console.log( 'editorDidMount', editor );
    editor.focus();
  }

  private onChange( newValue, e ) {
    console.log( 'onChange', newValue, e );
  }

  public render() {
    return (
      <SyntaxHighlighter language='javascript' style={docco}>{this.props.code}</SyntaxHighlighter>
    );
  }
}

