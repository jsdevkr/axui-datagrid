import * as React from 'react';
import { Divider, Button } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';
import { basicData } from './data/basicData';
import { IDataGrid } from 'axui-datagrid/common/@types';

interface IState {
  width: number;
  height: number;
  columns: IDataGrid.IColumn[];
  data: IDataGrid.IData;
  lineNumberWidth: number;
  rowSelectorWidth: number;
}

class ResizeColumn extends React.Component<any, IState> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      width: 300,
      height: 300,
      columns: [
        { key: 'id', width: 60, label: 'ID' },
        { key: 'title', width: 200, label: 'Title' },
        { key: 'writer', label: 'Writer' },
        { key: 'date', label: 'Date', formatter: 'date' },
        { key: 'money', label: 'Money', formatter: 'money', align: 'right' },
      ],
      data: basicData,
      lineNumberWidth: 60,
      rowSelectorWidth: 28,
    };

    this.dataGridContainerRef = React.createRef();
  }

  getDataGridContainerRect = (e?: Event) => {
    if (this.dataGridContainerRef.current) {
      const { width } =
        this.dataGridContainerRef.current.getBoundingClientRect();
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

  render() {
    const { width, height, columns, data, lineNumberWidth, rowSelectorWidth } =
      this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>RowSelector</h1>
          <p>
            'options - showRowSelector' If you set the value to true, a check
            box appears, allowing you to select each row of 'datagrid'.
          </p>

          <div
            ref={this.dataGridContainerRef}
            style={{ border: '1px solid #ccc' }}
          >
            <DataGrid
              width={width - 2}
              height={height - 2}
              style={{ fontSize: '12px' }}
              columns={columns}
              data={data}
              dataLength={Object.keys(data).length}
              options={{
                showRowSelector: true,
                rowSelectorSize: 16,
              }}
              scrollTop={-100}
              lineNumberWidth={lineNumberWidth}
              rowSelectorWidth={rowSelectorWidth}
            />
          </div>
          <Divider />

          <h2>Columns</h2>
          <textarea
            style={{ width: '100%', height: '150px', padding: '10px' }}
            value={`${JSON.stringify(
              columns,
            )}\nlineNumberWidth: ${lineNumberWidth}\nrowSelectorWidth: ${rowSelectorWidth}`}
            readOnly
          />
          <Divider />

          <Button type="primary" onClick={() => {
            this.setState({
              lineNumberWidth: 100
            })
          }}>
            setLineNumberWidth: 100
          </Button>
          <Button type="primary" onClick={() => {
            this.setState({
              lineNumberWidth: 50
            })
          }}>
            setLineNumberWidth: 50
          </Button>
        </Segment>
      </Wrapper>
    );
  }
}

export default ResizeColumn;
