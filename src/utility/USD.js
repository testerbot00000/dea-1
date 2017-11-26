const formatter = Intl.NumberFormat('en-US', {
  currency: 'USD',
  minimumFractionDigits: 2,
  style: 'currency'
});

module.exports = (num) => formatter.format(num);
