import FieldValidationMessage from './fieldValidationMessage';

describe('Field Validation Message Test Suite', () => {
  describe('should return the correct message', () => {
    const attributeName = 'Test Attribute Name';

    describe('special case', () => {
      it('required_if', () => {
        const fakeOthers = {
          fields: 'fake-fields',
          values: 'fake-values'
        };

        expect(FieldValidationMessage('required_if', attributeName, fakeOthers)).toBe(
          `The ${attributeName} field is required when ${fakeOthers.fields} is ${fakeOthers.values}.`
        );
      });

      it('date_format', () => {
        const fakeOthers = { format: 'fake-format' };
        expect(FieldValidationMessage('date_format', attributeName, fakeOthers)).toBe(
          `The ${attributeName} does not match the format ${fakeOthers.format}.`
        );
      });

      it('min', () => {
        const fakeOthers = { min: 'fake-min' };
        expect(FieldValidationMessage('min', attributeName, fakeOthers)).toBe(
          `The ${attributeName} must be at least ${fakeOthers.min}.`
        );
      });

      it('max', () => {
        const fakeOthers = { max: 'fake-min' };
        expect(FieldValidationMessage('max_array', attributeName, fakeOthers)).toBe(
          `The ${attributeName} may not have more than ${fakeOthers.max} items.`
        );
      });
    });

    it('normal case', () => {
      expect(FieldValidationMessage('boolean', attributeName)).toBe(
        `The ${attributeName} field must be true or false.`
      );
    });
  });
});
