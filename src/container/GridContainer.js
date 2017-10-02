import {connect} from 'react-redux';
import * as act from '../actions';
import GridRoot from '../component/GridRoot';

const mapStateToProps = (state) => {
  return {
    mounted: state.get('mounted'),
    list: state.get('list'),
    page: state.get('page'),
    scrollLeft: state.get('scrollLeft'),
    scrollTop: state.get('scrollTop'),

    colGroup: state.get('colGroup'),
    headerTable: state.get('headerTable'),

    asideColGroup: state.get('asideColGroup'),
    leftHeaderColGroup: state.get('leftHeaderColGroup'),
    headerColGroup: state.get('headerColGroup'),

    asideHeaderData: state.get('asideHeaderData'),
    leftHeaderData: state.get('leftHeaderData'),
    headerData: state.get('headerData'),
    options: state.get('options'),
    styles: state.get('styles')
  }
};

// 액션함수 준비
const mapToDispatch = (dispatch) => ({
  init: (props) => dispatch(act.init(props)),
  didMount: (props, containerDOM) => dispatch(act.didMount(props, containerDOM)),
  setData: (data) => dispatch(act.setData(data)),
  updateScroll: (left, top) => dispatch(act.updateScroll(left, top))
});

export default connect(mapStateToProps, mapToDispatch)(GridRoot);
