import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IDataGrid } from '../datagrid/common/@types';

export function useData(param: { url: string } = { url: '/api/getData' }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(param.url, { method: 'GET' });
      const { list } = await res.json();
      setData(list);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const setDataItem = useCallback(
    (itemIndex: number, item: any) => {
      data[itemIndex] = item;
      setData([...data]);
    },
    [data],
  );

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  return { data, loading, setDataItem };
}
