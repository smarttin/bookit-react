import titleize from 'titleize';
import moment from 'moment';

export const rentalType = isShared => isShared ? 'Shared' : 'Entire'

export const toUppercase = value => value ? titleize(value) : ''

export const pretifyDate = date => moment(date).format('YYYY-MM-DD')

export const getRangeOfDates = (startAt, endAt, dateFormat = 'YYYY-MM-DD') => {
  const tempDates = [];
  const mEndAt = moment(endAt);
  let mStartAt = moment(startAt);

  while (mStartAt < mEndAt) {
    tempDates.push(mStartAt.format(dateFormat));
    mStartAt = mStartAt.add(1, 'day');
  }

  tempDates.push(mEndAt.format(dateFormat));

  return tempDates;
}
