import React from 'react';
// import ReactDOM from 'react-dom';
import classNames from 'classnames';
import sass from '../scss/index.scss';

class GridHeader extends React.Component {
  constructor(props) {
    super(props);
    // props에 추가된 액션만 호출 가능
    // props.init(props);
  }

  componentDidMount(){
    // ReactDOM.findDOMNode(action.refs.gridRoot);
    // this.props.didMount(this.props, ReactDOM.findDOMNode(this.refs.gridRoot));
  }

  render() {
    let style = {
      height: this.props.height
    };

    return (
      <div ref="gridHeader" className={classNames(sass.gridHeader)} style={style}>

      </div>
    );
  }
}

export default GridHeader;