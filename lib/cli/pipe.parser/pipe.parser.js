'use strict';

const pipeParser = (template) => {
  const reg = new RegExp(/(['"`])((?:(?!\1).|\\\1)+)\1\s*\|\s*i18n.translate/g);
  let collection = [];
  let matches;

  while (matches = reg.exec(template)) {
			collection.push(matches[2].split('\\\'').join('\''));
		}

	return collection
};

module.exports = pipeParser;
