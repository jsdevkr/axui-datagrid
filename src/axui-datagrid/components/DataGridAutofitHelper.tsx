import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { IDataGrid } from '../common/@types';
import { arrayFromRange, getDataItem } from '../utils';
import CellLabel from './CellLabel';

interface IProps extends IDataGridStore {
  applyAutofit: (params: IDataGrid.IapplyAutofitParam) => void;
}

class DataGridAutofitHelper extends React.Component<IProps> {
  tableRef: React.RefObject<HTMLTableElement>;

  constructor(props: IProps) {
    super(props);

    this.tableRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.getColumnsWidth();
    });
  }

  getColumnsWidth = () => {
    const { options = {} } = this.props;
    const { autofitColumnWidthMin = 0, autofitColumnWidthMax = 0 } = options;

    if (this.tableRef.current) {
      const colGroup: IDataGrid.IAutofitCol[] = [];
      const tds = this.tableRef.current.querySelectorAll(
        '[data-autofit-table-head-row] > td',
      );
      if (tds && tds.length) {
        for (let i = 0, l = tds.length; i < l; i++) {
          const tdWidth = tds[i].getBoundingClientRect().width + 5;
          let colWidth = tdWidth;

          if (autofitColumnWidthMin > colWidth) {
            colWidth = autofitColumnWidthMin;
          } else if (autofitColumnWidthMax < colWidth) {
            colWidth = autofitColumnWidthMax;
          }

          colGroup[i] = {
            colIndex: i,
            width: i === 0 ? tdWidth + 5 : colWidth,
            tdWidth: Math.min(tdWidth + 5, autofitColumnWidthMax + 100),
          };
        }
      }

      if (colGroup.length) {
        this.props.applyAutofit({
          asideWidth: colGroup[0].width,
          colGroup: colGroup.slice(1),
        });
      }
    }
  };

  render() {
    const {
      colGroup = [],
      data = {},
      dataLength = 0,
      predefinedFormatter = {},
      styles = {},
      options: { lineNumberStartAt = 1 } = {},
    } = this.props;

    const { bodyHeight = 0, bodyTrHeight = 1 } = styles;

    return (
      <div className={'axui-datagrid-autofit-helper'}>
        <table ref={this.tableRef}>
          <thead>
            <tr data-autofit-table-head-row>
              <td>{dataLength + ''}</td>
              {colGroup.map((col, ci) => (
                <td key={ci} style={{ paddingLeft: 30 }}>
                  {col.label}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {arrayFromRange(
              0,
              Math.min(
                Math.ceil(bodyHeight / (bodyTrHeight || 1)),
                dataLength - 1,
              ),
            ).map(li => {
              return (
                <tr key={li}>
                  <td>{li + lineNumberStartAt + ''}</td>
                  {colGroup.map((col, ci) => {
                    const colEditor: IDataGrid.IColEditor =
                      col.editor === 'string'
                        ? { type: '' + col.editor }
                        : (col.editor as IDataGrid.IColEditor);
                    const inlineEditingActiveAlways =
                      colEditor && colEditor.activeType === 'always';

                    return inlineEditingActiveAlways && colEditor.width ? (
                      <td key={ci}>
                        <div style={{ width: colEditor.width }} />
                      </td>
                    ) : (
                      <td key={ci}>
                        <CellLabel
                          columnHeight={12}
                          lineHeight={12}
                          columnBorderWidth={0}
                          rowSelectorSize={17}
                          colAlign={'left'}
                          col={col}
                          li={li}
                          lineNumberStartAt={lineNumberStartAt}
                          item={getDataItem(data, li)}
                          predefinedFormatter={predefinedFormatter}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connectStore(DataGridAutofitHelper);
