import { types } from '../stores';
import { printDate } from '../utils';

function money(formatterData: types.DataGridFormatterData) {
  if (typeof formatterData.value !== 'undefined') {
    let val = ('' + formatterData.value).replace(/[^0-9^\.^\-]/g, ''),
      regExpPattern = new RegExp('([0-9])([0-9][0-9][0-9][,.])'),
      arrNumber = val.split('.');

    arrNumber[0] += '.';

    do {
      arrNumber[0] = arrNumber[0].replace(regExpPattern, '$1,$2');
    } while (regExpPattern.test(arrNumber[0]));

    return arrNumber.length > 1
      ? arrNumber[0] + arrNumber[1].substr(0, 2)
      : arrNumber[0].split('.')[0];
  } else {
    return '';
  }
}

function date(formatterData: types.DataGridFormatterData) {
  return printDate(formatterData.value, 'yyyy-MM-dd');
}
function datetime(formatterData: types.DataGridFormatterData) {
  return printDate(formatterData.value, 'yyyy-MM-dd hh:mm:ss');
}

export default { money, date, datetime };
