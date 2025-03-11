
import path from 'path';
import DataUriParser from 'datauri/parser.js';

const getDataUri = (file) => {
  const parser = new DataUriParser();
  console.log(file.originalname)
  const extName = path.extname(file.originalname).toString();
  console.log(extName)
  //console.log(parser.format(extName,file.buffer))
  return parser.format(extName, file.buffer);
};

export default getDataUri
