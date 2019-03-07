import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { IDataGrid } from '../common/@types';
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

  render() {
    const {
      colGroup = [],
      data = [],
      predefinedFormatter = {},
      styles = {},
    } = this.props;

    const { bodyHeight = 0, bodyTrHeight = 1 } = styles;

    return (
      <div className={'axui-datagrid-autofit-helper'}>
        <table ref={this.tableRef}>
          <thead>
            <tr data-autofit-table-head-row>
              <td>{data.length + ''}</td>
              {colGroup.map((col, ci) => (
                <td key={ci}>{col.label}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data
              .slice(0, Math.ceil(bodyHeight / (bodyTrHeight || 1)) + 1)
              .map((row, li) => {
                return (
                  <tr key={li}>
                    <td>{li}</td>
                    {colGroup.map(col => (
                      <td key={col.colIndex}>
                        <span data-span>
                          <CellLabel
                            lineHeight={10}
                            col={col}
                            list={data}
                            li={li}
                            predefinedFormatter={predefinedFormatter}
                          />
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
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
          const tdWidth = tds[i].getBoundingClientRect().width + 10;
          let colWidth = tdWidth;

          if (autofitColumnWidthMin > colWidth) {
            colWidth = autofitColumnWidthMin;
          } else if (autofitColumnWidthMax < colWidth) {
            colWidth = autofitColumnWidthMax;
          }

          colGroup[i] = {
            colIndex: i,
            width: i === 0 ? tdWidth + 10 : colWidth,
            tdWidth: Math.min(tdWidth + 10, autofitColumnWidthMax + 100),
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
}

export default connectStore(DataGridAutofitHelper);
