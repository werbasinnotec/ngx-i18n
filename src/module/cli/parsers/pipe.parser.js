'use strict';

const pipeParser = (template) => {
  if (!template) {
    throw new Error('Function is called without template');
  }

  const reg = new RegExp(/(['"`])((?:(?!\1).|\\\1)+)\1\s*\|\s*i18n_translate/g);
  const collection = [];
  let matches;

  /* eslint-disable no-cond-assign */
  while (matches = reg.exec(template)) {
			collection.push(matches[2].split('\\\'').join('\''));
		}

	return collection;
  /* eslint-enable no-cond-assign */
};

module.exports = pipeParser;
