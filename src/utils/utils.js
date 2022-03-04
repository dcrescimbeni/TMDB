export const numberToCurrency = (number) => {
  if (isNaN(number)) return false;
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return formatter.format(number);
};

export const minutesToHHMM = (totalMinutes) => {
  if (isNaN(totalMinutes)) return false;
  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;

  if (minutes < 10) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
};
