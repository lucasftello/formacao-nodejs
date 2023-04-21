const pdf = require('html-pdf');

class PDFWriter {
  static write(fileName, html) {
    pdf.create(html).toFile(fileName, error => {});
  }
}

module.exports = PDFWriter;
