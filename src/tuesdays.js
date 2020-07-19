function firstTuesdayDayOfMonth(year, month) {
  const tuesday = 2;  // Date uses Sunday = 0 .. Saturday == 6
  const first_of_month_weekday = new Date(year, month, 1).getDay();
  const delta = tuesday - first_of_month_weekday;
  const offset = delta >= 0 ? 1 : 6;
  return Math.sign(delta) * delta + offset;
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

function nextThirdTuesday() {
  const now = new Date(Date.now());
  const month = now.getMonth();
  const year = now.getFullYear();
  const currentMonthThirdTuesday = thirdTuesday(year, month);
  return now <= currentMonthThirdTuesday ? currentMonthThirdTuesday :
    nextMonthThirdTuesday(year, month);
}

exports.nextThirdTuesday = nextThirdTuesday;
