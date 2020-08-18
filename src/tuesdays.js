function firstTuesdayDayOfMonth(year, month) {
  const tuesday = 2;  // Date uses Sunday = 0 .. Saturday == 6
  for (let date = 1; date <= 7; date++) {
    const weekday = new Date(year, month, date).getDay();
    if (weekday == tuesday) {
      return date;
    }
  }
}

function thirdTuesday(year, month) {
  return new Date(year, month, firstTuesdayDayOfMonth(year, month) + 14)
}

function nextMonthThirdTuesday(year, month) {
    const before_december = month < 11;
    const nextMonthYear = before_december ? year : year + 1;
    const nextMonth = before_december ? month + 1 : 1;
    return thirdTuesday(nextMonthYear, nextMonth);
  }

function todayMidnight() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function nextThirdTuesday() {
  const today = todayMidnight();
  const year = today.getFullYear();
  const month = today.getMonth();
  const currentMonthThirdTuesday = thirdTuesday(year, month);
  return today <= currentMonthThirdTuesday ? currentMonthThirdTuesday :
    nextMonthThirdTuesday(year, month);
}

exports.nextThirdTuesday = nextThirdTuesday;
