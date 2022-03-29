import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { DataGrid } from '../datagrid';
import { IDataGrid } from '../datagrid/common/@types';
import { Container } from '../styles/Layouts';
import { useDataGridSize } from '../customEffect/useDataGridSize';
import { useData } from '../customEffect/useData';

const Basic: NextPage = () => {
  const { dataGridContainerRef, width, height } = useDataGridSize();
  const { data, loading } = useData();
  const [columns] = useState<IDataGrid.IColumn[]>([
    {
      key: 'id',
      label: 'Field A',
      width: 50,
      align: 'center',
    },
    { key: 'title', label: 'Field B', width: 300 },
    { key: 'writer', label: 'Field C', align: 'center', width: 100 },
    {
      key: 'price',
      label: 'Price',
      formatter: 'money',
      align: 'right',
      width: 100,
    },
    {
      key: 'qty',
      label: 'Qty',
      formatter: 'money',
      align: 'right',
      width: 50,
    },
    {
      key: 'money',
      label: 'Sum',
      align: 'right',
      formatter: 'money',
      width: 120,
    },
    { key: 'date', label: 'Sale Date', align: 'center', width: 120 },
  ]);
  const [options, setOptions] = useState<IDataGrid.IOptions>({
    header: {
      align: 'center',
    },
    showLineNumber: true,
    showRowSelector: false,
  });

  return (
    <div>
      <Head>
        <title>AXUI-DATAGRID</title>
        <meta name="description" content="Basic Sample" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Basic</h1>

        <div ref={dataGridContainerRef} style={{ border: '1px solid #ccc' }}>
          <DataGrid
            width={width}
            height={height}
            style={{ fontSize: '12px' }}
            columns={columns}
            data={data}
            dataLength={data.length}
            options={options}
            loading={loading}
            onDoubleClick={d => {
              console.log(d);
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default Basic;
