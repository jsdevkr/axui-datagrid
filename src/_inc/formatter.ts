import { cdate } from './utils';

/**
 *
 * @param {iFormatterData} data
 * @return {string}
 */
export function money( data: iFormatterData ): string {
  if ( typeof data.value !== 'undefined' ) {
    let val           = ('' + data.value).replace( /[^0-9^\.^\-]/g, '' ),
        regExpPattern = new RegExp( '([0-9])([0-9][0-9][0-9][,.])' ),
        arrNumber     = val.split( '.' );

    arrNumber[ 0 ] += '.';

    do {
      arrNumber[ 0 ] = arrNumber[ 0 ].replace( regExpPattern, '$1,$2' );
    } while ( regExpPattern.test( arrNumber[ 0 ] ) );

    return (arrNumber.length > 1) ? arrNumber[ 0 ] + arrNumber[ 1 ].substr( 0, 2 ) : arrNumber[ 0 ].split( '.' )[ 0 ];
  } else {
    return '';
  }
}

/**
 *
 * @param {iFormatterData} data
 * @return {string}
 */
export function date( data: iFormatterData ): string {
  return cdate( data.value, { 'return': 'yyyy-MM-dd' } );
}

/**
 *
 * @param {iFormatterData} data
 * @return {string}
 */
export function datetime( data: iFormatterData ): string {
  return cdate( data.value, { 'return': 'yyyy-MM-dd hh:mm:ss' } );
}

/**
 *
 */
export function getAll() {
  return {
    money, date
  }
}