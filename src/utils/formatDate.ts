const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);
  const formattedDate = formatter.format(date);

  const [, month, day, weekday] = formattedDate.split(' ');

  return `${month} ${day} (${weekday.slice(0, 1)})`;
};

export default formatDate;
