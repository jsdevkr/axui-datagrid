/**
 * @param {string | number} value 변환할 숫자 값
 * @param {number} n 소수점 표시 갯수
 * @param {number} x ,쉼표를 표시할 숫자 단위
 * @return {string}
 */
declare const formatCurrency: (value: string | number, n?: number, x?: number) => string;
export default formatCurrency;
