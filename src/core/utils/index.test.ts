import { formatDate, formatTime, getDayName, timeAgo } from './index'

describe('utils', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const dateString = '2023-10-15T00:00:00'
      expect(formatDate(dateString)).toBe('15 Eki 2023')
    })
  })

  describe('formatTime', () => {
    it('formats time correctly', () => {
      expect(formatTime('14:30')).toBe('14:30')
    })
  })

  describe('getDayName', () => {
    it('returns correct day name', () => {
      expect(getDayName('monday')).toBe('Pazartesi')
      expect(getDayName('sunday')).toBe('Pazar')
    })
  })

  describe('timeAgo', () => {
    it('returns correct time ago string', () => {
      const now = new Date()
      const oneHourAgo = new Date(now.getTime() - 3600000)
      expect(timeAgo(oneHourAgo.toISOString())).toBe('1 saat önce')
    })
  })
})
