import * as React from 'react';
import classNames from 'classnames'
import { E_NAME } from '../_inc/constant';
import isString from 'lodash-es/isString';
import isFunction from 'lodash-es/isFunction';

export class GridBodyCell extends React.Component<iGridBodyCellProps, iGridBodyCellState> {
  private editInput: HTMLInputElement;

  constructor( props: iGridBodyCellProps ) {
    super( props );

    this.state = {};
  }

  public componentDidUpdate( prevProps, prevState ) {
    if ( this.props.inlineEditingCell !== prevProps.inlineEditingCell ) {
      if ( this.editInput ) {
        this.editInput.select();
      }
    }
  }

  /*
  public shouldComponentUpdate( nextProps, nextState ) {

    let sameProps = false;

    if (
      this.props.columnHeight !== nextProps.columnHeight ||
      this.props.columnPadding !== nextProps.columnPadding ||
      this.props.columnBorderWidth !== nextProps.columnBorderWidth ||
      this.props.bodyAlign !== nextProps.bodyAlign ||
      this.props.focusedRow !== nextProps.focusedRow ||
      this.props.focusedCol !== nextProps.focusedCol ||
      this.props.selectionRows !== nextProps.selectionRows ||
      this.props.selectionCols !== nextProps.selectionCols ||
      this.props.columnFormatter !== nextProps.columnFormatter ||
      this.props.list !== nextProps.list ||
      this.props.list !== nextProps.list ||
      this.props.list !== nextProps.list
    ) {
      sameProps = true;
    }

    return sameProps;
  }
  */

  private getFieldSpan( _colGroup, _col, _item, _itemIdx ) {
    const { list, columnFormatter } = this.props;

    const getLabel = function ( _colGroup, _col, _item, _itemIdx ) {
      let formatterData = {
        list: list,
        item: _item,
        index: _itemIdx,
        key: _col.key,
        value: _item[ _col.key ]
      };
      let label: string;

      if ( isString( _col.formatter ) && _col.formatter in columnFormatter ) {
        label = columnFormatter[ _col.formatter ]( formatterData );
      }
      else if ( isFunction( _col.formatter ) ) {
        label = _col.formatter( formatterData );
      } else {
        label = _item[ _col.key ];
      }

      return label;
    };

    let lineHeight: number = (this.props.columnHeight - this.props.columnPadding * 2 - this.props.columnBorderWidth);
    let colAlign: string = this.props.bodyAlign || _col.align;
    let label: any;

    if ( _col.key === '__line_number__' ) {
      label = _itemIdx + 1;
    }
    else if ( _col.key === '__row_selector__' ) {
      label = <div
        className={classNames( 'axd-check-box' )}
        style={{ maxHeight: (_col.width - 10) + 'px', minHeight: (_col.width - 10) + 'px' }} />;
    }
    else {
      label = getLabel( _colGroup, _col, _item, _itemIdx );
    }

    let spanStyle = {
      height: (this.props.columnHeight - this.props.columnBorderWidth) + 'px',
      lineHeight: lineHeight + 'px',
      textAlign: colAlign
    };

    return (
      <span
        data-span={_col.columnAttr || ''}
        data-pos={_col.colIndex + ',' + _col.rowIndex + ',' + _itemIdx}
        style={spanStyle}>
        {label || ' '}
      </span>
    );
  }

  public render() {

    const {
            columnHeight,
            columnBorderWidth,
            focusedRow,
            focusedCol,
            selectionRows,
            selectionCols,
            isInlineEditing,
            inlineEditingCell,
            onDoubleClickCell,
            list,
            li,
            colGroup,
            col, ci, value,
            onEditInput
          } = this.props;

    let cellHeight = columnHeight * col.rowspan - columnBorderWidth;
    let classNameItems = {
      ['axd-line-number']: (col.columnAttr === 'lineNumber'),
      ['axd-row-selector']: (col.columnAttr === 'rowSelector')
    };

    if ( col.columnAttr === 'lineNumber' ) {
      if ( focusedRow === li ) {
        classNameItems[ 'focused' ] = true;
      }
      if ( selectionRows[ li ] ) {
        classNameItems[ 'selected' ] = true;
      }
    }
    else if ( col.columnAttr === 'rowSelector' ) {

    }
    else {
      if ( selectionRows[ li ] && selectionCols[ col.colIndex ] ) {
        classNameItems[ 'selected' ] = true;
      }
      if ( focusedRow === li && focusedCol == col.colIndex ) {
        classNameItems[ 'focused' ] = true;
      }
    }


    if ( isInlineEditing && inlineEditingCell.row === li && inlineEditingCell.col === col.colIndex ) {
      return (
        <td
          key={ci}
            colSpan={col.colspan}
            rowSpan={col.rowspan}
            className={classNames( classNameItems )}
            style={{ height: cellHeight, minHeight: '1px' }}>
          <input type='text'
                 ref={input => {
                   this.editInput = input;
                 }}
                 onBlur={e => {
                   onEditInput( E_NAME.BLUR, e );
                 }}
                 onKeyDown={e => {
                   onEditInput( E_NAME.KEY_DOWN, e );
                 }}
                 data-inline-edit
                 defaultValue={value} />
        </td>
      )
    }
    else {
      return (
        <td
          key={ci}
            colSpan={col.colspan}
            rowSpan={col.rowspan}
            className={classNames( classNameItems )}
            style={{ height: cellHeight, minHeight: '1px' }}
            onDoubleClick={e => {
              onDoubleClickCell( e, col, li );
            }}>
          {this.getFieldSpan( colGroup, col, list.get(li), li )}
        </td>
      )
    }

  }
}
