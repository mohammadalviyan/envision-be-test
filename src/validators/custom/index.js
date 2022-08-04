import { get } from 'lodash';
import moment from 'moment';
import { defaultToIfEmpty } from '../../helper/utils';

const dateFormat = (format, options) => (value, { path }) => {
  const dateFormat = defaultToIfEmpty(format, 'DD-MM-YYY');
  const date = moment(value, dateFormat, true);

  if (!date.isValid()) {
    const attribute = get(options, 'attribute', path);
    throw new Error(`The ${attribute} does match the format ${dateFormat}`);
  }
  return true;
};

export default {
  dateFormat
};
