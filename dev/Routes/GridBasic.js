import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules';

import AX6UIGrid from 'ax6ui-react-grid/index';

class GridBasic extends React.Component {
  constructor(props) {
    super(props);

    const gridOptions = {
      showLineNumber: true,
      showRowSelector: false,
      columnKeys: {
        modified: "__ABC__"
      }
    };

    let gridData = [
      {id: 1, title: "테스트"},
      {id: 2, title: "테스트", __deleted__: true},
      {id: 3, title: "테스트"}
    ];

    this.state = {
      height: "300px",
      columns: [
        {key:"no", label:"번호"},
        {key:"title", label:"제목"}
      ],
      data: gridData,
      options: gridOptions
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
          height={this.state.height}
          columns={this.state.columns}
          data={this.state.data}
          options={this.state.options}
        ></AX6UIGrid>

        {this.props.name} /
        {this.state.height}

        <div style={{padding: "10px"}}>
          <button onClick={e => this.changeConfig({height: "400px"})}>높이변경(400px)</button>
          <button onClick={e => this.changeConfig({height: "300px"})}>높이변경(300px)</button>
          <button onClick={e => this.changeConfig("newData")}>데이터변경</button>
          <button onClick={this.props.onCreate}>state이름 부여</button>
          <button onClick={this.props.onRemove}>state이름 초기화</button>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.get('name')
  }
};

// 액션함수 준비
const mapToDispatch = (dispatch) => ({
  onCreate: () => dispatch(actions.create()),
  onRemove: () => dispatch(actions.remove())
});

export default connect(mapStateToProps, mapToDispatch)(GridBasic);