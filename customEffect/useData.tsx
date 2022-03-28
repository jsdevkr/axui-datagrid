import React, { useCallback, useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  return { data, loading };
}
