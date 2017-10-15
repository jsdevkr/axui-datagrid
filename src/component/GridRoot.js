import React from 'react';
import ReactDOM from 'react-dom';
import {throttle} from 'underscore';
import classNames from 'classnames';
import sass from '../scss/index.scss';

import GridHeader from './GridHeader';
import GridBody from './GridBody';
import GridPage from './GridPage';

//~~~~~

class GridRoot extends React.Component {
  constructor(props) {
    super(props);
    // props에 추가된 액션만 호출 가능
    props.init(props);
  }

  componentDidMount() {
    this.gridRootNode = ReactDOM.findDOMNode(this.refs.gridRoot);
    this.props.didMount(this.props, this.gridRootNode);

    this.throttled_updateDimensions = throttle(this.updateDimensions.bind(this), 500);
    window.addEventListener("resize", this.throttled_updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.throttled_updateDimensions);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      this.props.setData(nextProps.data);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.height != this.props.height) {
      this.props.align(this.props, this.gridRootNode);
    }
  }

  /**
   * 사용자 함수
   */
  updateDimensions() {
    this.props.align(this.props, this.gridRootNode);
  }

  render() {
    const gridState = this.props.gridState;
    const styles = gridState.get('styles').toJS();
    const options = gridState.get('options').toJS();
    options.header.sortable = options.sortable;
    options.header.enableFilter = options.enableFilter;

    let gridRootStyle = Object.assign({height: this.props.height}, this.props.style);
    let mounted = gridState.get("mounted");

    return (
      <div ref="gridRoot"
           onWheel={handleWheel}
           className={classNames(sass.gridRoot)}
           style={gridRootStyle}>
        <div className={classNames(sass.gridClipBoard)}>
          <textarea ref="gridClipboard"></textarea>
        </div>
        {mounted ? <GridHeader
          optionsHeader={options.header}
          styles={styles}
          frozenColumnIndex={options.frozenColumnIndex}

          colGroup={gridState.get('colGroup')}
          headerTable={gridState.get('headerTable')}

          asideColGroup={gridState.get('asideColGroup')}
          leftHeaderColGroup={gridState.get('leftHeaderColGroup')}
          headerColGroup={gridState.get('headerColGroup')}

          asideHeaderData={gridState.get('asideHeaderData')}
          leftHeaderData={gridState.get('leftHeaderData')}
          headerData={gridState.get('headerData')}
        /> : null}
        {mounted ? <GridBody
          optionsBody={options.body}
          styles={styles}
          frozenColumnIndex={options.frozenColumnIndex}

          colGroup={gridState.get('colGroup')}
          asideColGroup={gridState.get('asideColGroup')}
          leftHeaderColGroup={gridState.get('leftHeaderColGroup')}
          headerColGroup={gridState.get('headerColGroup')}

          bodyTable={gridState.get('bodyRowTable')}
          asideBodyRowData={gridState.get('asideBodyRowData')}
          asideBodyGroupingData={gridState.get('asideBodyGroupingData')}
          leftBodyRowData={gridState.get('leftBodyRowData')}
          leftBodyGroupingData={gridState.get('leftBodyGroupingData')}
          bodyRowData={gridState.get('bodyRowData')}
          bodyGroupingData={gridState.get('bodyGroupingData')}

          list={gridState.get('list')}
        /> : null}
        {mounted ? <GridPage
          styles={styles}
        /> : null}

        <div className={classNames(sass.gridScroller)}>
          <div data-scroll="vertical">
            <div data-scroll="vertical-bar"></div>
          </div>
          <div data-scroll="horizontal">
            <div data-scroll="horizontal-bar"></div>
          </div>
          <div data-scroll="corner"></div>
        </div>
        <div ref="gridVerticalResizer"></div>
        <div ref="gridHorizontalResizer"></div>
      </div>
    );

  }
}

GridRoot.defaultProps = {
  height: "300px",
  columns: [],
  options: {
    frozenColumnIndex: 0,
    frozenRowIndex: 0,
    showLineNumber: false,
    showRowSelector: false,
    multipleSelect: true,
    virtualScrollY: true,
    virtualScrollX: true,

    columnMinWidth: 100,
    lineNumberColumnWidth: 30,
    rowSelectorColumnWidth: 26,
    sortable: undefined,
    remoteSort: false,

    header: {
      display: true,
      align: false,
      columnHeight: 26,
      columnPadding: 3,
      columnBorderWidth: 1,
      selector: true
    },
    body: {
      align: false,
      columnHeight: 26,
      columnPadding: 3,
      columnBorderWidth: 1,
      grouping: false,
      mergeCells: false
    },
    page: {
      height: 25,
      display: true,
      statusDisplay: true,
      navigationItemCount: 5
    },
    scroller: {
      size: 15,
      barMinSize: 15,
      trackPadding: 4
    },
    columnKeys: {
      selected: '__selected__',
      modified: '__modified__',
      deleted: '__deleted__',
      disableSelection: '__disable_selection__'
    },
    tree: {
      use: false,
      hashDigit: 8,
      indentWidth: 10,
      arrowWidth: 15,
      iconWidth: 18,
      icons: {
        openedArrow: '▾',
        collapsedArrow: '▸',
        groupIcon: '⊚',
        collapsedGroupIcon: '⊚',
        itemIcon: '⊙'
      },
      columnKeys: {
        parentKey: "pid",
        selfKey: "id",
        collapse: "collapse",
        hidden: "hidden",
        parentHash: "__hp__",
        selfHash: "__hs__",
        children: "__children__",
        depth: "__depth__",
      }
    }
  }
};

export default GridRoot;
