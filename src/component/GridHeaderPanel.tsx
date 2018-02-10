import * as React from 'react';
import cx from 'classnames'

export class GridHeaderPanel extends React.Component<iAXDataGridHeaderPanelProps, iAXDataGridHeaderPanelState> {

  constructor( props: iAXDataGridHeaderPanelProps ) {
    super( props );

    this.state = {};
  }

  public render() {
    const {
            panelName,
            colGroup,
            bodyRow,
            style,
            optionsHeader, focusedCol, selectionCols, onClickHeader, sortInfo, onMouseDownColumnResizer
          } = this.props;

    const getFieldSpan = function ( _colGroup, _col ) {
      let lineHeight = (optionsHeader.columnHeight - optionsHeader.columnPadding * 2 - optionsHeader.columnBorderWidth);
      let colAlign = optionsHeader.align || _col.align;
      let label, sorter, filter;

      if ( _col.key === '__checkbox_header__' ) {
        if ( optionsHeader.selector ) {
          label = <div data-checkbox style={{
            maxHeight: (_col.width - 10) + 'px',
            minHeight: (_col.width - 10) + 'px'
          }} />;
        }
      } else {
        label = _col.label;
      }

      if ( _col.key && _col.colIndex !== null && typeof _col.colIndex !== 'undefined' && sortInfo[ _col.key ] ) {
        sorter = <span data-sorter={_col.colIndex} data-sorter-order={sortInfo[ _col.key ].orderBy} />;
      }

      return (
        <span
          data-span
          data-align={colAlign}
          style={{
            height: (optionsHeader.columnHeight - optionsHeader.columnBorderWidth) + 'px',
            lineHeight: lineHeight + 'px'
          }}>
          {sorter}
          {label || ' '}
        </span>
      );
    };

    return (
      <div data-panel={panelName} style={style}>
        <table style={{ height: '100%' }}>
          <colgroup>
            {colGroup.map(
              ( col, ci ) => (
                <col
                  key={ci}
                  style={{ width: col._width + 'px' }} />
              )
            )}
            <col />
          </colgroup>
          <tbody>
          {bodyRow.rows.map(
            ( row, ri ) => {
              return (
                <tr
                  key={ri}
                  className=''>
                  {row.cols.map( ( col, ci ) => {

                    let cellHeight = optionsHeader.columnHeight * col.rowspan - optionsHeader.columnBorderWidth;
                    let classNameItems = {
                      ['axd-header-column']: true,
                      ['axd-header-corner']: (col.columnAttr === 'lineNumber'),
                      ['focused']: (focusedCol > -1 && col.colIndex === focusedCol && bodyRow.rows.length-1 === ri + col.rowspan - 1),
                      ['selected']: (selectionCols[ col.colIndex ] && bodyRow.rows.length-1 === ri + col.rowspan - 1)
                    };

                    return (
                      <td
                        key={ci}
                        colSpan={col.colspan}
                        rowSpan={col.rowspan}
                        className={cx( classNameItems )}
                        onClick={( e ) => onClickHeader( e, col.colIndex, col.columnAttr )}
                        style={{ height: cellHeight, minHeight: '1px' }}>
                        {getFieldSpan( colGroup, col )}
                        {(optionsHeader.enableFilter && col.key && col.colIndex > -1) ? <span data-filter='true' data-filter-index={col.colIndex} /> : null}
                      </td>
                    );
                  } )}
                  <td>&nbsp;</td>
                </tr>
              );
            }
          )}
          </tbody>
        </table>

        {(() => {
          if ( panelName === 'aside-header' ) return null;
          let resizerHeight = optionsHeader.columnHeight * bodyRow.rows.length - optionsHeader.columnBorderWidth;
          let resizer, resizerLeft = 0, resizerWidth = 4;
          return colGroup.map(
            ( col, ci ) => {
              if ( col.colIndex !== null && typeof col.colIndex !== 'undefined' ) {
                let prevResizerLeft = resizerLeft;
                resizerLeft += col._width;
                resizer = <div
                  key={ci}
                  data-column-resizer={col.colIndex}
                  data-prev-left={prevResizerLeft}
                  data-left={resizerLeft}
                  style={{ width: resizerWidth, height: resizerHeight + 'px', left: (resizerLeft - resizerWidth / 2) + 'px' }}
                  onMouseDown={e => onMouseDownColumnResizer( e, col )}
                />;
              }
              return (resizer);
            }
          )
        })()}
      </div>
    );
  }
}
