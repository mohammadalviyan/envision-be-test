import * as validator from 'express-validator';
import ExpressValidatorChecker from './expressValidatorChecker';

jest.mock('express-validator');
describe('Express Validator Checker Test Suite', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  const json = (data) => data;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnValue(mockRes),
      json
    };
    mockNext = jest.fn();
  });

  it('should return true if there`s no error in field validation', () => {
    validator.validationResult.mockImplementation(() => ({ isEmpty: () => true }));

    ExpressValidatorChecker(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('should response the error validation', () => {
    const fakeParam = 'fake-param';
    const fakeMsg = 'fake-msg';

    validator.validationResult.mockImplementation(() => ({
      isEmpty: () => false,
      array: jest.fn().mockReturnValue([{ param: fakeParam, msg: fakeMsg }])
    }));

    const result = ExpressValidatorChecker(mockReq, mockRes, mockNext);

    const fakeError = {};
    fakeError[fakeParam] = fakeMsg;

    expect(result).toMatchObject({
      success: { status: false, message: 'Invalid Parameters' },
      errors: fakeError
    });
  });
});
