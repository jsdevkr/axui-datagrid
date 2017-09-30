import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';


const getFieldValue = function (_optionsHeader, _col) {
  if (_col.key === "__checkbox_header__") {
    if (_optionsHeader.selector) {
      return <div className="checkBox" style={{"max-height": (_col.width - 10) + "px", "min-height": (_col.width - 10) + "px"}}></div>;
    }else{
      return "&nbsp;";
    }
  } else {
    return _col.label || "&nbsp;";
  }
};

const getHeader = function (_optionsHeader, _colGroup, _bodyRow) {
  let tableWidth = 0;

  return (
    <table>
      <colgroup>
        {_colGroup.map(
          (col, ci) => (
            <col
              key={ci}
              style={{width: col._width + "px"}} />
          )
        )}
        <col />
      </colgroup>
      <tbody>
      {_bodyRow.rows.map(
        (row, ri) => {
          return (
            <tr
              key={ri}
              className="">
              {row.cols.map((col, ci) => (
                <td key={ci}>
                  {getFieldValue(_optionsHeader, col)}
                </td>
              ))}
              <td>&nbsp;</td>
            </tr>
          );
        }
      )}
      </tbody>
    </table>
  );

  /*

  SS.push('<table border="0" cellpadding="0" cellspacing="0">');
  SS.push('<colgroup>');
  for (var cgi = 0, cgl = _colGroup.length; cgi < cgl; cgi++) {
    SS.push('<col style="width:' + _colGroup[cgi]._width + 'px;"  />');
    tableWidth += _colGroup[cgi]._width;
  }
  SS.push('<col  />');
  SS.push('</colgroup>');

  for (var tri = 0, trl = _bodyRow.rows.length; tri < trl; tri++) {
    var trCSS_class = "";
    SS.push('<tr class="' + trCSS_class + '">');
    for (var ci = 0, cl = _bodyRow.rows[tri].cols.length; ci < cl; ci++) {
      var col = _bodyRow.rows[tri].cols[ci];
      var cellHeight = cfg.header.columnHeight * col.rowspan - cfg.header.columnBorderWidth;
      var colAlign = headerAlign || col.align;
      SS.push('<td ',
        'data-ax5grid-column-attr="' + (col.columnAttr || "default") + '" ',
        'data-ax5grid-column-row="' + tri + '" ',
        'data-ax5grid-column-col="' + ci + '" ',
        (function () {
          return (typeof col.key !== "undefined") ? 'data-ax5grid-column-key="' + col.key + '" ' : '';
        })(),
        'data-ax5grid-column-colindex="' + col.colIndex + '" ',
        'data-ax5grid-column-rowindex="' + col.rowIndex + '" ',
        'colspan="' + col.colspan + '" ',
        'rowspan="' + col.rowspan + '" ',
        'class="' + (function (_col) {
          var tdCSS_class = "";
          if (_col.headerStyleClass) {
            if (U.isFunction(_col.headerStyleClass)) {
              tdCSS_class += _col.headerStyleClass.call({
                column: _col,
                key: _col.key
              }) + " ";
            } else {
              tdCSS_class += _col.headerStyleClass + " ";
            }
          }
          if (cfg.header.columnBorderWidth) tdCSS_class += "hasBorder ";
          if (ci == cl - 1) tdCSS_class += "isLastColumn ";
          return tdCSS_class;
        }).call(this, col) + '" ',
        'style="height: ' + cellHeight + 'px;min-height: 1px;">');

      SS.push((function () {
        var lineHeight = (cfg.header.columnHeight - cfg.header.columnPadding * 2 - cfg.header.columnBorderWidth);
        return '<span data-ax5grid-cellHolder="" ' +
          ((colAlign) ? 'data-ax5grid-text-align="' + colAlign + '"' : '') +
          ' style="height: ' + (cfg.header.columnHeight - cfg.header.columnBorderWidth) + 'px;line-height: ' + lineHeight + 'px;">';
      })(), (function () {
        var _SS = "";

        if (!U.isNothing(col.key) && !U.isNothing(col.colIndex) && (cfg.sortable === true || col.sortable === true) && col.sortable !== false) {
          _SS += '<span data-ax5grid-column-sort="' + col.colIndex + '" data-ax5grid-column-sort-order="' + (colGroup[col.colIndex].sort || "") + '" />';
        }
        return _SS;
      })(), getFieldValue.call(this, col), '</span>');

      if (!U.isNothing(col.colIndex)) {
        if (cfg.enableFilter) {
          SS.push('<span data-ax5grid-column-filter="' + col.colIndex + '" data-ax5grid-column-filter-value=""  />');
        }
      }

      SS.push('</td>');
    }
    SS.push('<td ',
      'data-ax5grid-column-row="null" ',
      'data-ax5grid-column-col="null" ',
      'style="height: ' + (cfg.header.columnHeight) + 'px;min-height: 1px;" ',
      '></td>');
    SS.push('</tr>');
  }
  SS.push('</table>');

  /// append column-resizer
  (function () {
    let resizerHeight = cfg.header.columnHeight * _bodyRow.rows.length - cfg.header.columnBorderWidth,
        resizerLeft = 0,
        AS = [];

    for (var cgi = 0, cgl = _colGroup.length; cgi < cgl; cgi++) {
      var col = _colGroup[cgi];
      if (!U.isNothing(col.colIndex)) {
        //_colGroup[cgi]._width
        resizerLeft += col._width;
        AS.push('<div data-ax5grid-column-resizer="' + col.colIndex + '" style="height:' + resizerHeight + 'px;left: ' + (resizerLeft - 4) + 'px;"  />');
      }
    }
    //_elTarget.append(AS);
  }).call(this);
  */

  // return tableWidth;
};

const GridHeader = ({
                      optionsHeader,
                      asidePanelWidth,
                      frozenColumnIndex,
                      colGroup,
                      headerTable,
                      asideColGroup,
                      leftHeaderColGroup,
                      headerColGroup,
                      asideHeaderData,
                      leftHeaderData,
                      headerData
                    }) => {

  let asideHeader, leftHeader, header, rightHeader;

  if (asidePanelWidth > 0) {
    asideHeader = getHeader(optionsHeader, asideColGroup, asideHeaderData.toJS());
  }
  if (frozenColumnIndex > 0) {
    leftHeader = getHeader(optionsHeader, leftHeaderColGroup, leftHeaderData.toJS());
  }
  header = getHeader(optionsHeader, headerColGroup, headerData.toJS());


  // todo : get scrollContentWidth
  // this.xvar.scrollContentWidth = repaintHeader.call(this, this.$.panel["header-scroll"], this.headerColGroup, headerData);

  return (
    <div className={classNames(sass.gridHeader)}>

      <div data-ax5grid-panel="aside-header">
        {asideHeader}
      </div>
      <div data-ax5grid-panel="left-header">
        {leftHeader}
      </div>
      <div data-ax5grid-panel="header">
        <div data-ax5grid-panel-scroll="header">
          {header}
        </div>
      </div>
      <div data-ax5grid-panel="right-header">
        {rightHeader}
      </div>
    </div>
  )
};

export default GridHeader;