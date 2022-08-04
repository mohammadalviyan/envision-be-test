import _ from 'lodash';

/**
 * Checks value to determine whether a default value should be returned in its place.
 * The defaultValue is returned if value is NaN, null, empty, or undefined.
 * Using lodash isEmpty to with check the empty value.
 *
 * @param {*} value
 * @param {*} defaultValue
 */
export const defaultToIfEmpty = (value, defaultValue) => {
  if (_.isEmpty(value)) {
    return _.isInteger(value) ? value : defaultValue;
  }
  return value;
};

/**
 * Throw an error with set the httpStatuCode value
 *
 * @param {string} message
 * @param {number} httpStatusCode
 */
export const throwErrorsHttp = (message = 'Error', httpStatusCode = 400) => {
  const error = new Error(message);
  error.httpStatusCode = httpStatusCode;
  throw error;
};
