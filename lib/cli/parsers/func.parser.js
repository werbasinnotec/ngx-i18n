'use strict';

const ts = require('typescript');

const functionParser = (func) => {
  if (!func) {
    throw new Error('Function is called without template');
  }

  const reg = new RegExp(/.translate[^(]*\(\'([^)]*)\'\)/g);
  const collection = [];

  let matches;

  while (matches = reg.exec(func)) {
      const res = matches[1].split('\\\'').join('\'');

			collection.push(res);
		}

	return collection;
};

module.exports = functionParser;
