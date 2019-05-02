import * as React from 'react';
import { Divider, Button } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class LoadingState extends React.Component<any, any> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    let gridData = require('examples/data/data-basic.json');

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
      data: [...gridData],
      selectedList: [],
      selectedIndexes: [],
    };

    this.dataGridContainerRef = React.createRef();
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

  render() {
    const { width, height, columns, data, selectedIndexes } = this.state;

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
              options={{
                showRowSelector: true,
                rowSelectorSize: 16,
              }}
              selectedIndexes={selectedIndexes}
              onChangeSelected={param => {
                this.setState({
                  selectedList: param.selectedList,
                  selectedIndexes: param.selectedIndexes,
                });
              }}
            />
          </div>
          <Divider />

          <h2>Data</h2>
          <textarea
            style={{ width: '100%', height: '400px', padding: '10px' }}
            value={`selectedList : ${JSON.stringify(
              this.state.selectedList,
            )}\nselectedIndexes: ${this.state.selectedIndexes}`}
            readOnly
          />
          <Divider />

          <Button
            type="primary"
            onClick={() =>
              this.setState({
                selectedIndexes: [0],
              })
            }
          >
            selectedIndexes : [0]
          </Button>
          <Button
            type="primary"
            onClick={() =>
              this.setState({
                selectedIndexes: [1, 2],
              })
            }
          >
            selectedIndexes : [1,2]
          </Button>
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

export default LoadingState;
