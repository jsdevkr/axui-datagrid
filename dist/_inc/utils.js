"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.divideTableByFrozenColumnIndex = divideTableByFrozenColumnIndex;
exports.getTableByStartEndColumnIndex = getTableByStartEndColumnIndex;
exports.getMousePosition = getMousePosition;
exports.makeHeaderTable = makeHeaderTable;
exports.makeBodyRowTable = makeBodyRowTable;
exports.makeBodyRowMap = makeBodyRowMap;
exports.makeFootSumTable = makeFootSumTable;
exports.makeBodyGroupingTable = makeBodyGroupingTable;
exports.findPanelByColumnIndex = findPanelByColumnIndex;
exports.getRealPathForDataItem = getRealPathForDataItem;
exports.propsConverterForData = propsConverterForData;
exports.setColGroupWidth = setColGroupWidth;
exports.getInnerWidth = getInnerWidth;
exports.getInnerHeight = getInnerHeight;
exports.getOuterWidth = getOuterWidth;
exports.getOuterHeight = getOuterHeight;
exports.calculateDimensions = calculateDimensions;
exports.getScrollPosition = getScrollPosition;
exports.getScrollPositionByScrollBar = getScrollPositionByScrollBar;

var _immutable = require("immutable");

var _underscore = require("underscore");

/**
 * @method
 * @param _table
 * @param _frozenColumnIndex
 * @return {{leftData: {rows: Array}, rightData: {rows: Array}}}
 */
function divideTableByFrozenColumnIndex(_table, _frozenColumnIndex, options) {

  var asideTable = { rows: [] },
      asideColGroup = [],
      asidePanelWidth = 0,
      tempTable_l = { rows: [] },
      tempTable_r = { rows: [] };

  for (var i = 0, l = _table.rows.length; i < l; i++) {
    asideTable.rows[i] = { cols: [] };
    if (i === 0) {
      var col = {
        label: "",
        colspan: 1,
        rowspan: _table.rows.length,
        rowIndex: 0,
        colIndex: -1
      },
          _col = {};

      if (options.showLineNumber) {
        _col = (0, _underscore.extend)({}, col, {
          width: options.lineNumberColumnWidth,
          _width: options.lineNumberColumnWidth,
          align: "center",
          columnAttr: "lineNumber",
          key: "__line_number__",
          label: ""
        });
        asideColGroup.push(_col);
        asideTable.rows[i].cols.push(_col);

        asidePanelWidth += options.lineNumberColumnWidth;
      }
      if (options.showRowSelector) {
        _col = (0, _underscore.extend)({}, col, {
          width: options.rowSelectorColumnWidth,
          _width: options.rowSelectorColumnWidth,
          align: "center",
          columnAttr: "rowSelector",
          key: "__row_selector__", label: ""
        });
        asideColGroup.push(_col);
        asideTable.rows[i].cols.push(_col);

        asidePanelWidth += options.rowSelectorColumnWidth;
      }
    }
  }

  for (var r = 0, rl = _table.rows.length; r < rl; r++) {
    var row = _table.rows[r];

    tempTable_l.rows[r] = { cols: [] };
    tempTable_r.rows[r] = { cols: [] };

    for (var c = 0, cl = row.cols.length; c < cl; c++) {
      var _col2 = row.cols[c],
          colStartIndex = _col2.colIndex,
          colEndIndex = _col2.colIndex + _col2.colspan;

      if (colStartIndex < _frozenColumnIndex) {
        if (colEndIndex <= _frozenColumnIndex) {
          // 좌측편에 변형없이 추가
          tempTable_l.rows[r].cols.push(_col2);
        } else {
          var leftCol = (0, _underscore.extend)({}, _col2),
              rightCol = (0, _underscore.extend)({}, leftCol);

          leftCol.colspan = _frozenColumnIndex - leftCol.colIndex;
          rightCol.colIndex = 0;
          rightCol.colspan = _col2.colspan - leftCol.colspan;

          tempTable_l.rows[r].cols.push(leftCol);
          if (rightCol.colspan) {
            tempTable_r.rows[r].cols.push(rightCol);
          }
        }
      } else {
        // 오른편
        tempTable_r.rows[r].cols.push(Object.assign({}, _col2, { colIndex: _col2.colIndex - _frozenColumnIndex }));
      }

      _col2 = null;
      colStartIndex = null;
      colEndIndex = null;
    }

    row = null;
  }

  // frozenPanelWidth는 컬럼의 너비 _width가 결정된 후에 구해야 함으로 여기서 처리 하지 않는다
  // _width는 컬럼의 너비가 "*" 또는 "%"일 때에 컨테이너의 너비에 따라 상대적으로 결정된다.
  return {
    asideData: asideTable,
    asideColGroup: asideColGroup,
    asidePanelWidth: asidePanelWidth,
    leftData: tempTable_l,
    rightData: tempTable_r
  };
}

/**
 * @method
 * @param _table
 * @param _startColumnIndex
 * @param _endColumnIndex
 * @return {{rows: Array}}
 */
function getTableByStartEndColumnIndex(_table, _startColumnIndex, _endColumnIndex) {
  var tempTable = { rows: [] };

  if ('rows' in _table) {
    _table.rows.forEach(function (row, r) {
      tempTable.rows[r] = { cols: [] };
      for (var c = 0, cl = row.cols.length; c < cl; c++) {
        var col = (0, _underscore.extend)({}, row.cols[c]);
        var colStartIndex = col.colIndex;
        var colEndIndex = col.colIndex + col.colspan;

        if (_startColumnIndex <= colStartIndex || colEndIndex <= _endColumnIndex) {
          if (_startColumnIndex <= colStartIndex && colEndIndex <= _endColumnIndex) {
            // 변형없이 추가
            tempTable.rows[r].cols.push(col);
          } else if (_startColumnIndex > colStartIndex && colEndIndex > _startColumnIndex) {
            // 앞에서 걸친경우
            col.colspan = colEndIndex - _startColumnIndex;
            tempTable.rows[r].cols.push(col);
          } else if (colEndIndex > _endColumnIndex && colStartIndex <= _endColumnIndex) {
            tempTable.rows[r].cols.push(col);
          }
        }
      }
    });
  }
  return tempTable;
}

/**
 *
 * @param e
 * @return {{clientX, clientY}}
 */
function getMousePosition(e) {
  var mouseObj = 'changedTouches' in e && e.changedTouches ? e.changedTouches[0] : e;
  // clientX, Y 쓰면 스크롤에서 문제 발생
  return {
    x: mouseObj.pageX,
    y: mouseObj.pageY
  };
}

/**
 * @method
 * @param _columns
 * @param _options
 * @return {{rows: Array}}
 */
function makeHeaderTable(_columns, _options) {
  var columns = (0, _immutable.List)(_columns),
      table = {
    rows: []
  },
      colIndex = 0;

  // todo immutable array
  var maekRows = function maekRows(_columns, depth, parentField) {
    var row = { cols: [] };
    var i = 0,
        l = _columns.size;
    var colspan = 1;

    for (; i < l; i++) {
      var field = _columns.get(i);
      colspan = 1;

      if (!field.hidden) {
        field.colspan = 1;
        field.rowspan = 1;

        field.rowIndex = depth;
        field.colIndex = function () {
          if (!parentField) {
            return colIndex++;
          } else {
            colIndex = parentField.colIndex + i + 1;
            return parentField.colIndex + i;
          }
        }();

        row.cols.push(field); // 복제된 필드 삽입

        if ('columns' in field) {
          colspan = maekRows(field.columns, depth + 1, field);
        } else {
          field.width = 'width' in field ? field.width : _options.columnMinWidth;
        }
        field.colspan = colspan;
      } else {}
    }

    if (row.cols.length > 0) {
      if (!table.rows[depth]) {
        table.rows[depth] = { cols: [] };
      }
      table.rows[depth].cols = table.rows[depth].cols.concat(row.cols);
      return row.cols.length - 1 + colspan;
    } else {
      return colspan;
    }
  };

  maekRows(columns, 0);

  // set rowspan
  for (var r = 0, rl = table.rows.length; r < rl; r++) {
    for (var c = 0, cl = table.rows[r].cols.length; c < cl; c++) {
      if (!('columns' in table.rows[r].cols[c])) {
        table.rows[r].cols[c].rowspan = rl - r;
      }
    }
  }

  return table;
}

/**
 * @method
 * @param _columns
 * @param _options
 * @return {{rows: Array}}
 */
function makeBodyRowTable(_columns, _options) {
  var columns = (0, _immutable.List)(_columns);
  var table = {
    rows: []
  };
  var colIndex = 0;

  var maekRows = function maekRows(_columns, depth, parentField) {
    var row = { cols: [] };
    var i = 0;
    var l = _columns.size;
    var colspan = 1;

    var selfMakeRow = function selfMakeRow(__columns) {
      var i = 0;
      var l = __columns.length;

      for (; i < l; i++) {
        var field = __columns,
            _colspan = 1;

        if (!field.hidden) {

          if ('key' in field) {
            field.colspan = 1;
            field.rowspan = 1;

            field.rowIndex = depth;
            field.colIndex = function () {
              if (!parentField) {
                return colIndex++;
              } else {
                colIndex = parentField.colIndex + i + 1;
                return parentField.colIndex + i;
              }
            }();

            row.cols.push(field);
            if ('columns' in field) {
              _colspan = maekRows(field.columns, depth + 1, field);
            }
            field.colspan = _colspan;
          } else {
            if ('columns' in field) {
              selfMakeRow(field.columns, depth);
            }
          }
        } else {}
      }
    };

    for (; i < l; i++) {
      var field = _columns.get(i);
      colspan = 1;

      if (!field.hidden) {

        if ('key' in field) {
          field.colspan = 1;
          field.rowspan = 1;

          field.rowIndex = depth;
          field.colIndex = function () {
            if (!parentField) {
              return colIndex++;
            } else {
              colIndex = parentField.colIndex + i + 1;
              return parentField.colIndex + i;
            }
          }();

          row.cols.push(field);
          if ('columns' in field) {
            colspan = maekRows(field.columns, depth + 1, field);
          }
          field.colspan = colspan;
        } else {
          if ('columns' in field) {
            selfMakeRow(field.columns, depth);
          }
        }
      } else {}

      field = null;
    }

    if (row.cols.length > 0) {
      if (!table.rows[depth]) {
        table.rows[depth] = { cols: [] };
      }
      table.rows[depth].cols = table.rows[depth].cols.concat(row.cols);
      return row.cols.length - 1 + colspan;
    } else {
      return colspan;
    }
  };

  maekRows(columns, 0);

  {
    // set rowspan
    for (var r = 0, rl = table.rows.length; r < rl; r++) {
      var row = table.rows[r];
      for (var c = 0, cl = row.cols.length; c < cl; c++) {
        var col = row.cols[c];
        if (!('columns' in col)) {
          col.rowspan = rl - r;
        }
        col = null;
      }
      row = null;
    }
  }

  return table;
}

/**
 * @method
 * @param _table
 * @param _options
 * @return {{}}
 */
function makeBodyRowMap(_table, _options) {
  var map = {};
  _table.rows.forEach(function (row) {
    row.cols.forEach(function (col) {
      map[col.rowIndex + "_" + col.colIndex] = (0, _underscore.extend)({}, col);
    });
  });
  return map;
}

/**
 * @method
 * @param _footSumColumns
 * @param colGroup
 * @param options
 * @return {{rows: Array}}
 */
function makeFootSumTable(_footSumColumns, colGroup, options) {
  var table = {
    rows: []
  };

  for (var r = 0, rl = _footSumColumns.length; r < rl; r++) {
    var footSumRow = _footSumColumns[r],
        addC = 0;

    table.rows[r] = { cols: [] };

    for (var c = 0, cl = footSumRow.length; c < cl; c++) {
      if (addC > colGroup.length) break;
      var colspan = footSumRow[c].colspan || 1;
      if (footSumRow[c].label || footSumRow[c].key) {
        table.rows[r].cols.push({
          colspan: colspan,
          rowspan: 1,
          colIndex: addC,
          columnAttr: "sum",
          align: footSumRow[c].align,
          label: footSumRow[c].label,
          key: footSumRow[c].key,
          collector: footSumRow[c].collector,
          formatter: footSumRow[c].formatter
        });
      } else {
        table.rows[r].cols.push({
          colIndex: addC,
          colspan: colspan,
          rowspan: 1,
          label: "&nbsp;"
        });
      }
      addC += colspan;
      colspan = null;
    }

    if (addC < colGroup.length) {
      for (var _c = addC; _c < colGroup.length; _c++) {
        table.rows[r].cols.push({
          colIndex: _c,
          colspan: 1,
          rowspan: 1,
          label: "&nbsp;"
        });
      }
    }
    footSumRow = null;
    addC = null;
  }

  return table;
}

function makeBodyGroupingTable(_bodyGroupingColumns, colGroup, options) {
  var table = {
    rows: []
  },
      r = 0,
      addC = 0;

  table.rows[r] = { cols: [] };

  for (var _c2 = 0, cl = _bodyGroupingColumns.length; _c2 < cl; _c2++) {
    if (addC > options.columns.length) break;
    var colspan = _bodyGroupingColumns[_c2].colspan || 1;
    if (_bodyGroupingColumns[_c2].label || _bodyGroupingColumns[_c2].key) {
      table.rows[r].cols.push({
        colspan: colspan,
        rowspan: 1,
        rowIndex: 0,
        colIndex: addC,
        columnAttr: "default",
        align: _bodyGroupingColumns[_c2].align,
        label: _bodyGroupingColumns[_c2].label,
        key: _bodyGroupingColumns[_c2].key,
        collector: _bodyGroupingColumns[_c2].collector,
        formatter: _bodyGroupingColumns[_c2].formatter
      });
    } else {
      table.rows[r].cols.push({
        rowIndex: 0,
        colIndex: addC,
        colspan: colspan,
        rowspan: 1,
        label: "&nbsp;"
      });
    }
    addC += colspan;
  }

  if (addC < colGroup.length) {
    for (var c = addC; c < colGroup.length; c++) {
      table.rows[r].cols.push({
        rowIndex: 0,
        colIndex: c,
        colspan: 1,
        rowspan: 1,
        label: "&nbsp;"
      });
    }
  }

  return table;
}

function findPanelByColumnIndex(_dindex, _colIndex, _rowIndex) {
  var _containerPanelName = void 0,
      _isScrollPanel = false,
      _panels = [];

  if (this.xvar.frozenRowIndex > _dindex) _panels.push("top");
  if (this.xvar.frozenColumnIndex > _colIndex) _panels.push("left");
  _panels.push("body");

  if (this.xvar.frozenColumnIndex <= _colIndex || this.xvar.frozenRowIndex <= _dindex) {
    _containerPanelName = _panels.join("-");
    _panels.push("scroll");
    _isScrollPanel = true;
  }

  return {
    panelName: _panels.join("-"),
    containerPanelName: _containerPanelName,
    isScrollPanel: _isScrollPanel
  };
}

function getRealPathForDataItem(_dataPath) {
  var path = [],
      _path = [].concat(_dataPath.split(/[\.\[\]]/g));

  _path.forEach(function (n) {
    if (n !== "") path.push("[\"" + n.replace(/['\"]/g, "") + "\"]");
  });
  _path = null;
  return path.join("");
}

/**
 * @method
 * @param data
 * @return {{receivedList: Array, page: {}}}
 */
function propsConverterForData(data) {
  var Obj_return = {
    receivedList: [],
    page: false
  };

  if ((0, _underscore.isArray)(data)) {
    Obj_return.receivedList = data;
  } else if ((0, _underscore.isObject)(data)) {
    Obj_return.receivedList = data.list || [];
    Obj_return.page = data.page || {};
  }

  return Obj_return;
}

/**
 * 그리드 colGroup의 width 값을 처리 하는 함수. 왜? '*', '%'로 된 값은 상대적인 값이기 때문에. 컨테이너의 너비에 따라 재계산이 필요합니다.
 * @method
 * @param _colGroup
 * @param options
 * @param container
 * @return {any}
 */
function setColGroupWidth(_colGroup, container, options) {
  var totalWidth = 0,
      computedWidth = void 0,
      autoWidthColGroupIndexs = [],
      i = void 0,
      l = void 0;

  _colGroup.forEach(function (col, ci) {
    if ((0, _underscore.isNumber)(col.width)) {
      totalWidth += col._width = col.width;
    } else if (col.width === "*") {
      autoWidthColGroupIndexs.push(ci);
    } else if (col.width.substring(col.width.length - 1) === "%") {
      totalWidth += col._width = container.width * col.width.substring(0, col.width.length - 1) / 100;
    }
  });

  if (autoWidthColGroupIndexs.length > 0) {
    computedWidth = (container.width - totalWidth) / autoWidthColGroupIndexs.length;
    for (i = 0, l = autoWidthColGroupIndexs.length; i < l; i++) {
      _colGroup.update(autoWidthColGroupIndexs[i], function (O) {
        O._width = computedWidth < options.columnMinWidth ? options.columnMinWidth : computedWidth;
        return O;
      });
    }
  }
  // 컬럼의 시작위치와 끝위치 계산
  for (i = options.frozenColumnIndex; i < _colGroup.size; i++) {
    _colGroup.update(i, function (O) {
      var prevCol = _colGroup.get(i - 1);
      if (i === options.frozenColumnIndex) {
        O._sx = 0;
      } else {
        O._sx = prevCol._ex;
      }
      O._ex = O._sx + O._width;
      return O;
    });
  }

  return _colGroup;
}

function getInnerWidth(element) {
  var cs = window.getComputedStyle(element);
  return element.offsetWidth - (parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth));
}

function getInnerHeight(element) {
  var cs = window.getComputedStyle(element);
  return element.offsetHeight - (parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth));
}

function getOuterWidth(element) {
  return element.offsetWidth;
}

function getOuterHeight(element) {
  return element.offsetHeight;
}

/**
 *
 * @param state
 * @param action
 * @param [options=state.get('options').toJS()]
 * @param [styles=state.get('styles').toJS()]
 * @return {{styles: (any | *)}}
 */
function calculateDimensions(containerDOM, storeState, state) {
  var colGroup = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : state.colGroup;
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : state.options;
  var styles = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : (0, _immutable.Map)(state.styles).toJS();

  var list = storeState.list;
  var footSumColumns = state.footSumColumns;
  var headerTable = state.headerTable;

  styles.calculatedHeight = null; // props에의해 정해진 height가 아닌 내부에서 계산된 높이를 사용하고 싶은 경우 숫자로 값 지정

  styles.elWidth = getInnerWidth(containerDOM);
  styles.elHeight = getInnerHeight(containerDOM);

  styles.CTInnerWidth = styles.elWidth;
  styles.CTInnerHeight = styles.elHeight;
  styles.rightPanelWidth = 0;

  colGroup = setColGroupWidth(colGroup, { width: styles.elWidth - (styles.asidePanelWidth + options.scroller.size) }, options);

  styles.frozenPanelWidth = function (colGroup, endIndex) {
    var width = 0;
    for (var i = 0, l = endIndex; i < l; i++) {
      width += colGroup[i]._width;
    }
    return width;
  }(colGroup, options.frozenColumnIndex);
  styles.headerHeight = options.header.display ? headerTable.rows.length * options.header.columnHeight : 0;

  styles.frozenRowHeight = options.frozenRowIndex * styles.bodyTrHeight;
  styles.footSumHeight = footSumColumns.length * styles.bodyTrHeight;
  styles.pageHeight = options.page.height;
  styles.pageButtonsContainerWidth = options.page.buttonsContainerWidth;

  styles.verticalScrollerWidth = styles.elHeight - styles.headerHeight - styles.pageHeight - styles.footSumHeight < list.size * styles.bodyTrHeight ? options.scroller.size : 0;
  styles.horizontalScrollerHeight = function () {
    var totalColGroupWidth = colGroup.reduce(function (prev, curr) {
      return (prev._width || prev) + curr._width;
    });

    // aside 빼고, 수직 스크롤이 있으면 또 빼고 비교
    var bodyWidth = styles.elWidth - styles.asidePanelWidth - styles.verticalScrollerWidth;

    return totalColGroupWidth > bodyWidth ? options.scroller.size : 0;
  }();

  styles.scrollContentWidth = state.headerColGroup.reduce(function (prev, curr) {
    return (prev._width || prev) + curr._width;
  });

  styles.scrollContentContainerWidth = styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth - styles.verticalScrollerWidth;

  if (styles.horizontalScrollerHeight > 0) {
    styles.verticalScrollerWidth = styles.elHeight - styles.headerHeight - styles.pageHeight - styles.footSumHeight - styles.horizontalScrollerHeight < list.size * styles.bodyTrHeight ? options.scroller.size : 0;
  }

  // 수평 너비 결정
  styles.CTInnerWidth = styles.elWidth;
  // 수직 스크롤러의 높이 결정.
  styles.CTInnerHeight = styles.elHeight - styles.pageHeight;
  // get bodyHeight
  styles.bodyHeight = styles.CTInnerHeight - styles.headerHeight;

  //
  styles.scrollContentContainerHeight = styles.bodyHeight - styles.frozenRowHeight - styles.footSumHeight;
  styles.scrollContentHeight = styles.bodyTrHeight * list.size;

  styles.verticalScrollerHeight = styles.elHeight - styles.pageHeight - options.scroller.padding * 2 - options.scroller.arrowSize;
  styles.horizontalScrollerWidth = styles.elWidth - styles.verticalScrollerWidth - styles.pageButtonsContainerWidth - options.scroller.padding * 2 - options.scroller.arrowSize;
  styles.scrollerPadding = options.scroller.padding;
  styles.scrollerArrowSize = options.scroller.arrowSize;
  styles.verticalScrollBarHeight = styles.scrollContentHeight ? styles.scrollContentContainerHeight * styles.verticalScrollerHeight / styles.scrollContentHeight : 0;
  styles.horizontalScrollBarWidth = styles.scrollContentWidth ? styles.scrollContentContainerWidth * styles.horizontalScrollerWidth / styles.scrollContentWidth : 0;

  if (options.scroller.useVerticalScroll) {
    styles.calculatedHeight = list.length * styles.bodyTrHeight + styles.headerHeight + styles.pageHeight + styles.horizontalScrollerHeight;
    styles.bodyHeight = styles.calculatedHeight - styles.headerHeight - styles.pageHeight + styles.horizontalScrollerHeight;
    styles.verticalScrollerWidth = 0;
    styles.CTInnerWidth = styles.elWidth;
    styles.scrollContentContainerWidth = styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth;
  }

  return {
    styles: styles
  };
}

/**
 *
 * @param scrollLeft
 * @param scrollTop
 * @param scrollWidth
 * @param scrollHeight
 * @param clientWidth
 * @param clientHeight
 * @return {{scrollLeft: *, scrollTop: *, eventBreak: boolean}}
 */
function getScrollPosition(scrollLeft, scrollTop, _ref) {
  var scrollWidth = _ref.scrollWidth,
      scrollHeight = _ref.scrollHeight,
      clientWidth = _ref.clientWidth,
      clientHeight = _ref.clientHeight;

  var endScroll = false;

  if (clientHeight > scrollHeight) {
    scrollTop = 0;
  } else if (scrollTop > 0) {
    scrollTop = 0;
    endScroll = true;
  } else if (clientHeight > scrollHeight + scrollTop) {
    // scrollHeight
    scrollTop = clientHeight - scrollHeight;
    endScroll = true;
  }

  if (clientWidth > scrollWidth) {
    scrollLeft = 0;
  } else if (scrollLeft > 0) {
    scrollLeft = 0;
    endScroll = true;
  } else if (clientWidth > scrollWidth + scrollLeft) {
    // scrollHeight
    scrollLeft = clientWidth - scrollWidth;
    endScroll = true;
  }

  return {
    scrollLeft: scrollLeft, scrollTop: scrollTop, endScroll: endScroll
  };
}

function getScrollPositionByScrollBar(scrollBarLeft, scrollBarTop, _ref2) {
  var horizontalScrollerWidth = _ref2.horizontalScrollerWidth,
      verticalScrollerHeight = _ref2.verticalScrollerHeight,
      horizontalScrollBarWidth = _ref2.horizontalScrollBarWidth,
      verticalScrollBarHeight = _ref2.verticalScrollBarHeight,
      scrollContentWidth = _ref2.scrollContentWidth,
      scrollContentHeight = _ref2.scrollContentHeight,
      scrollContentContainerWidth = _ref2.scrollContentContainerWidth,
      scrollContentContainerHeight = _ref2.scrollContentContainerHeight,
      _ref2$BW = _ref2.BW,
      BW = _ref2$BW === undefined ? horizontalScrollerWidth - horizontalScrollBarWidth : _ref2$BW,
      _ref2$BH = _ref2.BH,
      BH = _ref2$BH === undefined ? verticalScrollerHeight - verticalScrollBarHeight : _ref2$BH,
      _ref2$SW = _ref2.SW,
      SW = _ref2$SW === undefined ? scrollContentWidth - scrollContentContainerWidth : _ref2$SW,
      _ref2$SH = _ref2.SH,
      SH = _ref2$SH === undefined ? scrollContentHeight - scrollContentContainerHeight : _ref2$SH;

  var _getScrollPosition = getScrollPosition(-scrollBarLeft * SW / BW, -scrollBarTop * SH / BH, {
    scrollWidth: scrollContentWidth,
    scrollHeight: scrollContentHeight,
    clientWidth: scrollContentContainerWidth,
    clientHeight: scrollContentContainerHeight
  }),
      scrollLeft = _getScrollPosition.scrollLeft,
      scrollTop = _getScrollPosition.scrollTop;

  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}