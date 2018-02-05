import supportReactEs6Ts from './support-react-es6-ts';
import expressingLargeAmountData from './expressing-large-amount-data';
import formattingData from './formatting-data';
import frozenColumnRow from './frozen-column-row';
import multiColumnHeader from './multi-column-header';
import resizeColumn from './resize-column';
import sortingData from './sorting-data';
import filteringData from './filtering-data';
import inlineEdit from './inline-edit';
import eventCompatibility from './event';


let features = [
  {title:'Support React + ES6 + TS', Component: supportReactEs6Ts},
  {title:'Expressing large amounts of data', Component: expressingLargeAmountData},
  {title:'Formatting of data', Component: formattingData},
  {title:'Frozen column and row', Component: frozenColumnRow},
  {title:'Multi column header', Component: multiColumnHeader},
  {title:'Resize column', Component: resizeColumn},
  {title:'Sorting of data', Component: sortingData},
  {title:'Filtering of data', Component: filteringData},
  {title:'Inline edit', Component: inlineEdit},
  {title:'Browser event compatibility', Component: eventCompatibility}
];

export {
  features
};