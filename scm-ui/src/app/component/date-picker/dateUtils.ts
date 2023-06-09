/**
 * material-ui dateUtils.js
 * https://github.com/callemall/material-ui/blob/master/src/DatePicker/dateUtils.js
 */
let localConfig = {
    dayAbbreviation: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    dayList: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    monthLongList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

export const dateTimeFormat = {
  formatDisplay (date) {
    var day = date.getDate()
    return `${localConfig.monthList[date.getMonth()]}-${day > 9 ? day : '0' + day} ${localConfig.dayList[date.getDay()]}`
  },
  formatMonth (date) {
    return `${date.getFullYear()} ${localConfig.monthLongList[date.getMonth()]}`
  },
  getWeekDayArray (firstDayOfWeek) {
    let beforeArray = []
    let afterArray = []
    const dayAbbreviation = localConfig.dayAbbreviation
    for (let i = 0; i < dayAbbreviation.length; i++) {
      if (i < firstDayOfWeek) {
        afterArray.push(dayAbbreviation[i])
      } else {
        beforeArray.push(dayAbbreviation[i])
      }
    }
    return beforeArray.concat(afterArray)
  }
}

export function getDaysInMonth (d) {
  const resultDate = getFirstDayOfMonth(d)

  resultDate.setMonth(resultDate.getMonth() + 1)
  resultDate.setDate(resultDate.getDate() - 1)

  return resultDate.getDate()
}

export function getFirstDayOfMonth (d) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function getWeekArray (d, firstDayOfWeek) {
  const dayArray = []
  const daysInMonth = getDaysInMonth(d)
  const weekArray = []
  let week = []

  for (let i = 1; i <= daysInMonth; i++) {
    dayArray.push(new Date(d.getFullYear(), d.getMonth(), i))
  }

  const addWeek = (week) => {
    const emptyDays = 7 - week.length
    for (let i = 0; i < emptyDays; ++i) {
      week[weekArray.length ? 'push' : 'unshift'](null)
    }
    weekArray.push(week)
  }

  dayArray.forEach((day) => {
    if (week.length > 0 && day.getDay() === firstDayOfWeek) {
      addWeek(week)
      week = []
    }
    week.push(day)
    if (dayArray.indexOf(day) === dayArray.length - 1) {
      addWeek(week)
    }
  })

  return weekArray
}

export function addDays (d, days) {
  const newDate = cloneDate(d)
  newDate.setDate(d.getDate() + days)
  return newDate
}

export function addMonths (d, months) {
  const newDate = cloneDate(d)
  newDate.setMonth(d.getMonth() + months)
  return newDate
}

export function addYears (d, years) {
  const newDate = cloneDate(d)
  newDate.setFullYear(d.getFullYear() + years)
  return newDate
}

export function cloneDate (d) {
  return new Date(d.getTime())
}

export function cloneAsDate (d) {
  const clonedDate = cloneDate(d)
  clonedDate.setHours(0, 0, 0, 0)
  return clonedDate
}

export function isBeforeDate (d1, d2) {
  const date1 = cloneAsDate(d1)
  const date2 = cloneAsDate(d2)

  return (date1.getTime() < date2.getTime())
}

export function isAfterDate (d1, d2) {
  const date1 = cloneAsDate(d1)
  const date2 = cloneAsDate(d2)

  return (date1.getTime() > date2.getTime())
}

export function isBetweenDates (dateToCheck, startDate, endDate) {
  return (!(isBeforeDate(dateToCheck, startDate)) &&
  !(isAfterDate(dateToCheck, endDate)))
}

export function isEqualDate (d1, d2) {
  return d1 && d2 &&
    (d1.getFullYear() === d2.getFullYear()) &&
    (d1.getMonth() === d2.getMonth()) &&
    (d1.getDate() === d2.getDate())
}

export function monthDiff (d1, d2) {
  let m
  m = (d1.getFullYear() - d2.getFullYear()) * 12
  m += d1.getMonth()
  m -= d2.getMonth()
  return m
}

export function yearDiff (d1, d2) {
  return ~~(monthDiff(d1, d2) / 12)
}
