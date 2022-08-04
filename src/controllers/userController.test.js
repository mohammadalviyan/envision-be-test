import { StatusCodes } from 'http-status-codes';
import Controller from './userController';
import UserService from '../services/userService';

describe('User Controller Test Suite', () => {
  const fakeUserId = 'fake-userId';

  let mockReq;
  let mockRes;

  const json = { json: (response) => response };

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
      query: {}
    };
    mockRes = { status: jest.fn().mockReturnValue(json) };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('store function', () => {
    const { store } = Controller;

    it('should be defined', () => {
      expect(store).toBeDefined();
    });

    it('response failed expectations', async() => {
      const fakeError = new Error('fake-error');

      const spy = getSpyUserStoreForm(fakeError, false);

      const result = await store(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledTimes(1);
      expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.EXPECTATION_FAILED);

      expect(result).toMatchObject({
        success: { status: false, message: fakeError.message }
      });

      spy.mockClear();
    });

    it('response success', async() => {
      const fakeResult = {};
      const spy = getSpyUserStoreForm(fakeResult);

      const fakeBodyReq = 'fake-body-req';
      mockReq.body = fakeBodyReq;

      const result = await store(mockReq, mockRes);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe(fakeBodyReq);

      expect(mockRes.status).toHaveBeenCalledTimes(1);
      expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.CREATED);

      expect(result).toMatchObject({
        success: { status: true, message: 'Success' }, data: fakeResult
      });

      spy.mockClear();
    });
  });

  describe('update function', () => {
    const { update } = Controller;
    it('should be defined', () => {
      expect(update).toBeDefined();
    });

    it('response failed expectations', async() => {
      const fakeError = new Error('fake-error');

      mockReq.params = { id: fakeUserId };

      const spy = getSpyUserUpdate(fakeError, false);

      const result = await update(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledTimes(1);
      expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.EXPECTATION_FAILED);

      expect(result).toMatchObject({
        success: { status: false, message: fakeError.message }
      });

      spy.mockClear();
    });

    it('response success', async() => {
      const fakeResult = {};
      const spy = getSpyUserUpdate(fakeResult);

      mockReq.params = { id: fakeUserId };
      const fakeBodyReq = 'fake-body-req';
      mockReq.body = fakeBodyReq;

      const result = await update(mockReq, mockRes);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe(fakeUserId);

      expect(mockRes.status).toHaveBeenCalledTimes(1);
      expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.OK);

      expect(result).toMatchObject({
        success: { status: true, message: 'Success' }, data: fakeResult
      });

      spy.mockClear();
    });
  });

  describe('destroy function', () => {
    const { destroy } = Controller;

    it('should be defined', () => {
      expect(destroy).toBeDefined();
    });

    it('response failed expectations', async() => {
      const fakeError = new Error('fake-error');
      const spy = getSpyDestroy(fakeError, false);

      const result = await destroy(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledTimes(1);
      expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.EXPECTATION_FAILED);

      expect(result).toMatchObject({
        success: { status: false, message: fakeError.message }
      });

      spy.mockClear();
    });

    it('response success', async() => {
      const fakeResult = {};
      const spy = getSpyDestroy(fakeResult);

      mockReq.params['id'] = fakeUserId;

      await destroy(mockReq, mockRes);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe(fakeUserId);

      expect(mockRes.status).toHaveBeenCalledTimes(1);
      expect(mockRes.status.mock.calls[0][0]).toBe(StatusCodes.NO_CONTENT);

      spy.mockClear();
    });
  });
});

const getSpyUserStoreForm = (result, isResolve = true) => (isResolve
  ? jest.spyOn(UserService, 'create').mockResolvedValue(result)
  : jest.spyOn(UserService, 'create').mockRejectedValue(result));

const getSpyUserUpdate = (result, isResolve = true) => (isResolve
  ? jest.spyOn(UserService, 'update').mockResolvedValue(result)
  : jest.spyOn(UserService, 'update').mockRejectedValue(result));

const getSpyDestroy = (result, isResolve = true) => (isResolve
  ? jest.spyOn(UserService, 'softDelete').mockResolvedValue(result)
  : jest.spyOn(UserService, 'softDelete').mockRejectedValue(result));
