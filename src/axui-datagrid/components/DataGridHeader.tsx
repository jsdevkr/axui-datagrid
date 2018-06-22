import * as React from 'react';
import { types } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import DataGridHeaderPanel from './DataGridHeaderPanel';
import DataGridHeaderColumnResizer from './DataGridHeaderColumnResizer';

interface IProps extends IDataGridStore {}
interface IState {
  columnResizing: boolean;
  columnResizerLeft: number;
}

class DataGridHeader extends React.Component<IProps, IState> {
  state = {
    columnResizing: false,
    columnResizerLeft: 0,
  };

  onMouseDownColumnResizer = (e: any, col: types.DataGridCol) => {
    /*
    e.preventDefault();

    const resizer = e.target;
    const prevLeft = Number(resizer.getAttribute('data-prev-left'));
    const currLeft = Number(resizer.getAttribute('data-left'));
    const { x: rootX } = this.props.getRootBounding();

    let newWidth;
    let startMousePosition = UTIL.getMousePosition(e).x;

    const onMouseMove = ee => {
      const { x, y } = UTIL.getMousePosition(ee);
      let newLeft = currLeft + x - startMousePosition;
      if (newLeft < prevLeft) {
        newLeft = prevLeft;
      }
      newWidth = newLeft - prevLeft;

      this.setState({
        columnResizing: true,
        columnResizerLeft: x - rootX + 1,
      });
    };

    const offEvent = ee => {
      ee.preventDefault();
      startMousePosition = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', offEvent);
      document.removeEventListener('mouseleave', offEvent);

      this.setState({
        columnResizing: false,
      });

      if (typeof newWidth !== 'undefined')
        this.props.onResizeColumnResizer(e, col, newWidth);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', offEvent);
    document.addEventListener('mouseleave', offEvent);
    */
  };

  render() {
    const { scrollLeft = 0, styles = {} } = this.props;
    const {
      CTInnerWidth = 0,
      headerHeight = 0,
      asidePanelWidth = 0,
      frozenPanelWidth = 0,
      rightPanelWidth = 0,
    } = styles;
    const { columnResizing, columnResizerLeft } = this.state;

    let asideHeaderPanelStyle = {
      left: 0,
      width: asidePanelWidth,
      height: headerHeight,
    };
    let leftHeaderPanelStyle = {
      left: asidePanelWidth,
      width: frozenPanelWidth,
      height: headerHeight,
    };
    let headerPanelStyle = {
      left: frozenPanelWidth + asidePanelWidth,
      width:
        CTInnerWidth - asidePanelWidth - frozenPanelWidth - rightPanelWidth,
      height: headerHeight,
    };
    let headerScrollStyle = {
      height: headerHeight,
      left: scrollLeft,
    };

    return (
      <div className={'axui-datagrid-header'} style={{ height: headerHeight }}>
        <DataGridHeaderPanel
          panelName="aside-header"
          style={asideHeaderPanelStyle}
          onMouseDownColumnResizer={this.onMouseDownColumnResizer}
        />
        <DataGridHeaderPanel
          panelName="left-header"
          style={leftHeaderPanelStyle}
          onMouseDownColumnResizer={this.onMouseDownColumnResizer}
        />
        <div
          data-scroll-container="header-scroll-container"
          style={headerPanelStyle}
        >
          <DataGridHeaderPanel
            panelName="header-scroll"
            style={headerScrollStyle}
            onMouseDownColumnResizer={this.onMouseDownColumnResizer}
          />
        </div>

        <DataGridHeaderColumnResizer
          columnResizing={columnResizing}
          columnResizerLeft={columnResizerLeft}
        />
      </div>
    );
  }
}

export default connectStore(DataGridHeader);
