import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DataGrid } from '../axui-datagrid';
import { IDataGrid } from '../axui-datagrid/common/@types';
import { useWindowSize } from '../customEffect/useWindowSize';
import { Container } from '../styles/Layouts';

const Home: NextPage = () => {
  const windowSize = useWindowSize();
  const dataGridContainerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(400);
  const [loading, setLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState<IDataGrid.IColumn[]>([
    {
      key: 'a',
      label: 'Field A',
      width: 50,
      align: 'center',
    },
    { key: 'b', label: 'Field B', align: 'center', width: 50 },
    { key: 'c', label: 'Field C', align: 'center', width: 50 },
    {
      key: 'price',
      label: 'Price',
      formatter: 'money',
      align: 'right',
      width: 50,
    },
    {
      key: 'amount',
      label: 'Qty',
      formatter: 'money',
      align: 'right',
      width: 50,
    },
    {
      key: 'cost',
      label: 'Sum',
      align: 'right',
      formatter: 'money',
      width: 50,
    },
    { key: 'saleDt', label: 'Sale Date', align: 'center', width: 50 },
    { key: 'customer', label: 'Customer', align: 'center', width: 50 },
    { key: 'saleType', label: 'Sale Type', align: 'center', width: 50 },
  ]);
  const [options, setOptions] = useState<IDataGrid.IOptions>({
    header: {
      align: 'center',
    },
    showLineNumber: true,
    showRowSelector: false,
  });
  const [data, setData] = useState<any[]>([]);

  const getData = useCallback(async () => {
    const res = await fetch(`/api/getData`, { method: 'GET' });
    const { list } = await res.json();
    setData(list);
  }, []);

  useEffect(() => {
    if (dataGridContainerRef.current) {
      setWidth(dataGridContainerRef.current.clientWidth);
      setHeight(dataGridContainerRef.current.clientHeight);
    }
  }, [windowSize.width, windowSize.height]);

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

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

export default Home;
