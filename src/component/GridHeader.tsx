import * as React from 'react';
import * as UTIL from '../_inc/utils';
import classNames from 'classnames'


export class GridHeader extends React.Component<iGridHeaderProps, iGridHeaderState> {
  constructor( props: iGridHeaderProps ) {
    super( props );

    this.state = {
      columnResizing: false,
      columnResizerLeft: 0
    };

    this.onMouseDownColumnResizer = this.onMouseDownColumnResizer.bind( this );
  }

  public shouldComponentUpdate( nextProps, nextState ) {
    let sameProps = false;

    if (
      this.props.mounted !== nextProps.mounted ||
      this.props.optionsHeader !== nextProps.optionsHeader ||
      this.props.styles !== nextProps.styles ||
      this.props.headerColGroup !== nextProps.headerColGroup ||
      this.props.scrollLeft !== nextProps.scrollLeft ||
      this.props.selectionCols !== nextProps.selectionCols ||
      this.props.focusedCol !== nextProps.focusedCol ||
      this.state.columnResizing !== nextState.columnResizing ||
      this.state.columnResizerLeft !== nextState.columnResizerLeft ||
      this.props.sortInfo !== nextProps.sortInfo
    ) {
      sameProps = true;
    }

    return sameProps;
  }

  private onMouseDownColumnResizer( e, col ) {
    e.preventDefault();

    const resizer = e.target;
    const prevLeft = Number( resizer.getAttribute( 'data-prev-left' ) );
    const currLeft = Number( resizer.getAttribute( 'data-left' ) );
    const { x: rootX } = this.props.getRootBounding();

    let newWidth;
    let startMousePosition = UTIL.getMousePosition( e ).x;

    const onMouseMove = ( ee ) => {
      const { x, y } = UTIL.getMousePosition( ee );
      let newLeft = currLeft + x - startMousePosition;
      if ( newLeft < prevLeft ) {
        newLeft = prevLeft;
      }
      newWidth = newLeft - prevLeft;

      this.setState( {
        columnResizing: true,
        columnResizerLeft: x - rootX + 1
      } );
    };

    const offEvent = ( ee ) => {
      ee.preventDefault();
      startMousePosition = null;
      document.removeEventListener( 'mousemove', onMouseMove );
      document.removeEventListener( 'mouseup', offEvent );
      document.removeEventListener( 'mouseleave', offEvent );

      this.setState( {
        columnResizing: false
      } );

      if ( typeof newWidth !== 'undefined' ) this.props.onResizeColumnResizer( e, col, newWidth );
    };

    document.addEventListener( 'mousemove', onMouseMove );
    document.addEventListener( 'mouseup', offEvent );
    document.addEventListener( 'mouseleave', offEvent );
  }

  private printHeader( _panelName: string, _colGroup: any, _bodyRow: any, _style: object ) {
    const onMouseDownColumnResizer = this.onMouseDownColumnResizer;
    const { optionsHeader, focusedCol, selectionCols, onClickHeader, sortInfo } = this.props;

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
      <div data-panel={_panelName} style={_style}>
        <table style={{ height: '100%' }}>
          <colgroup>
            {_colGroup.map(
              ( col, ci ) => (
                <col
                  key={ci}
                  style={{ width: col._width + 'px' }} />
              )
            )}
            <col />
          </colgroup>
          <tbody>
          {_bodyRow.rows.map(
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
                      ['focused']: (focusedCol > -1 && col.colIndex === focusedCol),
                      ['selected']: (selectionCols[ col.colIndex ])
                    };

                    return (
                      <td
                        key={ci}
                        colSpan={col.colspan}
                        rowSpan={col.rowspan}
                        className={classNames( classNameItems )}
                        onClick={( e ) => onClickHeader( e, col.colIndex, col.columnAttr )}
                        style={{ height: cellHeight, minHeight: '1px' }}>
                        {getFieldSpan( _colGroup, col )}
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
          if ( _panelName === 'aside-header' ) return null;
          let resizerHeight = optionsHeader.columnHeight * _bodyRow.rows.length - optionsHeader.columnBorderWidth;
          let resizer, resizerLeft = 0, resizerWidth = 4;
          return _colGroup.map(
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

  public render() {

    const {
            mounted,
            optionsHeader,
            styles,
            frozenColumnIndex,
            colGroup,
            asideColGroup,
            leftHeaderColGroup,
            headerColGroup,
            asideHeaderData,
            leftHeaderData,
            headerData,
            scrollLeft
          } = this.props;

    if ( !mounted ) return null;

    let asideHeaderPanelStyle = {
      left: 0,
      width: styles.asidePanelWidth,
      height: styles.headerHeight
    };
    let leftHeaderPanelStyle = {
      left: styles.asidePanelWidth,
      width: styles.frozenPanelWidth,
      height: styles.headerHeight
    };
    let headerPanelStyle = {
      left: styles.frozenPanelWidth + styles.asidePanelWidth,
      width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
      height: styles.headerHeight
    };
    let headerScrollStyle = {
      height: styles.headerHeight,
      left: scrollLeft
    };

    return (
      <div className={classNames( 'axd-header' )} style={{ height: styles.headerHeight }}>
        {(styles.asidePanelWidth > 0) ? this.printHeader( 'aside-header', asideColGroup, asideHeaderData, asideHeaderPanelStyle ) : null}
        {(frozenColumnIndex > 0) ? this.printHeader( 'left-header', leftHeaderColGroup, leftHeaderData, leftHeaderPanelStyle ) : null}
        <div data-scroll-container='header-scroll-container' style={headerPanelStyle}>
          {this.printHeader( 'header-scroll', headerColGroup, headerData, headerScrollStyle )}
        </div>

        {this.state.columnResizing ? <div data-column-resizing style={{ left: this.state.columnResizerLeft }} /> : null}
      </div>
    )
  }
}
