import express from 'express';
import ExpressValidatorChecker from '../helper/expressValidatorChecker';
import Controller from '../controllers/userController';

/**
|--------------------------------------------------
| Route Validator
|--------------------------------------------------
*/
import RouteValidator from '../validators';

/**
|--------------------------------------------------
| Route
|--------------------------------------------------
*/
const route = express.Router();

/**
|-------------------------------------------------------------
| User Route
|-------------------------------------------------------------
*/
route.post(
  '/',
  [
    RouteValidator.User.validateUserForm,
    ExpressValidatorChecker
  ],
  Controller.store
);

route.put(
  '/:id',
  [
    RouteValidator.validateId,
    RouteValidator.User.validateUserForm,
    ExpressValidatorChecker
  ],
  Controller.update
);

route.delete(
  '/:id',
  [
    RouteValidator.validateId,
    ExpressValidatorChecker
  ],
  Controller.destroy
);

export default route;
