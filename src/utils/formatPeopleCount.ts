const formatPeopleCount = (reviewer: number): string => {
  if (reviewer >= 1000) {
    if (reviewer >= 10000) {
      return reviewer >= 100000
        ? `${Math.floor(reviewer / 10000)}만`
        : `${Math.floor(reviewer / 1000) / 10}만`;
    }
    return `${Math.floor(reviewer / 100) / 10}천`;
  }
  return new Intl.NumberFormat().format(reviewer);
};

export default formatPeopleCount;