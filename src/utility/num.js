const formatter = Intl.NumberFormat('en-US');

module.exports = (num) => formatter.format(num);
