import React from 'react';
import fs from 'fs';
import search from 'lib/search';
import shellCommand from 'lib/shellCommand';
import { readDir } from 'lib/rpc/functions';
import getPreview from './getPreview';
import { shell } from 'electron';

const DIR_REGEXP = /^\/(.*\/)*(.*)/;
const HOME_DIR_REGEXP = /^~/;
const USER_PATH = `/Users/${process.env.USER}`;

/**
 * Do not show some files in results, i.e. system files
 *
 * @param  {String} fileName
 * @return {Boolean}
 */
const ignoreFile = (fileName) => (
  fileName.match(/^\./)
);

/**
 * Plugin to look and display local and external IPs
 * @param  {String} term
 */
const filesPlugin = (term, callback) => {
  let path = term;
  let replaceHomePath = false;
  if (path.match(HOME_DIR_REGEXP)) {
    path = path.replace(HOME_DIR_REGEXP, USER_PATH);
    replaceHomePath = true;
  }
  const match = path.match(DIR_REGEXP);
  if (match) {
    const dir = match[1] ? `/${match[1]}` : '/';
    const fileName = match[2];
    readDir(dir).then(files =>
      fileName ? search(files, fileName) : files
    ).then(files => {
      const result = [];
      files.forEach(file => {
        if (ignoreFile(file)) return;
        let filePath = [dir, file].join('');
        let autocomplete = replaceHomePath ? filePath.replace(USER_PATH, '~') : filePath;
        result.push({
          id: filePath,
          title: file,
          subtitle: filePath,
          clipboard: filePath,
          term: autocomplete,
          icon: filePath,
          onKeyDown: (event) => {
            if (event.metaKey && event.keyCode === 82) {
              shell.showItemInFolder(filePath);
              event.preventDefault();
            }
          },
          onSelect: shellCommand.bind(null, `open ${filePath}`),
          getPreview: getPreview.bind(null, filePath)
        });
      });
      callback(result);
    });
  }
};

export default {
  fn: filesPlugin,
};
