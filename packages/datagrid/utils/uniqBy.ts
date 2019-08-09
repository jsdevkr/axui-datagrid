const uniqBy = (arr: any[], predicate: string) => {
  const cb =
    typeof predicate === 'function' ? predicate : (o: any) => o[predicate];

  return [
    ...arr
      .reduce((map, item) => {
        const key = cb(item);
        map.has(key) || map.set(key, item);
        return map;
      }, new Map())
      .values(),
  ];
};

export default uniqBy;
