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
        />
        <DataGridHeaderPanel
          panelName="left-header"
          style={leftHeaderPanelStyle}
        />
        <div
          data-scroll-container="header-scroll-container"
          style={headerPanelStyle}
        >
          <DataGridHeaderPanel
            panelName="header-scroll"
            style={headerScrollStyle}
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
