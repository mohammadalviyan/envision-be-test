import { isEmpty } from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import { defaultToIfEmpty } from './utils';

/**
|-------------------------------------------------------------
| Express Validator Checker
|-------------------------------------------------------------
*/

class ExpressValidatorChecker {
  /**
   *
   * @param {Object} options
   * @param {string} options.errorMessage
   */
  static validateRequest(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const response = ExpressValidatorChecker.prototype.errorFormatter(
        errors, 'Invalid Parameters'
      );

      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(response);
    }

    next();
  }

  /**
   *
   *
   * @param {*} errors
   * @param {string} statusMsg
   */
  errorFormatter(errors, errorMessage) {
    const formattedError = {};
    errors.array().forEach((e) => {
      const error = isEmpty(e.nestedErrors) ? e : e.nestedErrors[e.nestedErrors.length - 1];
      const example = defaultToIfEmpty(error.param, error.example);
      formattedError[example] = error.msg;
    });

    return { success: { status: false, message: errorMessage }, errors: formattedError };
  }
}

export default ExpressValidatorChecker.validateRequest;
