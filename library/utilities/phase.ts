import moment from 'moment'

type TPhase = (date: string | Date, format?: string) => string | Date

const phase: TPhase = (date, format) => {
  date = moment(date).format()
  if (!format) return moment(date).format('LL')
  if (format === 'iso') return new Date(date).toISOString()
  return moment(date).format(format)
}

export default phase
