import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { IDataGrid } from '../common/@types';
import { isFunction } from '../utils';
import CellLabel from './CellLabel';

interface IProps extends IDataGridStore {
  applyAutofit: (params: IDataGrid.IapplyAutofitParam) => void;
}

class DataGridAutofitHelper extends React.Component<IProps> {
  canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: IProps) {
    super(props);

    this.canvasRef = React.createRef();
  }

  render() {
    const {
      colGroup = [],
      filteredList = [],
      predefinedFormatter = {},
      styles = {},
    } = this.props;

    const { bodyHeight = 0, bodyTrHeight = 1 } = styles;

    return <canvas ref={this.canvasRef} style={{ fontSize: 'inherit' }} />;
  }

  componentDidMount() {
    this.getColumnsWidth();
  }

  getColumnsWidth = () => {
    const {
      options = {},
      colGroup = [],
      filteredList = [],
      predefinedFormatter = {},
      styles = {},
    } = this.props;
    const { autofitColumnWidthMin = 0, autofitColumnWidthMax = 0 } = options;
    const { bodyHeight = 0, bodyTrHeight = 1 } = styles;

    if (this.canvasRef.current) {
      const context = this.canvasRef.current.getContext('2d') as any;
      context.font =
        '12px "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif';
      const cols = colGroup.map((col, ci) => {
        return context.measureText(col.label).width;
      });

      filteredList
        .slice(0, Math.ceil(bodyHeight / (bodyTrHeight || 1)) + 1)
        .map((row, li) => {
          colGroup.map((col, ci) => {
            const { key = '', formatter } = col;
            const formatterData = {
              filteredList,
              item: filteredList[li],
              index: li,
              key: col.key,
              value: filteredList[li][col.key || ''],
            };

            let labelValue: string;

            if (
              typeof formatter === 'string' &&
              formatter in predefinedFormatter
            ) {
              labelValue = predefinedFormatter[formatter](formatterData);
            } else if (isFunction(formatter)) {
              labelValue = (formatter as IDataGrid.formatterFunction)(
                formatterData,
              );
            } else {
              labelValue = filteredList[li][key];
            }
            const _width = Math.ceil(context.measureText(labelValue).width);
            cols[ci] = Math.max(cols[ci], _width);

            console.log('col' + ci, _width, labelValue);
          });
        });

      console.log(cols);

      this.props.applyAutofit({
        asideWidth: context.measureText(filteredList.length + '').width + 10,
        colGroup: cols.map((width, colIndex) => {
          const tdWidth = width + 12;
          let colWidth =
            autofitColumnWidthMin > tdWidth
              ? autofitColumnWidthMin
              : autofitColumnWidthMax < tdWidth
              ? autofitColumnWidthMax
              : tdWidth;

          return {
            colIndex,
            width: colWidth,
          };
        }) as IDataGrid.IAutofitCol[],
      });
    }
  };
}

export default connectStore(DataGridAutofitHelper);
