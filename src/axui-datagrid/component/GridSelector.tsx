import * as React from 'react';
import classNames from 'classnames';

export class GridSelector extends React.Component<
  iAXDataGridSelectorProps,
  iAXDataGridSelectorState
> {
  constructor(props: iAXDataGridSelectorProps) {
    super(props);
  }

  public shouldComponentUpdate(nextProps, nextState) {
    let sameProps = false;

    if (
      this.props.selecting !== nextProps.selecting ||
      this.props.selectionMinOffset !== nextProps.selectionMinOffset ||
      this.props.selectionMaxOffset !== nextProps.selectionMaxOffset
    ) {
      sameProps = true;
    }

    return sameProps;
  }

  public render() {
    const { selecting, selectionMinOffset, selectionMaxOffset } = this.props;

    if (!selecting) return null;

    let selectorStyles = {
      left: selectionMinOffset.x,
      top: selectionMinOffset.y,
      width: selectionMaxOffset.x - selectionMinOffset.x,
      height: selectionMaxOffset.y - selectionMinOffset.y,
    };

    return <div className={classNames('')} style={selectorStyles} />;
  }
}
