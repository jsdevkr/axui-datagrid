import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../modules';

const Main = ({onCreate, onRemove, name}) => {
  return (
    <div className="Buttons">

      {name} /
      <button className="btn add" onClick={onCreate}>
        생성
      </button>
      <button className="btn remove" onClick={onRemove}>
        제거
      </button>
    </div>
  )
};

Main.propTypes = {
  onCreate: PropTypes.func,
  onRemove: PropTypes.func
};

Main.defaultProps = {
  onCreate: () => console.warn('onCreate not defined'),
  onRemove: () => console.warn('onRemove not defined')
};

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

export default connect(mapStateToProps, mapToDispatch)(Main);