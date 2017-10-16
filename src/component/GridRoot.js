import React from 'react';
import ReactDOM from 'react-dom';
import {each, extend, extendOwn, isObject, throttle} from 'underscore';
import classNames from 'classnames';
import sass from '../scss/index.scss';
import PropTypes from 'prop-types';

import GridHeader from './GridHeader';
import GridBody from './GridBody';
import GridPage from './GridPage';
import GridScroll from './GridScroll';

//~~~~~
const defaultOptions = {
  frozenColumnIndex: 0,
  frozenRowIndex: 0,
  showLineNumber: false,
  showRowSelector: false,
  multipleSelect: true,
  columnMinWidth: 100,
  lineNumberColumnWidth: 30,
  rowSelectorColumnWidth: 26,
  sortable: false,
  remoteSort: false,
  asidePanelWidth: 0,
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
  },
  footSum: false
};

class GridRoot extends React.Component {
  constructor(props) {
    super(props);
    // props에 추가된 액션만 호출 가능
    this.state = {
      options: (() => {
        let options = extend({}, defaultOptions);
        each(props.options, function (v, k) {
          options[k] = (isObject(v)) ? extendOwn(options[k], v) : v;
        });
        return options;
      })()
    };

    props.init(props, this.state.options);
  }

  componentDidMount() {
    this.gridRootNode = ReactDOM.findDOMNode(this.refs.gridRoot);
    this.props.didMount(this.props, this.gridRootNode);

    this.throttled_updateDimensions = throttle(this.updateDimensions.bind(this), 100);
    window.addEventListener("resize", this.throttled_updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.throttled_updateDimensions);
  }

  componentWillReceiveProps(nextProps) {
    // 데이터 체인지
    if (this.props.data != nextProps.data) {
      this.props.setData(nextProps.data);
    }
    if (this.props.options != nextProps.options || this.props.columns != nextProps.columns) {
      if (this.props.options != nextProps.options) {
        each(nextProps.options, (v, k) => {
          this.state.options[k] = (isObject(v)) ? extendOwn(this.state.options[k], v) : v;
        });
        this.setState({
          options: this.state.options
        });
      }

      //this.props.changeOptions(nextProps, this.gridRootNode, this.state.options);
      this.props.updateProps(nextProps, this.gridRootNode, this.state.options);
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
    const mounted = gridState.get("mounted");
    let gridRootStyle = Object.assign({height: this.props.height}, this.props.style);

    return (
      <div ref="gridRoot"
        //onWheel={handleWheel}
           className={classNames(sass.gridRoot)}
           style={gridRootStyle}>
        <div className={classNames(sass.gridClipBoard)}>
          <textarea ref="gridClipboard"></textarea>
        </div>
        <GridHeader
          mounted={mounted}
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
        />
        <GridBody
          mounted={mounted}
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
        />
        <GridPage
          mounted={mounted}
          styles={styles}
        />
        <GridScroll
          mounted={mounted}
          CTInnerWidth={styles.CTInnerWidth}
          CTInnerHeight={styles.CTInnerHeight}

          pageHeight={styles.pageHeight}
          verticalScrollerWidth={styles.verticalScrollerWidth}
          horizontalScrollerHeight={styles.horizontalScrollerHeight}
          scrollContentContainerHeight={styles.scrollContentContainerHeight}
          scrollContentHeight={styles.scrollContentHeight}
          scrollContentContainerWidth={styles.scrollContentContainerWidth}
          scrollContentWidth={styles.scrollContentWidth}
          trackPadding={options.scroller.trackPadding}
        />

        <div ref="gridVerticalResizer"></div>
        <div ref="gridHorizontalResizer"></div>
      </div>
    );

  }
}


GridRoot.propTypes = {
  height: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  options: PropTypes.shape({
    frozenColumnIndex: PropTypes.number,
    frozenRowIndex: PropTypes.number,
    showLineNumber: PropTypes.bool,
    showRowSelector: PropTypes.bool,
    multipleSelect: PropTypes.bool,
    columnMinWidth: PropTypes.number,
    lineNumberColumnWidth: PropTypes.number,
    rowSelectorColumnWidth: PropTypes.number,
    sortable: PropTypes.bool,
    remoteSort: PropTypes.bool,
    asidePanelWidth: PropTypes.number,
    header: PropTypes.shape({
      display: PropTypes.bool,
      align: PropTypes.string,
      columnHeight: PropTypes.number,
      columnPadding: PropTypes.number,
      columnBorderWidth: PropTypes.number,
      selector: PropTypes.bool
    }),
    body: PropTypes.shape({
      align: PropTypes.bool,
      columnHeight: PropTypes.number,
      columnPadding: PropTypes.number,
      columnBorderWidth: PropTypes.number,
      grouping: PropTypes.bool,
      mergeCells: PropTypes.bool
    }),
    page: PropTypes.shape({
      height: PropTypes.number,
      display: PropTypes.bool,
      statusDisplay: PropTypes.bool,
      navigationItemCount: PropTypes.number
    }),
    scroller: PropTypes.shape({
      size: PropTypes.number,
      barMinSize: PropTypes.number,
      trackPadding: PropTypes.number
    }),
    columnKeys: PropTypes.shape({
      selected: PropTypes.string,
      modified: PropTypes.string,
      deleted: PropTypes.string,
      disableSelection: PropTypes.string
    }),
    tree: PropTypes.shape({
      use: PropTypes.bool,
      hashDigit: PropTypes.number,
      indentWidth: PropTypes.number,
      arrowWidth: PropTypes.number,
      iconWidth: PropTypes.number,
      icons: PropTypes.shape({
        openedArrow: PropTypes.string,
        collapsedArrow: PropTypes.string,
        groupIcon: PropTypes.string,
        collapsedGroupIcon: PropTypes.string,
        itemIcon: PropTypes.string
      }),
      columnKeys: PropTypes.shape({
        parentKey: PropTypes.string,
        selfKey: PropTypes.string,
        collapse: PropTypes.string,
        hidden: PropTypes.string,
        parentHash: PropTypes.string,
        selfHash: PropTypes.string,
        children: PropTypes.string,
        depth: PropTypes.string,
      })
    })
  }),
  footSum: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ])
};

GridRoot.defaultProps = {
  height: "300px",
  columns: [],
  data: [],
  options: {}
};

export default GridRoot;
