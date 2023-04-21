const Reader = require('./classes/Reader');
const Processor = require('./classes/Processor');
const Table = require('./classes/Table');
const HTMLParser = require('./classes/HTMLParser');
const Writer = require('./classes/Writer');
const PDFWriter = require('./classes/PDFWriter');

const reader = new Reader();
const writer = new Writer();

(async () => {
  const data = await reader.read('./users.csv');
  const processedData = Processor.process(data);
  const table = new Table(processedData);
  const html = await HTMLParser.parse(table);

  const fileName = Date.now();
  await writer.write(`${fileName}.html`, html);
  PDFWriter.write(`${fileName}.pdf`, html);
})();
