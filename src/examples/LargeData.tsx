import * as React from 'react';
import styled from "styled-components";
import { Button, Divider } from 'antd';
import mouseEventSubscribe, {
  IMousePosition
} from "../axui-datagrid/utils/mouseEventSubscribe";
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';


console.log("???"+styled.div);
const MyBox = styled.div`
  position: relative;
  background: #eee;

.resizer {
  position: absolute;
  right: -12px;
  bottom: -12px;
  width: 15px;
  height: 12px;
  font-size: 12px;
  line-height: 12px;
  transform: rotate(45deg);
  cursor: se-resize;
  user-select: none;
}
`;



class LargeData extends React.Component<any, any> {
  
  containerRef: React.RefObject<any>;


  constructor(props: any) {
    super(props);
    this.containerRef = React.createRef();
    let gridData = [];

    const typeGroup = {
      aTypes: ['A', 'B', 'C', 'D'],
      bTypes: ['A01', 'A02', 'B01', 'B02', 'C01', 'C02'],
      cTypes: ['Thomas', 'Brant', 'Ben', 'Woo'],
      priceTypes: [500, 1000, 1500, 2000],
      amountTypes: [1, 2, 4, 5, 10, 20],
      saleTypes: ['T', 'B', 'H', 'W'],
      saleDtTypes: [
        '2018-01-20',
        '2018-01-21',
        '2018-02-01',
        '2018-02-02',
        '2018-02-03',
      ],
      customerTypes: [
        'TOM',
        'BRANT',
        'BENJAMIN',
        'BILL',
        'KELLY',
        'CIA',
        'ALAIN',
        'ROBB',
        'ISSAC',
        'ELLIE',
        'PAUL',
      ],
    };

    const getTypes = (typeName: string) => {
      const types = typeGroup[typeName];
      return types[Math.floor(Math.random() * types.length)];
    };

    for (let i = 1; i < 10000; i++) {
      const price = getTypes('priceTypes');
      const amount = getTypes('amountTypes');

      gridData.push({
        a: getTypes('aTypes'),
        b: getTypes('bTypes'),
        c: getTypes('cTypes'),
        saleDt: getTypes('saleDtTypes'),
        customer: getTypes('customerTypes'),
        saleType: getTypes('saleTypes'),
        price: price,
        amount: amount,
        cost: price * amount,
      });
    }

    this.state = {
      boxHeight: 300,
      columns: [
        {
          key: 'a',
          label: 'Field A',
          width: 80,
          align: 'center',
        },
        { key: 'b', label: 'Field B', align: 'center' },
        { key: 'c', label: 'Field C', align: 'center' },
        { key: 'price', label: 'Price', formatter: 'money', align: 'right' },
        { key: 'amount', label: 'Qty', formatter: 'money', align: 'right' },
        { key: 'cost', label: 'Sum', align: 'right', formatter: 'money' },
        { key: 'saleDt', label: 'Sale Date', align: 'center' },
        { key: 'customer', label: 'Customer', align: 'center' },
        { key: 'saleType', label: 'Sale Type', align: 'center' },
      ],
      data: gridData,
      options: {
        lineNumberColumnWidth: 60,
        header: {
          align: 'center',
        },
        showLineNumber: true,
        showRowSelector: false,
      },
    };
  }

  
  handleColResizerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const {
      left: containerLeft,
      top: containerTop
    } = this.containerRef.current.getBoundingClientRect();

    mouseEventSubscribe(
      (mpos: IMousePosition) => {
        this.setState({
          boxWidth: mpos.clientX - containerLeft,
          boxHeight: mpos.clientY - containerTop
        });
      },
      () => {
        // resize 종료 (마우스 업 이벤트 발생.)
      }
    );
    };

  changeConfig = (props: any, value: any) => {
    const processor = {
      setHeight: () => {
        this.setState({
          height: value,
        });
      },
    };

    if (props in processor) {
      processor[props].call(this);
    } else {
      this.setState(value);
    }
  };


  render() {
    const { boxWidth, boxHeight } = this.state;
    return (
      <div>
      <Wrapper>
        <Segment padded>
          <h1>LargeData</h1>
          <p>
            To represent large amounts of data in the browser, a large amount of
            HTML nodes Required. However, if you represent a large amount of
            HTML nodes in your browser The browser will slow down and
            inconvenience you. Because axui-datagrid only prints the areas that
            need to be displayed in the grid container area, it can process
            large amounts of data quickly.
          </p>

          <MyBox
            style={{ width: boxWidth, height: boxHeight }}
            ref={this.containerRef}
          >
              <DataGrid
                height={this.state.boxHeight}
                style={{ fontSize: '12px' }}
                columns={this.state.columns}
                data={this.state.data}
                options={this.state.options}
              />
              <div className="resizer" onMouseDownCapture={this.handleColResizerMove}>
                ⇆
              </div>
          </MyBox>
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
      </div>
    );
  }
}


export default LargeData;
