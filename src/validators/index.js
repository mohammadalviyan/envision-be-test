import { check } from 'express-validator';
import User from './userValidator';
import FieldValidationMessage from '../helper/fieldValidationMessage';

const validateId = [
  check('id')
    .isUUID()
    .withMessage(FieldValidationMessage('uuid', 'id'))
];

export default {
  validateId,
  User,
};
