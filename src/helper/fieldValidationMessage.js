import { get, replace, startCase } from 'lodash';

/**
|-------------------------------------------------------------
| Field Validation Message.
|-------------------------------------------------------------
*/

class FieldValidationMessage {
  /**
   * Get error field validation message based on rule.
   *
   * @param {string} rule
   * @param {string} attributeName the name of the attribute that will be displayed
   * @param {Object} options
   * @param {string} options.fields
   * @param {string} options.values
   * @param {string} options.format
   * @param {number} options.min
   * @param {number} options.max
   * @param {string} options.unit
   * @param {boolean} options.isStartCase
   */
  static get(rule, attrbName, options = {}) {
    const {
      fields, values, format, min, max, unit = '', isStartCase = true
    } = options;

    attrbName = isStartCase ? startCase(attrbName) : attrbName;

    let ruleMessage = get(FieldValidationMessage.prototype.errorMessage(), rule, '');
    ruleMessage = replace(ruleMessage, ':attribute', attrbName);

    if (fields) {
      ruleMessage = replace(ruleMessage, ':other', fields);
    }

    if (values) {
      ruleMessage = replace(ruleMessage, ':values', values);
      ruleMessage = `${ruleMessage} ${unit}`.trim();
    }

    if (format) {
      ruleMessage = replace(ruleMessage, ':format', format);
    }

    if (min) {
      ruleMessage = replace(ruleMessage, ':min', min);
      ruleMessage = `${ruleMessage} ${unit}`.trim();
    }

    if (max) {
      ruleMessage = replace(ruleMessage, ':max', max);
      ruleMessage = `${ruleMessage} ${unit}`.trim();
    }

    // Clear undefined if not putting the attributeName.
    ruleMessage = replace(ruleMessage, ' undefined', '');

    return `${ruleMessage}.`;
  }

  /**
   * Messages for rule.
   */
  errorMessage() {
    return {
      array: 'The :attribute must be an array',
      boolean: 'The :attribute field must be true or false',
      between: 'The :attribute must be between :min and :max',
      date_format: 'The :attribute does not match the format :format',
      email: 'The :attribute must be a valid email address',
      in: 'The selected :attribute is invalid',
      integer: 'The :attribute must be an integer',
      lte: 'The :attribute must be less than or equal :values',
      min: 'The :attribute must be at least :min',
      min_array: 'The :attribute must have at least :min items',
      max_array: 'The :attribute may not have more than :max items',
      mimetypes: 'The :attribute must be a file of type: :values',
      numeric: 'The :attribute must be a number',
      required: 'The :attribute field is required',
      required_if: 'The :attribute field is required when :other is :values',
      required_without: 'The :attribute field is required when :values is not present',
      string: 'The :attribute must be a string',
      uuid: 'The :attribute must be a valid UUID',
      exists: 'The selected :attribute is invalid',
      filled: 'The :attribute field must have a value'
    };
  }
}

export default FieldValidationMessage.get;
