function formatDate(created_at?: string) {
  if (created_at === '-') {
    return '-';
  }

  const { month, day, year, hours, minutes } = getFullDate(created_at);
  const abbreviatedMonth = abbreviateMonth(month);
  return `${abbreviatedMonth} ${day} ${year} às ${hours}:${minutes}`;
}

function getFullDate(created_at?: string) {
  const { hours, minutes } = getHoursAndMinutes(created_at);
  const { year, month, day } = getYearMonthAndDay(created_at);

  return {
    hours,
    minutes,
    year,
    month,
    day,
  };
}

function getYearMonthAndDay(created_at?: string) {
  const date = getDate(created_at);
  const dateAsArray = date?.split('-') ?? [];
  const [year, month, day] = dateAsArray;
  return { year, month, day };
}

function getHoursAndMinutes(created_at?: string) {
  const time = getTime(created_at);
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
