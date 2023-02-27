function formatDate(created_at?: string) {
  if (created_at === '-') {
    return '-';
  }

  const { month, day, year, hours, minutes } = getFullDate();
  const abbreviatedMonth = abbreviateMonth(month);
  return `${abbreviatedMonth} ${day} ${year} às ${hours}:${minutes}`;
}

function getFullDate() {
  const { hours, minutes } = getHoursAndMinutes();
  const { year, month, day } = getYearMonthAndDay();

  return {
    hours,
    minutes,
    year,
    month,
    day,
  };
}

function getYearMonthAndDay() {
  const date = getDate();
  const dateAsArray = date?.split('-') ?? [];
  const [year, month, day] = dateAsArray;
  return { year, month, day };
}

function getHoursAndMinutes() {
  const time = getTime();
  const timeAsArray = time?.split(':') ?? [];
  const [hours, minutes] = timeAsArray;
  return { hours, minutes };
}

function getDate(created_at?: string) {
  return created_at?.slice(11, 16);
}

function getTime(created_at?: string) {
  return created_at?.slice(11, 16);
}

function abbreviateMonth(month: string) {
  const abbreviatedMonths: Record<string, string> = {
    '01': 'Ja',
    '02': 'Fev',
    '03': 'Mar',
    '04': 'Abr',
    '05': 'Maio',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Ago',
    '09': 'Set',
    '10': 'Out',
    '11': 'Nov',
    '12': 'Dez',
  };

  return abbreviatedMonths[month] ?? 'Não existe um mês correspondente';
}

export default formatDate;
