import {connect} from 'react-redux';
import * as act from '../actions';
import GridRoot from '../component/GridRoot';

const mapStateToProps = (state) => {
  return {
    store_receivedList: state.get("receivedList"),
    store_deletedList: state.get("deletedList"),
    store_list: state.get("list"),
    store_page: state.get("page"),
    store_sortInfo: state.get("sortInfo")
  }
};

// 액션함수 준비
const mapToDispatch = (dispatch) => ({
  init: (props, options) => dispatch(act.init(props, options)),
  setData: (data, options) => dispatch(act.setData(data, options))
});

export default connect(mapStateToProps, mapToDispatch)(GridRoot);