const fs = require('fs/promises');

class Reader {
  async read(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf-8');

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Reader;
