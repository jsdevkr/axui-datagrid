import React from 'react';
import 'src/scss/style.scss';
import AX6UIGrid from 'src/AX6UIReactGrid';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const gridConfig = {
      animateTime: 300,
      showLineNumber: true,
      showRowSelector: false,
      columnKeys: {
        deleted: "__ABC__"
      }
    };

    let gridData = [
      {id: 1, title: "테스트"},
      {id: 2, title: "테스트"},
      {id: 3, title: "테스트"}
    ];

    this.state = {
      config: gridConfig,
      height: "300px",
      data: gridData
    }
  }

  changeConfig(props) {

    const processor = {
      "newData": function () {
        this.setState({data:[]});
      }
    };

    if (props in processor) {
      processor[props].call(this);
    } else {
      this.setState(props);
    }

  }

  render() {
    return (
      <div>
        <AX6UIGrid
          {...this.state.config}
          height={this.state.height}
          data={this.state.data}></AX6UIGrid>

        {this.state.height}

        <div style={{padding: "10px"}}>
          <button onClick={e => this.changeConfig({height: "400px"})}>높이변경(400px)</button>
          <button onClick={e => this.changeConfig({height: "300px"})}>높이변경(300px)</button>
          <button onClick={e => this.changeConfig("newData")}>데이터변경</button>
        </div>

      </div>
    );
  }
}