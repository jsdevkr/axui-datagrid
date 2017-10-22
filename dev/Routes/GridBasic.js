import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules';

import AXDataGrid from 'ax-datagrid';

const gridData = [
  {id: 1, title: "인생은 해파에게조차 아름답고 장엄하다.", writer: "장기영", date: "2017-10-10"},
  {id: 2, title: "이 세상에 영원한 것은 아무것도 없다. 우리의 문제들도 그렇다.", writer: "장서우", date: "2017-10-10"},
  {id: 3, title: "생각은 너무 많고 느끼는 것은 너무 적다.", writer: "이영희", date: "2017-10-10"},
  {id: 4, title: "실패는 중요하지 않다. ", writer: "황인서", date: "2017-10-10"},
  {id: 5, title: "성공한 사람의 인생은 성공한 후에 포장되어 평범한 사람의 인생을 망친다.", writer: "황세진", date: "2017-10-10"},
  {id: 6, title: "너무 고르는 자가 가장 나쁜 것을 갖는다.", writer: "황현진", date: "2017-10-10"},
  {id: 7, title: "위대한 사람은 위대한 꿈을, 평범한 사람은 평범한 꿈을 가지고 있다.", writer: "이서연", date: "2017-10-10"},
  {id: 8, title: "상대방이 만만하게 보인다면 그 사람은 당신을 배려하고 있는 것이다.", writer: "황세진", date: "2017-10-10"},
  {id: 9, title: "짜장면 먹고싶은 사람에게 짬뽕 100번 사줘도 고맙다는 말 못듣는다.", writer: "황현진", date: "2017-10-10"},
  {id: 10, title: "니가 아는 거라곤 니가 다 아는줄 아는 것 뿐이다.", writer: "이서연", date: "2017-10-10"},
  {id: 11, title: "평범하게 살고 싶지 않은데 왜 평범하게 노력하는가", writer: "양용성", date: "2017-10-10"},
  {id: 12, title: "꿈은 이루어 진다.", writer: "양우석", date: "2017-10-10"},
  {id: 13, title: "친구란 같은 공간에서 서로 말이 없어도 어색하지 않은 관계이다.", writer: "양수빈", date: "2017-10-10"},
  {id: 14, title: "운은 계획에서 비롯된다.", writer: "양미정", date: "2017-10-10"},
  {id: 15, title: "잘 했고 잘 하고 있 잘 할거야.", writer: "임정혜", date: "2017-10-10"},
  {id: 16, title: "인생은 해파에게조차 아름답고 장엄하다.", writer: "장기영", date: "2017-10-10"},
  {id: 17, title: "이 세상에 영원한 것은 아무것도 없다. 우리의 문제들도 그렇다.", writer: "장서우", date: "2017-10-10"},
  {id: 18, title: "생각은 너무 많고 느끼는 것은 너무 적다.", writer: "이영희", date: "2017-10-10"},
  {id: 19, title: "실패는 중요하지 않다. ", writer: "황인서", date: "2017-10-10"},
  {id: 20, title: "성공한 사람의 인생은 성공한 후에 포장되어 평범한 사람의 인생을 망친다.", writer: "황세진", date: "2017-10-10"},
  {id: 21, title: "너무 고르는 자가 가장 나쁜 것을 갖는다.", writer: "황현진", date: "2017-10-10"},
  {id: 22, title: "위대한 사람은 위대한 꿈을, 평범한 사람은 평범한 꿈을 가지고 있다.", writer: "이서연", date: "2017-10-10"},
  {id: 23, title: "상대방이 만만하게 보인다면 그 사람은 당신을 배려하고 있는 것이다.", writer: "황세진", date: "2017-10-10"},
  {id: 24, title: "짜장면 먹고싶은 사람에게 짬뽕 100번 사줘도 고맙다는 말 못듣는다.", writer: "황현진", date: "2017-10-10"},
  {id: 25, title: "니가 아는 거라곤 니가 다 아는줄 아는 것 뿐이다.", writer: "이서연", date: "2017-10-10"},
  {id: 26, title: "평범하게 살고 싶지 않은데 왜 평범하게 노력하는가", writer: "양용성", date: "2017-10-10"},
  {id: 27, title: "꿈은 이루어 진다.", writer: "양우석", date: "2017-10-10"},
  {id: 28, title: "친구란 같은 공간에서 서로 말이 없어도 어색하지 않은 관계이다.", writer: "양수빈", date: "2017-10-10"},
  {id: 29, title: "운은 계획에서 비롯된다.", writer: "양미정", date: "2017-10-10"},
  {id: 30, title: "잘 했고 잘 하고 있 잘 할거야.", writer: "임정혜", date: "2017-10-10"}

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
  },
  scroller: {
    useVerticalScroll: false
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
        {key: "title", width: 200, label: "제목"},
        {key: "writer", label: "작성자", align:"center"},
        {key: "date", label: "작성일", align:"center"},
        {key: "title", width: 200, label: "제목"},
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
            {key: "title", width: 200, label: "제목"},
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
        <AXDataGrid
          height={this.state.height}
          style={{fontSize: "12px"}}
          columns={this.state.columns}
          data={this.state.data}
          options={this.state.options}
        />

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