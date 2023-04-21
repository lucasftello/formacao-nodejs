const fs = require('fs/promises');

class Writer {
  async write(fileName, data) {
    try {
      await fs.writeFile(fileName, data);

      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Writer;
