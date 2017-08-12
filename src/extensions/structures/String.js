String.isNullOrWhiteSpace = function (input) {
  return typeof input !== 'string' || input.replace(/\s+/g, '').length === 0;
};

String.prototype.boldify = function () {
  return '**' + this.replace(/(\*|~|`)+/g, '').replace(/_/g, ' ') + '**';
};

String.prototype.upperFirstChar = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.format = function () {
  return this.replace(/{(\d+)}/g, function (match, number) {
    return typeof arguments[number] !== 'undefined' ? arguments[number] : match;
  });
};
