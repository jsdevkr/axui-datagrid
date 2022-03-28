import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import { DataGrid } from '../datagrid';
import { IDataGrid } from '../datagrid/common/@types';
import { Container } from '../styles/Layouts';
import { useDataGridSize } from '../customEffect/useDataGridSize';
import { useData } from '../customEffect/useData';
import { isObject } from '../datagrid/utils';

const LargeColumn: NextPage = () => {
  const { dataGridContainerRef, width, height } = useDataGridSize();
  const { data, loading, setDataItem } = useData({
    url: '/api/getLargeColumnData',
  });
  const [columns] = useState<IDataGrid.IColumn[]>([
    {
      key: 'id',
      label: 'Id',
      width: 50,
    },
    { key: 'title', label: 'Title', width: 300 },
    { key: 'writer', label: 'Write', align: 'center', width: 100 },
    {
      key: 'rawContent',
      label: 'Raw Date',
      width: 200,
      editor: {
        activeType: 'click',
        type: 'text',
      },
    },
  ]);

  const [options, setOptions] = useState<IDataGrid.IOptions>({
    header: {
      align: 'center',
    },
    showLineNumber: true,
    showRowSelector: false,
  });

  const handleEditItem = useCallback(
    (param: IDataGrid.IonEditParam) => {
      const { li, col: { key: colKey = '' } = {}, value } = param;
      const editDataItem: IDataGrid.IDataItem = { ...data[li] };
      if (!colKey) {
        return;
      }

      if (isObject(value)) {
        editDataItem.value = { ...editDataItem.value, ...value };
      } else {
        (editDataItem.value as Record<string, any>)[colKey] = value;
      }

      setDataItem(li, editDataItem);
    },
    [data, setDataItem],
  );

  return (
    <div>
      <Head>
        <title>AXUI-DATAGRID</title>
        <meta name="description" content="Basic Sample" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Large Column</h1>

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
            onEdit={handleEditItem}
          />
        </div>
      </Container>
    </div>
  );
};

export default LargeColumn;
