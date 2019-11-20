import * as React from 'react';

import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';
import { basicData } from './data/basicData';
import { IDataGrid } from 'axui-datagrid/common/@types';
import { formatCurrency, printDate } from 'axui-datagrid/utils';
import { log } from 'util';

function getFormatText(formatter: string, text: string) {
  switch (formatter) {
    case 'money':
      const dotIndex = ('' + text).indexOf('.');
      return formatCurrency(
        text,
        dotIndex > 0 ? ('' + text).length - 1 - dotIndex : 0,
      );
    case 'date':
      return printDate(text, 'yyyy-MM-dd');
    default:
      return '';
  }
}
function measureColumnsWidth(columns: IDataGrid.IColumn[], data: any[]) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (context) {
    context.font =
      '13px "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif';

    const cols = columns.map(col => {
      return context.measureText(col.label || '').width;
    });

    data.slice(0, 10).forEach(row => {
      columns.forEach((col, ci) => {
        let text = row.value[col.key || ''];
        if (typeof col.formatter === 'string') {
          text = getFormatText(col.formatter, text);
        }

        const _width = Math.ceil(context.measureText(text).width) + 20;
        cols[ci] = Math.min(Math.max(cols[ci], Math.max(_width, 50)), 300);
      });
    });
    canvas.remove();
    return columns.map((col, ci) => {
      return { ...col, width: cols[ci] };
    });
  } else {
    canvas.remove();
    return columns;
  }
}

class AutofitColumnWidth extends React.Component<any, any> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      width: 300,
      height: 300,
      columns: [
        { key: 'money', label: 'Money', align: 'right', formatter: 'money' },
        { key: 'date', label: 'Date', align: 'center', formatter: 'date' },
        { key: 'writer', label: 'Writer', align: 'center' },
        { key: 'title', label: 'Title' },
        { key: 'id', label: 'ID', align: 'center' },
        { key: 'title', label: 'Title' },
        { key: 'writer', label: 'Writer', align: 'center' },
        { key: 'date', label: 'Date', align: 'center', formatter: 'date' },
        { key: 'money', label: 'Money', align: 'right', formatter: 'money' },
      ],
      data: basicData,
    };

    this.dataGridContainerRef = React.createRef();
  }

  public render() {
    const { width, height, columns, data, options } = this.state;

    const _columns = measureColumnsWidth(columns, data);
    console.log(_columns);
    return (
      <Wrapper>
        <Segment padded>
          <h1>Autofit Column Width</h1>

          <div
            ref={this.dataGridContainerRef}
            style={{ border: '1px solid #ccc' }}
          >
            <DataGrid
              width={width - 2}
              height={height - 2}
              style={{ fontSize: '12px' }}
              columns={_columns}
              data={data}
              dataLength={data.length}
              options={options}
              // autofitColumns={true}
            />
          </div>
        </Segment>
      </Wrapper>
    );
  }

  getDataGridContainerRect = (e?: Event) => {
    if (this.dataGridContainerRef.current) {
      const {
        width,
      } = this.dataGridContainerRef.current.getBoundingClientRect();

      this.setState({ width });
    }
  };

  componentDidMount() {
    this.getDataGridContainerRect();
    window.addEventListener('resize', this.getDataGridContainerRect, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDataGridContainerRect);
  }
}

export default AutofitColumnWidth;
