'use strict';

const functionParser = (func) => {
  if (!func) {
    return [];
  }

  const reg = new RegExp(/(.translate|getTranslation)[^(]*\(['"`]([^)]*)['"`]\)/g);
  const collection = [];

  let matches;

  /* eslint-disable no-cond-assign */
  while (matches = reg.exec(func)) {
      const res = matches[2].split('\\\'').join('\'');

			collection.push(res);
		}

	return collection;
  /* eslint-enable no-cond-assign */
};

module.exports = functionParser;
