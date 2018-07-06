import * as plugins from '../plugins/';

import {
 UPDATE_TERM,
 MOVE_CURSOR,
 SELECT_ELEMENT,
 SHOW_RESULT,
 RESET,
} from '../constants/actionTypes';


/**
 * Pass search term to all plugins and handle their results
 * @param {String} term Search tem
 * @param {Function} callback Callback function that receives used search term and found results
 */
const eachPlugin = (term, callback) => {
  // TODO: somehow set priority to plugins
  Object.keys(plugins).forEach((name) => {
    plugins[name].fn(term, callback);
  });
};


/**
 * Handle results found by plugin
 *
 * @param  {String} term Search term that was used for found results
 * @param  {Array or Object} payload Found results (or result)
 * @return {Object}  redux action
 */
function onResultFound(term, payload) {
  const result = Array.isArray(payload) ? payload : [payload];
  return {
    type: SHOW_RESULT,
    payload: {
      result,
      term,
    }
  };
}


/**
 * Action that clears everthing in search box
 *
 * @return {Object}  redux action
 */
export function reset() {
  return {
    type: RESET,
  };
}

/**
 * Action that updates search term
 *
 * @param  {String} term
 * @return {Object}  redux action
 */
export function updateTerm(term) {
  if (term === '') {
    return reset();
  }
  return (dispatch) => {
    dispatch({
      type: UPDATE_TERM,
      payload: term,
    });
    eachPlugin(term, (...args) => dispatch(onResultFound(...args)));
  };
}

/**
 * Action to move highlighted cursor to next or prev element
 * @param  {Integer} diff 1 or -1
 * @return {Object}  redux action
 */
export function moveCursor(diff) {
  return {
    type: MOVE_CURSOR,
    payload: diff
  };
}

/**
 * Action to change highlighted element
 * @param  {Integer} index of new highlighted element
 * @return {Object}  redux action
 */
export function selectElement(index) {
  return {
    type: SELECT_ELEMENT,
    payload: index
  };
}
