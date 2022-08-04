import { Op } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import { pick } from 'lodash';
import { User } from '../database/models';

/**
 * Create user
 *
 * @param {Object} userData
 * @param {string} userData.firstName
 * @param {string} userData.lastName
 * @param {string} userData.email
 * @param {string} userData.dob
 * @param {string} userData.location
 * @param {boolean} userData.isDobNotify
 */
const create = async(userData) => {
  const payload = pick(userData, ['firstName', 'lastName', 'email', 'dob', 'location', 'isNotified']);

  return User.create(payload)
    .then((result) => result)
    .catch((e) => ({ success: false, error: e }));
};

/**
 * Update user info.
 *
 * @param {string} id
 * @param {Object} userData
 * @param {string} userData.firstName
 * @param {string} userData.lastName
 * @param {string} userData.email
 * @param {string} userData.dob
 * @param {string} userData.location
 * @param {boolean} userData.isDobNotify
 */
const update = async(id, userData) => {
  const payload = pick(userData, ['firstName', 'lastName', 'email', 'dob', 'location', 'isNotified']);

  const user = await User.findOne({ where: { id: { [Op.eq]: id } } });

  if (!user) {
    const error = new Error('User Not Found');
    error.httpStatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  user.update(payload);

  return user;
};

/**
 * Delete user by id.
 *
 * @param {string} id
 */
const softDelete = async(id) => {
  const user = await User.scope(null).findOne({ where: { id: { [Op.eq]: id } } });

  if (!user) {
    const error = new Error('User Not Found');
    error.httpStatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  await user.destroy();

  return true;
};

export default {
  create,
  update,
  softDelete
};
