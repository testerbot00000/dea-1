const formatter = Intl.NumberFormat('en-US');

module.exports = (num) => {
  return formatter.format(num);
};
