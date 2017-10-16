import {connect} from 'react-redux';
import * as act from '../actions';
import GridRoot from '../component/GridRoot';

const mapStateToProps = (state) => {
  return {
    gridState: state
  }
};

// 액션함수 준비
const mapToDispatch = (dispatch) => ({
  init: (props, options) => dispatch(act.init(props, options)),
  didMount: (props, containerDOM) => dispatch(act.didMount(props, containerDOM)),
  align: (props, containerDOM) => dispatch(act.align(props, containerDOM)),
  setData: (data) => dispatch(act.setData(data)),
  updateScroll: (left, top) => dispatch(act.updateScroll(left, top)),
  changeOptions: (containerDOM, options) => dispatch(act.changeOptions(containerDOM, options))
});

export default connect(mapStateToProps, mapToDispatch)(GridRoot);
