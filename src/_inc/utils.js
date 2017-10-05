import {List} from 'immutable';
import {extend, isArray, isNumber, isObject} from "underscore";

/**
 * @method
 * @param _table
 * @param _frozenColumnIndex
 * @return {{leftData: {rows: Array}, rightData: {rows: Array}}}
 */
export function divideTableByFrozenColumnIndex(_table, _frozenColumnIndex, options) {

  let asideTable  = {rows: []},
      asideColGroup = [],
      asidePanelWidth = 0,
      frozenPanelWidth = 0,
      tempTable_l = {rows: []},
      tempTable_r = {rows: []};

  for (let i = 0, l = _table.rows.length; i < l; i++) {
    asideTable.rows[i] = {cols: []};
    if (i === 0) {
      let col = {
        label: "",
        colspan: 1,
        rowspan: _table.rows.length,
        colIndex: null
      }, _col = {};

      if (options.showLineNumber) {
        _col = extend({}, col, {
          width: options.lineNumberColumnWidth,
          _width: options.lineNumberColumnWidth,
          columnAttr: "lineNumber",
          key: "__index_header__", label: ""
        });
        asideColGroup.push(_col);
        asideTable.rows[i].cols.push(_col);

        asidePanelWidth += options.lineNumberColumnWidth;
      }
      if (options.showRowSelector) {
        _col = extend({}, col, {
          width: options.rowSelectorColumnWidth,
          _width: options.rowSelectorColumnWidth,
          columnAttr: "rowSelector",
          key: "__checkbox_header__", label: ""
        });
        asideColGroup.push(_col);
        asideTable.rows[i].cols.push(_col);

        asidePanelWidth += options.rowSelectorColumnWidth;
      }
    }
  }


  for (let r = 0, rl = _table.rows.length; r < rl; r++) {
    let row = _table.rows[r];

    tempTable_l.rows[r] = {cols: []};
    tempTable_r.rows[r] = {cols: []};

    for (let c = 0, cl = row.cols.length; c < cl; c++) {
      let col           = row.cols[c],
          colStartIndex = col.colIndex,
          colEndIndex   = col.colIndex + col.colspan;

      if (colStartIndex < _frozenColumnIndex) {
        if (colEndIndex <= _frozenColumnIndex) {
          // 좌측편에 변형없이 추가
          tempTable_l.rows[r].cols.push(col);
        } else {
          let leftCol  = extend({}, col),
              rightCol = extend({}, leftCol);

          leftCol.colspan = _frozenColumnIndex - leftCol.colIndex;
          rightCol.colIndex = _frozenColumnIndex;
          rightCol.colspan = col.colspan - leftCol.colspan;

          tempTable_l.rows[r].cols.push(leftCol);
          if (rightCol.colspan) {
            tempTable_r.rows[r].cols.push(rightCol);
          }
        }
      }
      else {
        // 오른편
        tempTable_r.rows[r].cols.push(col);
      }

      col = null;
      colStartIndex = null;
      colEndIndex = null;
    }

    row = null;
  }

  return {
    asideHeaderData: asideTable,
    asideColGroup: asideColGroup,
    asidePanelWidth: asidePanelWidth,
    leftData: tempTable_l,
    rightData: tempTable_r
  }
}

/**
 * @method
 * @param _table
 * @param _startColumnIndex
 * @param _endColumnIndex
 * @return {{rows: Array}}
 */
export function getTableByStartEndColumnIndex(_table, _startColumnIndex, _endColumnIndex) {
  let tempTable = {rows: []};
  for (let r = 0, rl = _table.rows.length; r < rl; r++) {
    let row = _table.rows[r];
    tempTable.rows[r] = {cols: []};
    for (let c = 0, cl = row.cols.length; c < cl; c++) {
      let col = extend({}, row.cols[c]);
      let colStartIndex = col.colIndex;
      let colEndIndex = col.colIndex + col.colspan;

      if (_startColumnIndex <= colStartIndex || colEndIndex <= _endColumnIndex) {
        if (_startColumnIndex <= colStartIndex && colEndIndex <= _endColumnIndex) {
          // 변형없이 추가
          tempTable.rows[r].cols.push(col);
        }
        else if (_startColumnIndex > colStartIndex && colEndIndex > _startColumnIndex) {
          // 앞에서 걸친경우
          col.colspan = colEndIndex - _startColumnIndex;
          tempTable.rows[r].cols.push(col);
        }
        else if (colEndIndex > _endColumnIndex && colStartIndex <= _endColumnIndex) {
          tempTable.rows[r].cols.push(col);
        }
      }
    }
  }

  return tempTable;
}

export function getMousePosition(e) {
  let mouseObj,
      originalEvent = (e.originalEvent) ? e.originalEvent : e;

  mouseObj = ('changedTouches' in originalEvent && originalEvent.changedTouches) ? originalEvent.changedTouches[0] : originalEvent;
  // clientX, Y 쓰면 스크롤에서 문제 발생
  return {
    clientX: mouseObj.pageX,
    clientY: mouseObj.pageY
  }
}

/**
 * @method
 * @param _columns
 * @param _options
 * @return {{rows: Array}}
 */
export function makeHeaderTable(_columns, _options) {
  let columns  = List(_columns),
      table    = {
        rows: []
      },
      colIndex = 0;

  // todo immutable array
  const maekRows = function (_columns, depth, parentField) {
    let row = {cols: []};
    let i = 0, l = _columns.size;
    let colspan = 1;

    for (; i < l; i++) {
      let field = _columns.get(i);
      colspan = 1;

      if (!field.hidden) {
        field.colspan = 1;
        field.rowspan = 1;

        field.rowIndex = depth;
        field.colIndex = (function () {
          if (!parentField) {
            return colIndex++;
          } else {
            colIndex = parentField.colIndex + i + 1;
            return parentField.colIndex + i;
          }
        })();

        row.cols.push(field); // 복제된 필드 삽입

        if ('columns' in field) {
          colspan = maekRows(field.columns, depth + 1, field);
        } else {
          field.width = ('width' in field) ? field.width : _options.columnMinWidth;
        }
        field.colspan = colspan;
      } else {


      }
    }

    if (row.cols.length > 0) {
      if (!table.rows[depth]) {
        table.rows[depth] = {cols: []};
      }
      table.rows[depth].cols = table.rows[depth].cols.concat(row.cols);
      return (row.cols.length - 1) + colspan;
    } else {
      return colspan;
    }

  };

  maekRows(columns, 0);

  // set rowspan
  for (let r = 0, rl = table.rows.length; r < rl; r++) {
    for (let c = 0, cl = table.rows[r].cols.length; c < cl; c++) {
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
export function makeBodyRowTable(_columns, _options) {
  let columns = List(_columns);
  let table = {
    rows: []
  };
  let colIndex = 0;

  const maekRows = function (_columns, depth, parentField) {
    let row = {cols: []};
    let i = 0;
    let l = _columns.size;
    let colspan = 1;

    const selfMakeRow = function (__columns) {
      let i = 0;
      let l = __columns.length;

      for (; i < l; i++) {
        let field   = __columns,
            colspan = 1;

        if (!field.hidden) {

          if ('key' in field) {
            field.colspan = 1;
            field.rowspan = 1;

            field.rowIndex = depth;
            field.colIndex = (function () {
              if (!parentField) {
                return colIndex++;
              } else {
                colIndex = parentField.colIndex + i + 1;
                return parentField.colIndex + i;
              }
            })();

            row.cols.push(field);
            if ('columns' in field) {
              colspan = maekRows(field.columns, depth + 1, field);
            }
            field.colspan = colspan;
          }
          else {
            if ('columns' in field) {
              selfMakeRow(field.columns, depth);
            }
          }
        }
        else {

        }
      }
    };

    for (; i < l; i++) {
      let field = _columns.get(i);
      colspan = 1;

      if (!field.hidden) {

        if ('key' in field) {
          field.colspan = 1;
          field.rowspan = 1;

          field.rowIndex = depth;
          field.colIndex = (function () {
            if (!parentField) {
              return colIndex++;
            } else {
              colIndex = parentField.colIndex + i + 1;
              return parentField.colIndex + i;
            }
          })();

          row.cols.push(field);
          if ('columns' in field) {
            colspan = maekRows(field.columns, depth + 1, field);
          }
          field.colspan = colspan;
        }
        else {
          if ('columns' in field) {
            selfMakeRow(field.columns, depth);
          }
        }
      }
      else {

      }

      field = null;
    }

    if (row.cols.length > 0) {
      if (!table.rows[depth]) {
        table.rows[depth] = {cols: []};
      }
      table.rows[depth].cols = table.rows[depth].cols.concat(row.cols);
      return (row.cols.length - 1) + colspan;
    }
    else {
      return colspan;
    }
  };

  maekRows(columns, 0);

  {
    // set rowspan
    for (let r = 0, rl = table.rows.length; r < rl; r++) {
      let row = table.rows[r];
      for (let c = 0, cl = row.cols.length; c < cl; c++) {
        let col = row.cols[c];
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
export function makeBodyRowMap(_table, _options) {
  let map = {};
  _table.rows.forEach(function (row) {
    row.cols.forEach(function (col) {
      map[col.rowIndex + "_" + col.colIndex] = extend({}, col);
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
export function makeFootSumTable(_footSumColumns, colGroup, options) {
  let table = {
    rows: []
  };

  for (let r = 0, rl = _footSumColumns.length; r < rl; r++) {
    let footSumRow = _footSumColumns[r],
        addC       = 0;

    table.rows[r] = {cols: []};

    for (let c = 0, cl = footSumRow.length; c < cl; c++) {
      if (addC > colGroup.length) break;
      let colspan = footSumRow[c].colspan || 1;
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
          label: "&nbsp;",
        });
      }
      addC += colspan;
      colspan = null;
    }

    if (addC < colGroup.length) {
      for (let c = addC; c < colGroup.length; c++) {
        table.rows[r].cols.push({
          colIndex: (c),
          colspan: 1,
          rowspan: 1,
          label: "&nbsp;",
        });
      }
    }
    footSumRow = null;
    addC = null;
  }

  return table;
}


export function makeBodyGroupingTable(_bodyGroupingColumns, colGroup, options) {
  let table = {
        rows: []
      },
      r     = 0,
      addC  = 0;

  table.rows[r] = {cols: []};

  for (let c = 0, cl = _bodyGroupingColumns.length; c < cl; c++) {
    if (addC > options.columns.length) break;
    let colspan = _bodyGroupingColumns[c].colspan || 1;
    if (_bodyGroupingColumns[c].label || _bodyGroupingColumns[c].key) {
      table.rows[r].cols.push({
        colspan: colspan,
        rowspan: 1,
        rowIndex: 0,
        colIndex: addC,
        columnAttr: "default",
        align: _bodyGroupingColumns[c].align,
        label: _bodyGroupingColumns[c].label,
        key: _bodyGroupingColumns[c].key,
        collector: _bodyGroupingColumns[c].collector,
        formatter: _bodyGroupingColumns[c].formatter
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
        colIndex: (c),
        colspan: 1,
        rowspan: 1,
        label: "&nbsp;",
      });
    }
  }

  return table;
}

export function findPanelByColumnIndex(_dindex, _colIndex, _rowIndex) {
  let _containerPanelName,
      _isScrollPanel = false,
      _panels        = [];

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
  }
}

export function getRealPathForDataItem(_dataPath) {
  let path  = [],
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
export function propsConverterForData(data) {
  let Obj_return = {
    receivedList: [],
    page: false
  };

  if (isArray(data)) {
    Obj_return.receivedList = data;
  }
  else if (isObject(data)) {
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
export function setColGroupWidth(_colGroup, container, options) {
  let totalWidth = 0, computedWidth, autoWidthColGroupIndexs = [], i, l;

  _colGroup.forEach((col, ci) => {
    if (isNumber(col.width)) {
      totalWidth += col._width = col.width;
    } else if (col.width === "*") {
      autoWidthColGroupIndexs.push(i);
    } else if (col.width.substring(col.width.length - 1) === "%") {
      totalWidth += col._width = container.width * col.width.substring(0, col.width.length - 1) / 100;
    }
  });

  if (autoWidthColGroupIndexs.length > 0) {
    computedWidth = (container.width - totalWidth) / autoWidthColGroupIndexs.length;
    for (i = 0, l = autoWidthColGroupIndexs.length; i < l; i++) {
      colGroup.update(autoWidthColGroupIndexs[i], O => {
        O._width = computedWidth;
        return O;
      });
    }
  }

  return _colGroup;
}