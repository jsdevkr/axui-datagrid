function classNames(classNameObject: { [key: string]: boolean }) {
  let cx = [];
  for (let key in classNameObject) {
    if (classNameObject[key]) {
      cx.push(key);
    }
  }

  return cx.join(' ');
}

export default classNames;
