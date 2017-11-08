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
      this.props.selectionStartOffset !== nextProps.selectionStartOffset ||
      this.props.selectionEndOffset !== nextProps.selectionEndOffset
    ) {
      sameProps = true;
    }

    return sameProps;
  }

  render() {
    const selecting   = this.props.selecting,
          gridCSS     = this.props.gridCSS,
          selectionStartOffset = this.props.selectionStartOffset,
          selectionEndOffset = this.props.selectionEndOffset;

    if(!selecting) return null;

    let selectorStyles = {
      left: selectionStartOffset.x,
      top: selectionStartOffset.y,
      width: selectionEndOffset.x - selectionStartOffset.x,
      height: selectionEndOffset.y - selectionStartOffset.y
    };

    return (
      <div
        className={classNames(gridCSS.cellSelector)}
        style={selectorStyles}
      />
    )
  }
}

export default GridSelector;