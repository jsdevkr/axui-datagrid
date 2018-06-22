function classNames(classNameObject: { [key: string]: boolean } | string) {
  let cx = [];
  if (typeof classNameObject === 'string') {
    cx.push(classNameObject);
  } else {
    for (let key in classNameObject) {
      if (classNameObject[key]) {
        cx.push(key);
      }
    }
  }

  return cx.join(' ');
}

export default classNames;
