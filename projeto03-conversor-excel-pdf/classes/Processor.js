class Processor {
  static process(data) {
    const a = data.split('\r\n');
    const rows = [];

    a.forEach(row => {
      const arr = row.split(',');
      rows.push(arr);
    });

    return rows;
  }
}

module.exports = Processor;
