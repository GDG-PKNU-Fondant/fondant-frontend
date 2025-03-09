const formatPeopleCount = (count: number): string => {
  if (count >= 10000) {
    const formattedCount =
      count >= 100000
        ? Math.floor(count / 10000)
        : Math.floor(count / 1000) / 10;
    return `${formattedCount}만`;
  }
  return new Intl.NumberFormat().format(count);
};

export default formatPeopleCount;
