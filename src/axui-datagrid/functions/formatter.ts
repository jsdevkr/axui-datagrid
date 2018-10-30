import { printDate, formatCurrency } from '../utils';
import { IDataGridFormatterData } from '../common/@types';

function money(formatterData: IDataGridFormatterData) {
  if (typeof formatterData.value !== 'undefined') {
    const dotIndex = ('' + formatterData.value).indexOf('.');
    return formatCurrency(
      formatterData.value,
      dotIndex > 0 ? ('' + formatterData.value).length - 1 - dotIndex : 0,
    );
  } else {
    return '';
  }
}

function date(formatterData: IDataGridFormatterData) {
  if (typeof formatterData.value !== 'undefined') {
    return printDate(formatterData.value, 'yyyy-MM-dd');
  } else {
    return '';
  }
}
function datetime(formatterData: IDataGridFormatterData) {
  if (typeof formatterData.value !== 'undefined') {
    return printDate(formatterData.value, 'yyyy-MM-dd hh:mm:ss');
  } else {
    return '';
  }
}

export default { money, date, datetime };
