import * as React from 'react';
import { Button, Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid, IDataGrid, utils } from 'axui-datagrid';
import { basicData } from './data/basicData';

class FootSum extends React.Component<any, any> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      width: 300,
      height: 300,
      columns: [
        { key: 'id', width: 60, label: 'ID', align: 'center' },
        {
          key: 'title',
          width: 200,
          label: 'Title',
        },
        { key: 'writer', label: 'Writer', align: 'center' },
        { key: 'price', label: 'price', align: 'right', formatter: 'money' },
        { key: 'qty', label: 'Qty', align: 'right', formatter: 'money' },
        {
          key: 'sum',
          label: 'Sum',
          align: 'right',
          formatter: function(formatterData: IDataGrid.IFormatterData) {
            if (!formatterData.item) {
              return '';
            }
            const itemValue = formatterData.item.value as any;
            const price = itemValue.price;
            const qty = itemValue.qty;
            return utils.formatCurrency(price * qty);
          },
        },
        { key: 'description', width: 200, label: 'Description' },
      ],
      footSum: [
        [
          { label: 'footSum', colSpan: 3, align: 'center' },
          {
            key: 'price',
            collector: 'avg',
            formatter: 'money',
            align: 'right',
          },
          {
            key: 'qty',
            collector: 'sum',
            formatter: 'money',
            align: 'right',
          },
          {
            key: 'sum',
            collector: function(collectorData: IDataGrid.ICollectorData) {
              const { data = {} } = collectorData;
              return Object.values(data).reduce(
                (accumulator: number, currentValue: any) =>
                  accumulator + currentValue.price * currentValue.qty,
                0,
              );
            },
            formatter: 'money',
            align: 'right',
          },
        ],
      ],

      data: basicData,
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

  public render() {
    const { width, height, columns, data, footSum, options } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>FootSum</h1>
          <p>
            You can use footSum props. <br />
            The value of the footSum column, which consists of an array, can be
            determined using the built-in collector (avg, sum) function. <br />
            Alternatively, you can define your own function.
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
              footSum={footSum}
              data={data}
              dataLength={data.length}
              options={options}
            />
          </div>

          <Divider />

          <Button
            type="primary"
            onClick={() => this.changeConfig('setHeight', 300)}
          >
            height : 300
          </Button>
          <Button
            type="primary"
            onClick={() => this.changeConfig('setHeight', 400)}
          >
            height : 400
          </Button>
          <Button
            type="primary"
            onClick={() => this.changeConfig('setHeight', 500)}
          >
            height : 500
          </Button>
        </Segment>
      </Wrapper>
    );
  }

  getDataGridContainerRect = () => {
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

export default FootSum;
