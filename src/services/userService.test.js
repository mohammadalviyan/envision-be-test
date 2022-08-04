import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import UserSVC from './userService';
import User from '../database/models/user';

describe('User Handler Test Suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const { create } = UserSVC;

    it('should be defined', () => {
      expect(create).toBeDefined();
    });

    describe('should return correct data', () => {
      it('for new record', async() => {
        const spyFindOrCreateUser = jest
          .spyOn(User, 'create')
          .mockResolvedValue(getUser());

        const result = await create(getUser());

        expect(spyFindOrCreateUser).toHaveBeenCalledTimes(1);
        expect(spyFindOrCreateUser.mock.calls[0][0]).toBeDefined();
        expect(spyFindOrCreateUser.mock.calls[0][0]).toMatchSnapshot();
        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('update function', () => {
    const { update } = UserSVC;

    it('should be defined', () => {
      expect(update).toBeDefined();
    });

    it('should throw error if user not found', async() => {
      const fakeUserId = 'fake-id';
      const spyFindOneUser = jest
        .spyOn(User, 'findOne')
        .mockReturnValue(null);

      const fakeData = {};
      try {
        await update(fakeUserId, fakeData);
      } catch (e) {
        expect(spyFindOneUser).toHaveBeenCalledTimes(1);

        expect(spyFindOneUser.mock.calls[0][0]).toBeDefined();
        expect(spyFindOneUser.mock.calls[0][0]).toMatchSnapshot();

        expect(e.message).toBe('User Not Found');
        expect(e.httpStatusCode).toBe(StatusCodes.NOT_FOUND);
      }
    });

    it('success update', async() => {
      const fakeId = 'fake-id';

      const fakeUser = getUser(fakeId);

      const mockUpdateUser = jest.fn();
      fakeUser.update = mockUpdateUser;

      const spyFindOneUser = jest.spyOn(User, 'findOne')
        .mockResolvedValue(fakeUser);

      const fakeData = {
        name: 'fake-update-name',
        address: 'fake-update-address'
      };

      const result = await update(fakeId, { ...fakeData, ...{ test: 'abc' } });

      expect(spyFindOneUser).toHaveBeenCalledTimes(1);
      expect(spyFindOneUser.mock.calls[0][0]).toMatchObject({
        where: { id: { [Op.eq]: fakeId } }
      });

      expect(mockUpdateUser).toHaveBeenCalledTimes(1);
      expect(mockUpdateUser.mock.calls[0][0]).toMatchObject(fakeData);

      expect(result).toMatchSnapshot();
    });
  });

  describe('softDelete function', () => {
    const { softDelete } = UserSVC;

    it('should be defined', () => {
      expect(softDelete).toBeDefined();
    });

    it('should throw error if user not found', async() => {
      const spyFindOneUser = jest.spyOn(User, 'findOne')
        .mockResolvedValue(null);

      const fakeId = 'fake-Id';
      try {
        await softDelete(fakeId);
      } catch (e) {
        expect(spyFindOneUser).toHaveBeenCalledTimes(1);
        expect(spyFindOneUser.mock.calls[0][0]).toMatchObject(
          { where: { id: { [Op.eq]: fakeId } } }
        );

        expect(e.message).toBe('User Not Found');
        expect(e.httpStatusCode).toBe(StatusCodes.NOT_FOUND);
      }
    });

    it('success delete', async() => {
      const fakeId = 'fake-id';
      const fakeUser = getUser(fakeId);

      const mockDestroyUser = jest.fn();
      fakeUser.destroy = mockDestroyUser;

      const spyFindOneUser = jest.spyOn(User, 'findOne')
        .mockResolvedValue(fakeUser);

      await softDelete(fakeId);

      expect(spyFindOneUser).toHaveBeenCalledTimes(1);
      expect(spyFindOneUser.mock.calls[0][0]).toMatchObject(
        { where: { id: { [Op.eq]: fakeId } } }
      );

      expect(mockDestroyUser).toHaveBeenCalledTimes(1);
    });
  });
});

const getUser = () => ({
  id: 'c59f9b5f-7dac-4944-8fab-9fff0fa32193',
  firtsName: 'User',
  lastName: 'User',
  email: 'test@gmail.com',
  dob: '17-11-1996',
  location: 'tampines',
  isNotified: false,
  created_at: '2021-05-07T02:35:28.848Z',
  updated_at: '2021-05-07T02:37:47.550Z',
});
