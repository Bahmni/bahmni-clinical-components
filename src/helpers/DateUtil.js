import moment from 'moment';

export class DateUtil {
  static dateFormat(date = new Date(Date.now())) {
    return moment(date).format('DD MMM YY');
  }

  static dateWithoutTime(date = new Date(Date.now())) {
    console.log('mome------', date,moment(date).toDate());
    return moment(date).startOf('day').toDate();
  }
}
