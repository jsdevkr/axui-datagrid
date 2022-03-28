/**
 * @param {string | number} value 변환할 숫자 값
 * @param {number} n 소수점 표시 갯수
 * @param {number} x ,쉼표를 표시할 숫자 단위
 * @return {string}
 */
const formatCurrency = function(
  value: string | number,
  n: number = 0,
  x: number = 3,
) {
  const re = '\\d(?=(\\d{' + x + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return parseFloat('' + value)
    .toFixed(Math.max(0, n))
    .replace(new RegExp(re, 'g'), '$&,');
};

export default formatCurrency;
