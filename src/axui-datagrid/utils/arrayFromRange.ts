function arrayFromRange(start: number, end: number, step?: number) {
  let range = [];
  if (typeof step === 'undefined') {
    step = 1;
  }
  if (end < start) {
    step = -step;
  }

  while (step > 0 ? end >= start : end <= start) {
    range.push(start);
    start += step;
  }

  return range;
}

export default arrayFromRange;
