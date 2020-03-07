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
}

class LoadingState extends React.Component<any, IState> {
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
    };

    this.dataGridContainerRef = React.createRef();
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

  changeConfig = (props: any, value: any) => {
    const processor = {
      setHeight: () => {
        this.setState({
          height: value,
        });
      },
    };

    if (props in processor) {
      processor[props].call(this, value);
    } else {
      this.setState(value);
    }
  };

  onSelect = (param: IDataGrid.IonSelectParam) => {
    console.log(param);

    const { li, selected, selectedAll } = param;
    const { data } = this.state;
    if (li !== undefined) {
      const item: IDataGrid.IDataItem = data[li];
      item.selected = selected;

      this.setState({
        data: { ...data, [li]: item },
      });
    } else {
      Object.values(data).forEach(item => {
        item.selected = selectedAll;
      });
      this.setState({
        data: { ...data },
      });
    }
  };

  render() {
    const { width, height, columns, data } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>RowSelector</h1>
          <p>
            'options> showRowSelector' If you set the value to true, a check box
            appears, allowing you to select each row of 'datagrid'.
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
              onSelect={this.onSelect}
            />
          </div>
          <Divider />

          <h2>Data</h2>
          <textarea
            style={{ width: '100%', height: '400px', padding: '10px' }}
            value={`${JSON.stringify(data)}`}
            readOnly
          />
          <Divider />

          <Button
            type="primary"
            onClick={() => {
              this.onSelect({ selectedAll: false });
              this.onSelect({ li: 0, selected: true });
            }}
          >
            select : [0]
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.onSelect({ selectedAll: false });
              this.onSelect({ li: 1, selected: true });
              this.onSelect({ li: 2, selected: true });
            }}
          >
            select : [1,2]
          </Button>
        </Segment>
      </Wrapper>
    );
  }
}

export default LoadingState;
