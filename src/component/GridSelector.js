import React from 'react';
import classNames from 'classnames'

class GridSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let sameProps = false;

    if (
      this.props.selecting !== nextProps.selecting ||
      this.props.range !== nextProps.range
    ) {
      sameProps = true;
    }

    return sameProps;
  }

  render() {
    const selecting   = this.props.selecting,
          gridCSS     = this.props.gridCSS;
    let {startOffset, endOffset} = this.props.range;

    if(!selecting) return null;

    return (
      <div class={classNames(gridCSS.cellSelector)}></div>
    )
  }
}

export default GridSelector;