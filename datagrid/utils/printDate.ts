import { padLeft, isDate } from './common';

const token =
  /d{1,4}|E{1,4}|M{1,4}|yy(?:yy)?|([HhmsAa])\1?|[LloSzWN]|"[^"]*"|'[^']*'/g;
const timezone =
  /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
const timezoneClip = /[^-+\dA-Z]/g;

function right(str: string, pos: number): string {
  return str.slice(str.length - pos);
}

function localDate(
  yy: number,
  mm: number,
  dd: number,
  hh?: number,
  mi?: number,
  ss?: number,
) {
  let _ud;
  if (mm < 0) {
    mm = 0;
  }
  if (typeof hh === 'undefined') {
    hh = 12;
  }
  if (typeof mi === 'undefined') {
    mi = 0;
  }
  _ud = new Date(Date.UTC(yy, mm, dd || 1, hh, mi, ss || 0));
  if (
    mm === 0 &&
    dd === 1 &&
    _ud.getUTCHours() + _ud.getTimezoneOffset() / 60 < 0
  ) {
    _ud.setUTCHours(0);
  } else {
    _ud.setUTCHours(_ud.getUTCHours() + _ud.getTimezoneOffset() / 60);
  }
  return _ud;
}

function getWeek(date: Date): number {
  // https://github.com/felixge/node-dateformat
  let targetThursday: Date, firstThursday: Date, ds: number, weekDiff: number;

  // Remove time components of date
  targetThursday = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  // Change date to Thursday same week
  targetThursday.setDate(
    targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3,
  );

  // Take January 4th as it is always in week 1 (see ISO 8601)
  firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

  // Change date to Thursday same week
  firstThursday.setDate(
    firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3,
  );

  // Check if daylight-saving-time-switch occurred and correct for it
  ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours(targetThursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  weekDiff =
    (targetThursday.getTime() - firstThursday.getTime()) / (86400000 * 7);

  return 1 + Math.floor(weekDiff);
}

function getDayOfWeek(date: Date): number {
  // https://github.com/felixge/node-dateformat
  let dow = date.getDay();
  if (dow === 0) {
    dow = 7;
  }
  return dow;
}

export class PrintDate {
  static i18n: any = {
    dayNames: [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    monthNames: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    timeNames: ['a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'],
  };
  currDate: Date;

  static setI18n(i18n: any) {
    return (PrintDate.i18n = { ...PrintDate.i18n, ...i18n });
  }

  // 기준일자

  constructor() {
    this.currDate = new Date();
  }

  setDate(date: any) {
    let currDate: Date = new Date();
    let yy, mm, dd, hh, mi, ss, aDateTime, aTimes, aTime, aDate, va;
    const ISO_8601 =
      /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i;
    const ISO_8601_FULL =
      /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

    if (typeof date === 'string') {
      if (date.length > 15) {
        if (ISO_8601_FULL.test(date) || ISO_8601.test(date)) {
          currDate = new Date(date);
        } else {
          aDateTime = date.split(/ /g);
          aDate = aDateTime[0].split(/\D/g);
          yy = Number(aDate[0]);
          mm = Number(aDate[1]);
          dd = Number(aDate[2]);
          aTime = aDateTime[1] || '09:00:00';
          aTimes = aTime.substring(0, 8).split(':');
          hh = Number(aTimes[0]);
          mi = Number(aTimes[1]);
          ss = Number(aTimes[2]);

          if (right(aTime, 2) === 'AM' || right(aTime, 2) === 'PM') {
            hh += 12;
          }
          currDate = localDate(yy, mm - 1, dd, hh, mi, ss);
        }
      } else if (date.length === 14) {
        va = date.replace(/\D/g, '');
        currDate = localDate(
          Number(va.slice(0, 4)),
          Number(va.slice(4, 2)) - 1,
          Number(va.slice(6, 2)),
          Number(va.slice(8, 2)),
          Number(va.slice(10, 2)),
          Number(va.slice(12, 2)),
        );
      } else if (date.length > 7) {
        va = date.replace(/\D/g, '');
        currDate = localDate(
          Number(va.slice(0, 4)),
          Number(va.slice(4, 2)) - 1,
          Number(va.slice(6, 2)),
        );
      } else if (date.length > 4) {
        va = date.replace(/\D/g, '');
        currDate = localDate(
          Number(va.slice(0, 4)),
          Number(va.slice(4, 2)) - 1,
          1,
        );
      } else if (date.length > 2) {
        va = date.replace(/\D/g, '');
        currDate = localDate(
          Number(va.slice(0, 4)),
          Number(va.slice(4, 2)) - 1,
          1,
        );
      } else {
        currDate = new Date();
      }
    } else if (isDate(date)) {
      currDate = date;
    }

    this.currDate = currDate;

    return this;
  }

  print(format?: string, utc?: boolean, gmt?: boolean) {
    if (typeof format === 'undefined') {
      return this.currDate;
    }

    const date = this.currDate as any;
    const _get: string = utc ? 'getUTC' : 'get';

    let formatSlice = format.slice(0, 4);
    if (formatSlice === 'UTC:' || formatSlice === 'GMT:') {
      format = format.slice(4);
      utc = true;
      gmt = formatSlice === 'GMT:';
    }

    let d: number = date[_get + 'Date']();
    let D: number = date[_get + 'Day']();
    let M: number = date[_get + 'Month']();
    let y: number = date[_get + 'FullYear']();
    let H: number = date[_get + 'Hours']();
    let m: number = date[_get + 'Minutes']();
    let s: number = date[_get + 'Seconds']();
    let L: number = date[_get + 'Milliseconds']();
    let o: number = utc ? 0 : date.getTimezoneOffset();
    let W: number = getWeek(date);
    let N: number = getDayOfWeek(date);
    let flags = {
      d: d,
      dd: padLeft(d),
      E: PrintDate.i18n.dayNames[D].slice(0, 1),
      EEE: PrintDate.i18n.dayNames[D],
      EEEE: PrintDate.i18n.dayNames[D + 7],
      M: M + 1,
      MM: padLeft(M + 1),
      MMM: PrintDate.i18n.monthNames[M],
      MMMM: PrintDate.i18n.monthNames[M + 12],
      yy: String(y).slice(2),
      yyyy: y,
      h: H % 12 || 12,
      hh: padLeft(H % 12 || 12),
      H: H,
      HH: padLeft(H),
      m: m,
      mm: padLeft(m),
      s: s,
      ss: padLeft(s),
      l: padLeft(L, 3),
      L: padLeft(Math.round(L / 10)),
      a: H < 12 ? PrintDate.i18n.timeNames[0] : PrintDate.i18n.timeNames[1],
      aa: H < 12 ? PrintDate.i18n.timeNames[2] : PrintDate.i18n.timeNames[3],
      A: H < 12 ? PrintDate.i18n.timeNames[4] : PrintDate.i18n.timeNames[5],
      AA: H < 12 ? PrintDate.i18n.timeNames[6] : PrintDate.i18n.timeNames[7],
      z: gmt
        ? 'GMT'
        : utc
        ? 'UTC'
        : ((String(date).match(timezone) || ['']).pop() || '').replace(
            timezoneClip,
            '',
          ),
      o:
        (o > 0 ? '-' : '+') +
        padLeft(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4),
      S: ['th', 'st', 'nd', 'rd'][
        d % 10 > 3 ? 0 : (((d % 100) - (d % 10) !== 10 ? 1 : 0) * d) % 10
      ],
      W: W,
      N: N,
    };

    return ('' + format).replace(token, function (match) {
      if (match in flags) {
        return (flags as any)[match];
      }
      return match.slice(1, match.length - 1);
    });
  }
}

export function printDate(d: any, format: string) {
  return new PrintDate().setDate(d).print(format);
}
