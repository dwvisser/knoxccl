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

function nextThirdTuesday() {
  const now = new Date(Date.now());
  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();
  const thisMonthThirdTuesday = thirdTuesday(nowYear, nowMonth);
  return now <= thisMonthThirdTuesday ? thisMonthThirdTuesday :
    nextMonthThirdTuesday(nowYear, nowMonth);
}

function nextMonthThirdTuesday(nowYear, nowMonth) {
  const before_december = nowMonth < 11;
  const nextYear = before_december ? nowYear : nowYear + 1;
  const nextMonth = before_december ? nowMonth + 1 : 1;
  return thirdTuesday(nextYear, nextMonth);
}

exports.nextThirdTuesday = nextThirdTuesday;
