class Random {
  nextInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  nextFloat(min, max) {
    return this.nextInt(min * 100, (max * 100) + 1) / 100;
  }

  roll() {
    return this.nextFloat(0, 100);
  }

  arrayElement(array) {
    return array[this.nextInt(0, array.length)];
  }

  weighted(arr, prop, sum) {
    const r = this.nextInt(0, sum + 1);
    let cumulative = 0;

    for (let i = 0; i < arr.length; i++) {
      cumulative += arr[i][prop];

      if (r <= cumulative) {
        return arr[i];
      }
    }
  }
}

module.exports = new Random();
