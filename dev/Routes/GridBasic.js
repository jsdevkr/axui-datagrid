import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules';

import AX6UIGrid from 'ax6ui-react-grid/index';

const gridData = [
  {id: 1, title: "제목입니다.", writer: "장기영", date: "2017-10-10"},
  {id: 2, title: "제목 ONE 입니다.", writer: "장서우", date: "2017-10-10"},
  {id: 3, title: "제목 TWO 입니다.", writer: "이영희", date: "2017-10-10"},
  {id: 4, title: "제목 THREE 입니다.", writer: "황인서", date: "2017-10-10"},
  {id: 5, title: "제목 FOUR 입니다.", writer: "황세진", date: "2017-10-10"},
  {id: 6, title: "제목 FIVE 입니다.", writer: "황현진", date: "2017-10-10"},
  {id: 7, title: "제목 SIX 입니다.", writer: "이서연", date: "2017-10-10"},
  {id: 8, title: "제목 FOUR 입니다.", writer: "황세진", date: "2017-10-10"},
  {id: 9, title: "제목 FIVE 입니다.", writer: "황현진", date: "2017-10-10"},
  {id: 10, title: "제목 SIX 입니다.", writer: "이서연", date: "2017-10-10"},
  {id: 11, title: "제목입니다.", writer: "장기영", date: "2017-10-10"},
  {id: 12, title: "제목 ONE 입니다.", writer: "장서우", date: "2017-10-10"},
  {id: 13, title: "제목 TWO 입니다.", writer: "이영희", date: "2017-10-10"},
  {id: 14, title: "제목 THREE 입니다.", writer: "황인서", date: "2017-10-10"},
  {id: 15, title: "제목 FOUR 입니다.", writer: "황세진", date: "2017-10-10"},
  {id: 16, title: "제목 FIVE 입니다.", writer: "황현진", date: "2017-10-10"},
  {id: 17, title: "제목 SIX 입니다.", writer: "이서연", date: "2017-10-10"},
  {id: 18, title: "제목 FOUR 입니다.", writer: "황세진", date: "2017-10-10"},
  {id: 19, title: "제목 FIVE 입니다.", writer: "황현진", date: "2017-10-10"},
  {id: 20, title: "제목 SIX 입니다.", writer: "이서연", date: "2017-10-10"},
  {id: 21, title: "제목입니다.", writer: "장기영", date: "2017-10-10"},
  {id: 22, title: "제목 ONE 입니다.", writer: "장서우", date: "2017-10-10"},
  {id: 23, title: "제목 TWO 입니다.", writer: "이영희", date: "2017-10-10"},
  {id: 24, title: "제목 THREE 입니다.", writer: "황인서", date: "2017-10-10"},
  {id: 25, title: "제목 FOUR 입니다.", writer: "황세진", date: "2017-10-10"},
  {id: 26, title: "제목 FIVE 입니다.", writer: "황현진", date: "2017-10-10"},
  {id: 27, title: "제목 SIX 입니다.", writer: "이서연", date: "2017-10-10"},
  {id: 28, title: "제목 FOUR 입니다.", writer: "황세진", date: "2017-10-10"},
  {id: 29, title: "제목 FIVE 입니다.", writer: "황현진", date: "2017-10-10"},
  {id: 30, title: "제목 SIX 입니다.", writer: "이서연", date: "2017-10-10"}
];
const gridData_new = [];

const gridOptions = {
  header: {
    align: "center"
  },
  frozenColumnIndex: 1,
  showLineNumber: true,
  showRowSelector: true,
  columnKeys: {
    modified: "__ABC__"
  }
};
const gridOptions_new = {
  header: {
    align: "left"
  },
  frozenColumnIndex: 0,
  showLineNumber: false,
  showRowSelector: false
};

class GridBasic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {key: "id", width: 60, label: "번호", align:"center"},
        {key: "title", width: "*", label: "제목"},
        {key: "writer", label: "작성자", align:"center"},
        {key: "date", label: "작성일", align:"center"}
      ],
      data: gridData,
      options: gridOptions
    }
  }

  changeConfig(props) {

    const processor = {
      "restoreData": function () {
        this.setState({data: gridData});
      },
      "newData": function () {
        this.setState({data: gridData_new});
      },
      "restoreOptions": function () {
        this.setState({
          columns: [
            {key: "id", width: 60, label: "번호", align:"center"},
            {key: "title", width: "*", label: "제목"},
            {key: "writer", label: "작성자", align:"center"},
            {key: "date", label: "작성일", align:"center"}
          ],
          options: gridOptions
        });
      },
      "newOptions": function () {
        this.setState({
          columns: [
            {key: "id", width: 60, label: "번호", align:"center"},
            {key: "writer", label: "작성자", align:"center"},
            {key: "date", label: "작성일", align:"center"}
          ],
          options: gridOptions_new
        });
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
          style={{fontSize: "12px"}}
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
          <button onClick={e => this.changeConfig("restoreData")}>데이터원래대로</button>
          <button onClick={e => this.changeConfig("newOptions")}>옵션변경</button>
          <button onClick={e => this.changeConfig("restoreOptions")}>옵션원래대로</button>
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