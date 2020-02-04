import moment, { Moment } from 'moment'

export enum MomentFormatEnum {
  YYYY_MM_DD = 'YYYY-MM-DD',
  YYYY_MM_DD_HH_MM_SS = 'YYYY-MM-DD HH:mm:ss',
}



export const todayMoment = moment()
export const lastDayMoment = moment().subtract(1, 'days')
export const last3DayMoment = moment().subtract(3, 'days')
export const last7DayMoment = moment().subtract(7, 'days')
export const last15DayMoment = moment().subtract(15, 'days')
export const last30DayMoment = moment().subtract(30, 'days')
export const last60DayMoment = moment().subtract(60, 'days')

export const last60DaysMoment = [last60DayMoment, lastDayMoment]
export const last30DaysMoment = [last30DayMoment, lastDayMoment]
export const last15DaysMoment = [last15DayMoment, lastDayMoment]
export const last7DaysMoment = [last7DayMoment, lastDayMoment]
export const last3DaysMoment = [last3DayMoment, lastDayMoment]

export { moment, Moment }