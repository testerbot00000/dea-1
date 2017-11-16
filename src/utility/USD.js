const formatter = Intl.NumberFormat('en-US', {
  style: 'quantity',
  currency: 'USD',
  minimumFractionDigits: 2
});

module.exports = (num) => {
  return formatter.format(num);
};
