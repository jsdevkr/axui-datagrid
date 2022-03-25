import * as React from 'react';
import { printDate, formatCurrency } from '../utils';
import { IDataGrid } from '../common/@types';

function money(formatterData: IDataGrid.IFormatterData) {
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

function date(formatterData: IDataGrid.IFormatterData) {
  if (typeof formatterData.value !== 'undefined') {
    return printDate(formatterData.value, 'yyyy-MM-dd');
  } else {
    return '';
  }
}
function datetime(formatterData: IDataGrid.IFormatterData) {
  if (typeof formatterData.value !== 'undefined') {
    return printDate(formatterData.value, 'yyyy-MM-dd hh:mm:ss');
  } else {
    return '';
  }
}

function html(formatterData: IDataGrid.IFormatterData) {
  if (typeof formatterData.value !== 'undefined') {
    return (
      <span
        dangerouslySetInnerHTML={(() => ({
          __html: formatterData.value,
        }))()}
      />
    );
  } else {
    return '';
  }
}

export default { money, date, datetime, html };
