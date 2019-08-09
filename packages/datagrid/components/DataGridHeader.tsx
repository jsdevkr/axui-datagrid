import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { DataGridEnums } from '../common/@enums';
import DataGridHeaderPanel from './DataGridHeaderPanel';
import DataGridHeaderColumnResizer from './DataGridHeaderColumnResizer';

interface IProps extends IDataGridStore {}

class DataGridHeader extends React.Component<IProps> {
  state = {
    columnResizing: false,
    columnResizerLeft: 0,
  };

  shouldComponentUpdate(pProps: IProps) {
    const {
      scrollLeft = 0,
      columnResizing,
      columnResizerLeft,
      styles: {
        elWidth = 0,
        headerHeight = 0,
        asidePanelWidth = 0,
        frozenPanelWidth = 0,
        rightPanelWidth = 0,
      } = {},
    } = this.props;
    const {
      scrollLeft: _scrollLeft = 0,
      columnResizing: _columnResizing,
      columnResizerLeft: _columnResizerLeft,
      styles: {
        elWidth: _elWidth = 0,
        headerHeight: _headerHeight = 0,
        asidePanelWidth: _asidePanelWidth = 0,
        frozenPanelWidth: _frozenPanelWidth = 0,
        rightPanelWidth: _rightPanelWidth = 0,
      } = {},
    } = pProps;

    if (
      scrollLeft !== _scrollLeft ||
      columnResizing !== _columnResizing ||
      columnResizerLeft !== _columnResizerLeft ||
      elWidth !== _elWidth ||
      headerHeight !== _headerHeight ||
      asidePanelWidth !== _asidePanelWidth ||
      frozenPanelWidth !== _frozenPanelWidth ||
      rightPanelWidth !== _rightPanelWidth
    ) {
      return true;
    }

    return false;
  }

  render() {
    const {
      scrollLeft = 0,
      columnResizing,
      columnResizerLeft,
      styles: {
        elWidth = 0,
        headerHeight = 0,
        asidePanelWidth = 0,
        frozenPanelWidth = 0,
        rightPanelWidth = 0,
      } = {},
    } = this.props;

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
      width: elWidth - asidePanelWidth - frozenPanelWidth - rightPanelWidth,
      height: headerHeight,
    };
    let headerScrollStyle = {
      height: headerHeight,
      left: scrollLeft,
    };

    return (
      <div className={'axui-datagrid-header'} style={{ height: headerHeight }}>
        {asidePanelWidth !== 0 && (
          <DataGridHeaderPanel
            panelName={DataGridEnums.PanelNames.ASIDE_HEADER}
            style={asideHeaderPanelStyle}
          />
        )}

        {frozenPanelWidth !== 0 && (
          <DataGridHeaderPanel
            panelName={DataGridEnums.PanelNames.LEFT_HEADER}
            style={leftHeaderPanelStyle}
          />
        )}
        <div
          data-scroll-container="header-scroll-container"
          style={headerPanelStyle}
        >
          <DataGridHeaderPanel
            panelName={DataGridEnums.PanelNames.HEADER_SCROLL}
            style={headerScrollStyle}
          />
        </div>

        {columnResizing && (
          <DataGridHeaderColumnResizer
            columnResizing={columnResizing}
            columnResizerLeft={columnResizerLeft}
          />
        )}
      </div>
    );
  }
}

export default connectStore(DataGridHeader);
