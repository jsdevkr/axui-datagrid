type T10<T> = T & { b: number };

const Obj: T10<{ a: string }> = {
  a: '',
  b: 0,
};
