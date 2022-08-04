/* eslint-disable global-require */
import Sequelize from 'sequelize';

describe('Sequelize Connection Test Suite', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  const json = { json: (response) => response };

  beforeEach(() => {
    mockReq = {
      locals: { leaderId: 'fake-leaderId' }, params: {}, body: {}, query: {}
    };
    mockRes = { status: jest.fn().mockReturnValue(json) };
    mockNext = jest.fn();
  });

  it('unable to authenticate', async() => {
    const spySequelizeAuthenticate = jest
      .spyOn(Sequelize.prototype, 'authenticate')
      .mockRejectedValue({});

    process.env.DB_CONNECTION = '';
    process.env.DB_HOST = '';
    process.env.DB_PORT = '';
    process.env.DB_NAME = '';
    process.env.DB_USERNAME = '';
    process.env.DB_PASSWORD = '';

    const { sequelizeConnectionChecker } = require('./mssqlConnection');

    const result = await sequelizeConnectionChecker(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(0);
    expect(mockRes.status).toHaveBeenCalledTimes(1);
    expect(mockRes.status.mock.calls[0][0]).toBe(500);

    expect(result).toMatchObject({
      success: {
        status: false,
        message: 'Oops! Something went wrong, please try again or contact the support desk'
      }
    });

    spySequelizeAuthenticate.mockClear();
  });

  it('authenticated', async() => {
    const spySequelizeAuthenticate = jest
      .spyOn(Sequelize.prototype, 'authenticate')
      .mockResolvedValue(true);

    const { sequelizeConnectionChecker } = require('./mssqlConnection');

    await sequelizeConnectionChecker(mockReq, mockRes, mockNext);

    expect(spySequelizeAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledTimes(1);

    spySequelizeAuthenticate.mockClear();
  });
});
