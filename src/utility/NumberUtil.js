class NumberUtil {
  isEven(num) {
    return num % 2 === 0;
  }

  msToTime(input) {
    return {
      days: parseInt(input / (1000 * 60 * 60 * 24)),
      hours: parseInt(input / (1000 * 60 * 60) % 24),
      milliseconds: parseInt(input % 1000 / 100),
      minutes: parseInt(input / (1000 * 60) % 60),
      seconds: parseInt(input / 1000 % 60)
    };
  }

  pad(num, size) {
    let s = num.toString();

    while (s.length < size) {
      s = '0' + s;
    }

    return s;
  }
}

module.exports = new NumberUtil();
