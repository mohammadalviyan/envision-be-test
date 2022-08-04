import { body } from 'express-validator';
import FieldValidationMessage from '../helper/fieldValidationMessage';
import CustomValidator from './custom/index';

const validateUserForm = [
  body('firstName')
    .isString()
    .withMessage(FieldValidationMessage('string', 'firstName'))
    .isLength({ max: 50 })
    .withMessage(FieldValidationMessage('lte', 'firstName', { values: 50, unit: 'characters' })),
  body('lastName')
    .isString()
    .withMessage(FieldValidationMessage('string', 'lastName'))
    .isLength({ max: 50 })
    .withMessage(FieldValidationMessage('lte', 'lastName', { values: 50, unit: 'characters' })),
  body('email')
    .isString()
    .withMessage(FieldValidationMessage('string', 'email'))
    .isLength({ max: 50 })
    .withMessage(FieldValidationMessage('lte', 'email', { values: 50, unit: 'characters' })),
  body('dob')
    .custom(CustomValidator.dateFormat('DD-MM-YYYY', { attribute: 'dob' })),
  body('location')
    .isString()
    .withMessage(FieldValidationMessage('string', 'location'))
    .isLength({ max: 50 })
    .withMessage(FieldValidationMessage('lte', 'location', { values: 50, unit: 'characters' })),
];

export default {
  validateUserForm,
};
