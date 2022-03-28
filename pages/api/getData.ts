// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface IDataItem {
  value: Record<string, any>;
}
interface Data {
  list: IDataItem[];
  page: any;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({
    list: [
      {
        value: {
          id: 1,
          title: 'Think like a man of action and act like man of thought.',
          writer: 'Thomas',
          date: '2017-12-05',
          price: 39000,
          qty: 2,
          money: 120000,
        },
      },
      {
        value: {
          id: 2,
          title:
            'Courage is very important. Like a muscle, it is strengthened by use.',
          writer: 'Sofia',
          date: '2017-11-10',
          price: 39000,
          qty: 2,
          money: 18000,
        },
      },
      {
        value: {
          id: 3,
          title:
            'Life is the art of drawing sufficient conclusions from insufficient premises.',
          writer: 'Mondo',
          date: '2017-11-21',
          price: 39000,
          qty: 2,
          money: 12000000,
        },
      },
      {
        value: {
          id: 4,
          title: 'By doubting we come at the truth.',
          writer: 'Brant',
          date: '2017-09-08',
          price: 39000,
          qty: 2,
          money: 59000,
        },
      },
      {
        value: {
          id: 5,
          title:
            'A man that hath no virtue in himself, ever envieth virtue in others.',
          writer: 'Louis',
          date: '2017-09-28',
          price: 39000,
          qty: 2,
          money: 100000,
        },
      },
      {
        value: {
          id: 6,
          title: 'When money speaks, the truth keeps silent.',
          writer: 'Paul',
          date: '2017-12-21',
          price: 39000,
          qty: 2,
          money: 50000,
        },
      },
      {
        value: {
          id: 7,
          title: 'Better the last smile than the first laughter.',
          writer: 'Tiffany',
          date: '2017-03-30',
          price: 39000,
          qty: 2,
          money: 60000,
        },
      },
      {
        value: {
          id: 8,
          title:
            'In the morning of life, work; in the midday, give counsel; in the evening, pray.',
          writer: 'Louis',
          date: '2017-05-08',
          price: 39000,
          qty: 2,
          money: 70000,
        },
      },
      {
        value: {
          id: 9,
          title: 'Painless poverty is better than embittered wealth.',
          writer: 'Paul',
          date: '2017-04-28',
          price: 39000,
          qty: 2,
          money: 90000,
        },
      },
      {
        value: {
          id: 10,
          title: 'A poet is the painter of the soul.',
          writer: 'Tiffany',
          date: '2017-06-06',
          price: 39000,
          qty: 2,
          money: 500000,
        },
      },
      {
        value: {
          id: 11,
          title: 'Error is the discipline through which we advance.',
          writer: 'Benjamin',
          date: '2017-06-22',
          price: 39000,
          qty: 2,
          money: 6000000,
        },
      },
      {
        value: {
          id: 12,
          title: 'Faith without deeds is useless.',
          writer: 'June',
          date: '2017-11-14',
          price: 39000,
          qty: 2,
          money: 78000,
        },
      },
      {
        value: {
          id: 13,
          title: 'Weak things united become strong.',
          writer: 'Cherry',
          date: '2017-01-01',
          price: 39000,
          qty: 2,
          money: 67000,
        },
      },
      {
        value: {
          id: 14,
          title: 'We give advice, but we cannot give conduct.',
          writer: 'Bell',
          date: '2017-02-28',
          price: 39000,
          qty: 2,
          money: 1200000,
        },
      },
      {
        value: {
          id: 15,
          title:
            'Nature never deceives us; it is always we who deceive ourselves.',
          writer: 'Julia',
          date: '2017-08-08',
          price: 39000,
          qty: 2,
          money: 10000,
        },
      },
      {
        value: {
          id: 16,
          title: 'Think like a man of action and act like man of thought.',
          writer: 'Thomas',
          date: '2017-03-08',
          price: 39000,
          qty: 2,
          money: 890000,
        },
      },
      {
        value: {
          id: 17,
          title:
            'Courage is very important. Like a muscle, it is strengthened by use.',
          writer: 'Sofia',
          date: '2017-04-14',
          price: 39000,
          qty: 2,
          money: 620000,
        },
      },
      {
        value: {
          id: 18,
          title:
            'Life is the art of drawing sufficient conclusions from insufficient premises.',
          writer: 'Mondo',
          date: '2017-04-23',
          price: 39000,
          qty: 2,
          money: 67000,
        },
      },
      {
        value: {
          id: 19,
          title: 'By doubting we come at the truth.',
          writer: 'Brant',
          date: '2017-09-03',
          price: 39000,
          qty: 2,
          money: 180000,
        },
      },
      {
        value: {
          id: 20,
          title:
            'A man that hath no virtue in himself, ever envieth virtue in others.',
          writer: 'Louis',
          date: '2017-07-02',
          price: 39000,
          qty: 2,
          money: 570000,
        },
      },
      {
        value: {
          id: 21,
          title: 'When money speaks, the truth keeps silent.',
          writer: 'Paul',
          date: '2017-08-17',
          price: 39000,
          qty: 2,
          money: 210000,
        },
      },
      {
        value: {
          id: 22,
          title: 'Better the last smile than the first laughter.',
          writer: 'Tiffany',
          date: '2017-07-10',
          price: 39000,
          qty: 2,
          money: 16000,
        },
      },
      {
        value: {
          id: 23,
          title:
            'In the morning of life, work; in the midday, give counsel; in the evening, pray.',
          writer: 'Louis',
          date: '2017-08-12',
          price: 39000,
          qty: 2,
          money: 89000,
        },
      },
      {
        value: {
          id: 24,
          title: 'Painless poverty is better than embittered wealth.',
          writer: 'Paul',
          date: '2017-04-01',
          price: 39000,
          qty: 2,
          money: 45000,
        },
      },
      {
        value: {
          id: 25,
          title: 'A poet is the painter of the soul.',
          writer: 'Tiffany',
          date: '2017-05-21',
          price: 39000,
          qty: 2,
          money: 6000,
        },
      },
      {
        value: {
          id: 26,
          title: 'Error is the discipline through which we advance.',
          writer: 'Benjamin',
          date: '2017-10-24',
          price: 39000,
          qty: 2,
          money: 990000,
        },
      },
      {
        value: {
          id: 27,
          title: 'Faith without deeds is useless.',
          writer: 'June',
          date: '2017-11-07',
          price: 39000,
          qty: 2,
          money: 100000,
        },
      },
      {
        value: {
          id: 28,
          title: 'Weak things united become strong.',
          writer: 'Cherry',
          date: '2017-10-06',
          price: 39000,
          qty: 2,
          money: 50000,
        },
      },
      {
        value: {
          id: 29,
          title: 'We give advice, but we cannot give conduct.',
          writer: 'Bell',
          date: '2017-05-01',
          price: 39000,
          qty: 2,
          money: 28000,
        },
      },
      {
        value: {
          id: 30,
          title:
            'Nature never deceives us; it is always we who deceive ourselves.',
          writer: 'Julia',
          date: '2017-03-24',
          price: 39000,
          qty: 2,
          money: 360000,
        },
      },
    ],
    page: {},
  });
}
