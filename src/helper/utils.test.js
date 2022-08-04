import * as Utils from './utils';

describe('Utils Helper Test Suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('defaultToIfEmpty function', () => {
    it('should be defined', () => {
      expect(Utils.defaultToIfEmpty).toBeDefined();
    });

    describe('should return undefined', () => {
      it('when val and default is undefined', () => {
        const result = Utils.defaultToIfEmpty();
        expect(result).toBeUndefined();
      });

      describe('when val empty and default is undefined', () => {
        it('for array', () => {
          const result = Utils.defaultToIfEmpty([]);
          expect(result).toBeUndefined();
        });

        it('for object', () => {
          const result = Utils.defaultToIfEmpty({});
          expect(result).toBeUndefined();
        });

        it('for string', () => {
          const result = Utils.defaultToIfEmpty('');
          expect(result).toBeUndefined();
        });
      });

      it('when val is integer', () => {
        const fakeResult = 1;
        const result = Utils.defaultToIfEmpty(fakeResult, 'fake-defaultVal');
        expect(result).toEqual(fakeResult);
      });
    });

    it('should correct return value', () => {
      const val = 'val';
      const defaultVal = 'val';
      const result = Utils.defaultToIfEmpty(val, defaultVal);
      expect(result).toBe(val);
    });

    describe('should return default value', () => {
      it('for empty array', () => {
        const val = [];
        const defaultVal = 'default-val';
        const result = Utils.defaultToIfEmpty(val, defaultVal);
        expect(result).toBe(defaultVal);
      });

      it('for empty object', () => {
        const val = {};
        const defaultVal = 'default-val';
        const result = Utils.defaultToIfEmpty(val, defaultVal);
        expect(result).toBe(defaultVal);
      });

      it('for empty string', () => {
        const val = '';
        const defaultVal = 'default-val';
        const result = Utils.defaultToIfEmpty(val, defaultVal);
        expect(result).toBe(defaultVal);
      });
    });
  });

  describe('throwErrorsHttp', () => {
    it('should be defined', () => {
      expect(Utils.throwErrorsHttp).toBeDefined();
    });

    describe('will throw an error', () => {
      it('for default error message', () => {
        try {
          Utils.throwErrorsHttp();
        } catch (e) {
          expect(e.message).toBe('Error');
          expect(e.httpStatusCode).toBe(400);
        }
      });
    });
  });
});
