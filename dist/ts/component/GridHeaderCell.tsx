import * as React from 'react';
import cx from 'classnames';

export class GridHeaderCell extends React.Component<iAXDataGridHeaderCellProps, iAXDataGridHeaderCellState> {

  constructor( props: iAXDataGridHeaderCellProps ) {
    super( props );

    this.state = {};
  }

  public render() {
    const {
            bodyRow,
            optionsHeader,
            focusedCol,
            selectionCols,
            sortInfo,
            ri,
            col,
            onClickHeader
          } = this.props;


    let lineHeight = (optionsHeader.columnHeight - optionsHeader.columnPadding * 2 - optionsHeader.columnBorderWidth);
    let colAlign = optionsHeader.align || col.align;
    let label, sorter, filter;

    if ( col.key === '__checkbox_header__' ) {
      if ( optionsHeader.selector ) {
        label = <div data-checkbox style={{
          maxHeight: (col.width - 10) + 'px',
          minHeight: (col.width - 10) + 'px'
        }} />;
      }
    } else {
      label = col.label;
    }

    if ( col.key && col.colIndex !== null && typeof col.colIndex !== 'undefined' && sortInfo[ col.key ] ) {
      sorter = <span data-sorter={col.colIndex} data-sorter-order={sortInfo[ col.key ].orderBy} />;
    }

    let cellHeight = optionsHeader.columnHeight * col.rowspan - optionsHeader.columnBorderWidth;
    let tdClassNames = {
      ['axd-header-column']: true,
      ['axd-header-corner']: (col.columnAttr === 'lineNumber'),
      ['focused']: (focusedCol > -1 && col.colIndex === focusedCol && bodyRow.rows.length - 1 === ri + col.rowspan - 1),
      ['selected']: (selectionCols[ col.colIndex ] && bodyRow.rows.length - 1 === ri + col.rowspan - 1)
    };

    return (
      <td
        colSpan={col.colspan}
        rowSpan={col.rowspan}
        className={cx( tdClassNames )}
        onClick={( e ) => onClickHeader( e, col.colIndex, col.columnAttr )}
        style={{ height: cellHeight, minHeight: '1px' }}>
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
        {(optionsHeader.enableFilter && col.key && col.colIndex > -1) ? <span data-filter='true' data-filter-index={col.colIndex} /> : null}
      </td>


    );
  }
}
