import axios from 'axios';
import moment from 'moment';
import { get } from 'lodash';
import User from '../database/models/user';

/**
* Send and re-send email notified to user.
*/
export const proceed = async() => {
  try {
    const users = await User.scope(null).findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'dob', 'location', 'isNotified'],
      where: { isNotified: false }
    });

    if (users.length < 1) {
      console.log('No need send email!');
    }

    const promises = [];
    // const updateUserStatuses = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const message = `Hey ${user.firstName}, it's your birthday`;

      if (user.dob.slice(0, 5) === moment().format('DD-MM')) {
        promises.push(
          sendEmailNotified(user.email, message)
        );
        // updateUserStatuses.push(updateUserStatus(user.id));
        console.log('Send email notification done!');
      }
    }

    const result = await Promise.all(promises);
    // await Promise.all(updateUserStatuses);

    return result;
  } catch (e) {
    return Promise.resolve([]); // * Force as resolved to not break the script.
  }
};

const sendEmailNotified = async(email, message) => axios({
  method: 'POST',
  url: 'https://email-service.digitalenvision.com.au/send-email',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  data: { email, message }
}).then(({ data: result }) => result).catch((e) => {
  const message = get(e, 'response.data.success.message', e.message);
  e.message = `Failed to send notification: ${message}`;
  throw e;
});

// const updateUserStatus = async(id) => User.update({ isNotified: true }, { id });

// * Sometimes want to run a function via CLI,
// * Sometimes want to require it from another module. Here's how to do both.
(require.main === module) && proceed();

export default proceed;
