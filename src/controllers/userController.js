import { StatusCodes } from 'http-status-codes';
import UserService from '../services/userService';

/**
 * Add a new user.
 */
const store = async(req, res) => {
  try {
    const data = await UserService.create(req.body);

    return res.status(StatusCodes.CREATED).json({ success: { status: true, message: 'Success' }, data });
  } catch (e) {
    const statusCode = e.httpStatusCode || StatusCodes.EXPECTATION_FAILED;

    return res.status(statusCode).json({ success: { status: false, message: e.message } });
  }
};

/**
 * Update user by id.
 */
const update = async(req, res) => {
  const { id } = req.params;

  try {
    const data = await UserService.update(id, req.body);

    return res.status(StatusCodes.OK).json({ success: { status: true, message: 'Success' }, data });
  } catch (e) {
    const statusCode = e.httpStatusCode || StatusCodes.EXPECTATION_FAILED;

    return res.status(statusCode).json({ success: { status: false, message: e.message } });
  }
};

/**
 * Delete user by id.
 */
const destroy = async(req, res) => {
  const { id } = req.params;

  try {
    await UserService.softDelete(id);

    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (e) {
    const statusCode = e.httpStatusCode || StatusCodes.EXPECTATION_FAILED;

    return res.status(statusCode).json({ success: { status: false, message: e.message } });
  }
};

export default {
  store,
  update,
  destroy
};
