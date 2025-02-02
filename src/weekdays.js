// const Sunday = 0
// const Monday = 1
const Tuesday = 2
const Wednesday = 3
// const Thurday = 4
// const Friday = 5
// const Saturday = 6

function firstSpecificWeekdayOfMonth(year, month, desired_weekday) {
  // @param weekday (int) as return by Date.getDay(), constants provided above
  for (let date = 1; date <= 7; date++) {
    const weekday = new Date(year, month, date).getDay();
    if (weekday == desired_weekday) {
      return date;
    }
  }
}

function todayMidnight() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function nthSpecificWeekday(n, year, month, desired_weekday) {
  return new Date(year, month, firstSpecificWeekdayOfMonth(year, month, desired_weekday) + (n - 1) * 7)
}

function nextMonthNthSpecificWeekday(n, this_year, this_month, desired_weekday) {
  const before_december = this_month < 11;
  const nextMonthYear = before_december ? this_year : this_year + 1;
  const nextMonth = before_december ? this_month + 1 : 0;
  return nthSpecificWeekday(n, nextMonthYear, nextMonth, desired_weekday);
}

function nextNthSpecificWeekday(n, desired_weekday) {
  // @param n (int) expected to be 1 to 4, meaning 1st to 5th of the desired weekday
  // of this month; yes, 5 is possible, but this is function is for guareanteed-to-exist
  // typical use cases like "patch tuesday" or "third Wednesday of month"
  const today = todayMidnight();
  const year = today.getFullYear();
  const month = today.getMonth();
  currentMonthNthSpecificWeekday = nthSpecificWeekday(n, year, month, desired_weekday);
  return today <= currentMonthNthSpecificWeekday ? currentMonthNthSpecificWeekday :
    nextMonthNthSpecificWeekday(year, year, month, desired_weekday);
}

function nextThirdTuesday() {
  const third = 3;
  return nextNthSpecificWeekday(third, Tuesday)
}

function nextThirdWednesday() {
  const third = 3;
  return nextNthSpecificWeekday(third, Wednesday)
}

exports.nextThirdTuesday = nextThirdTuesday;
exports.nextThirdWednesday = nextThirdWednesday;
