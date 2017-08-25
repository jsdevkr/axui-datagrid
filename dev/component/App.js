import React from 'react';
import AX6UIGrid from 'src/AX6UIReactGrid';
import 'src/scss/style.scss';


export default class App extends React.Component {
  constructor(props){
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
      {id:1, title:"테스트"},
      {id:2, title:"테스트"},
      {id:3, title:"테스트"}
    ];

    this.state = {
      config : gridConfig,
      height: "300px",
      data: gridData
    }
  }

  render(){
    return (
      <div>
        <AX6UIGrid
          height={this.state.height}
          config={this.state.config}
          data={this.state.data}></AX6UIGrid>


      </div>
    );
  }
}