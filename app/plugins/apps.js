import React from 'react';
import fs from 'fs';
import fuzzySearch from '../lib/fuzzySearch';
import shellCommand from '../lib/shellCommand';

const APPS_PATH = '/Applications';

//TODO: read icons
const appsPlugin = (term, callback) => {
  fs.readdir(APPS_PATH, (err, items) => {
    const result = fuzzySearch(items, term).filter(file =>
      file.match(/\.app$/)
    ).map(file => {
      const path = [APPS_PATH, file].join('/');
      const shellPath = path.replace(/ /g, '\\ ');
      const title = file.replace(/\.app$/, '');
      return {
        title,
        term: title,
        id: path,
        subtitle: path,
        onSelect: shellCommand.bind(this, `open ${shellPath}`),
      };
    });
    callback(term, result);
  });
}

export default {
  fn: appsPlugin,
}
