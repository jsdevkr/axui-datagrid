import * as React from 'react';
import { types } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import {
  getMousePosition,
  getScrollPosition,
  arrayFromRange,
  throttle,
} from '../utils';
import DataGridBodyPanel from './DataGridBodyPanel';

interface IProps extends IDataGridStore {}
interface IState {}

class DataGridBody extends React.Component<IProps, IState> {
  state = {};
  scrollMovingTimer: any;



  onDoubleClickCell = (e: any) => {};

  updateEditInput = (e: any) => {};

  render() {
    const {
      headerColGroup = [],
      scrollLeft = 0,
      scrollTop = 0,
      options = {},
      styles = {},
    } = this.props;

    const { frozenRowIndex = 0 } = options;
    const {
      CTInnerWidth = 0,
      bodyHeight = 0,
      bodyTrHeight = 0,
      asidePanelWidth = 0,
      frozenPanelWidth = 0,
      frozenPanelHeight = 0,
      rightPanelWidth = 0,
      footSumHeight = 0,
    } = styles;

    const sRowIndex =
      Math.floor(-scrollTop / (bodyTrHeight || 0)) + frozenRowIndex;

    let scrollPaddingLeft = headerColGroup[0]
      ? (headerColGroup[0]._sx || 0) - (frozenPanelWidth || 0)
      : 0;
    let topBodyScrollConfig = {
      frozenRowIndex: 0,
      sRowIndex: 0,
      eRowIndex: frozenRowIndex,
    };
    let bodyScrollConfig = {
      frozenRowIndex: frozenRowIndex,
      sRowIndex: sRowIndex,
      eRowIndex: sRowIndex + Math.ceil(bodyHeight / bodyTrHeight) + 1,
    };
    let topAsideBodyPanelStyle = {
      left: 0,
      width: asidePanelWidth,
      top: 0,
      height: frozenPanelHeight,
    };
    let topLeftBodyPanelStyle = {
      left: asidePanelWidth,
      width: frozenPanelWidth,
      top: 0,
      height: frozenPanelHeight,
    };
    let topBodyPanelStyle = {
      left: frozenPanelWidth + asidePanelWidth,
      width:
        CTInnerWidth - asidePanelWidth - frozenPanelWidth - rightPanelWidth,
      top: 0,
      height: frozenPanelHeight,
    };
    let asideBodyPanelStyle = {
      left: 0,
      width: asidePanelWidth,
      top: frozenPanelHeight,
      height: bodyHeight - frozenPanelHeight - footSumHeight,
    };
    let leftBodyPanelStyle = {
      left: asidePanelWidth,
      width: frozenPanelWidth,
      top: frozenPanelHeight,
      height: bodyHeight - frozenPanelHeight - footSumHeight,
    };
    let bodyPanelStyle = {
      left: frozenPanelWidth + asidePanelWidth,
      width:
        CTInnerWidth - asidePanelWidth - frozenPanelWidth - rightPanelWidth,
      top: frozenPanelHeight,
      height: bodyHeight - frozenPanelHeight - footSumHeight,
    };

    // onMouseDown={e => onMouseDownBody(e)}

    return (
      <div
        className={'axui-datagrid-body'}
        style={{ height: styles.bodyHeight }}
      >
        <DataGridBodyPanel
          panelName="top-aside-body-scroll"
          containerStyle={topAsideBodyPanelStyle}
          panelScrollConfig={topBodyScrollConfig}
        />
        <DataGridBodyPanel
          panelName="top-left-body-scroll"
          containerStyle={topLeftBodyPanelStyle}
          panelScrollConfig={topBodyScrollConfig}
        />
        <DataGridBodyPanel
          panelName="top-body-scroll"
          containerStyle={topBodyPanelStyle}
          panelScrollConfig={topBodyScrollConfig}
          panelLeft={scrollLeft}
          panelPaddingLeft={scrollPaddingLeft}
        />
        <DataGridBodyPanel
          panelName="aside-body-scroll"
          containerStyle={asideBodyPanelStyle}
          panelScrollConfig={bodyScrollConfig}
          panelTop={scrollTop}
        />
        <DataGridBodyPanel
          panelName="left-body-scroll"
          containerStyle={leftBodyPanelStyle}
          panelScrollConfig={bodyScrollConfig}
          panelTop={scrollTop}
        />
        <DataGridBodyPanel
          panelName="body-scroll"
          containerStyle={bodyPanelStyle}
          panelScrollConfig={bodyScrollConfig}
          panelLeft={scrollLeft}
          panelTop={scrollTop}
          panelPaddingLeft={scrollPaddingLeft}
        />
      </div>
    );
  }
}

export default connectStore(DataGridBody);
