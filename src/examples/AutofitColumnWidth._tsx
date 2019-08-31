import * as React from 'react';

import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class AutofitColumnWidth extends React.Component<any, any> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    const gridData = require('examples/data/data-basic.json');

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
      data: gridData,
    };

    this.dataGridContainerRef = React.createRef();
  }

  public render() {
    const { width, height, columns, data, options } = this.state;

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
              columns={columns}
              data={data}
              options={options}
              autofitColumns={true}
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
