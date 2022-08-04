import Model from '.';

describe('User Model Test Suite', () => {
  it('should an instance of sequelize class model', () => {
    expect(Model.toString()).toBe('class User extends Model {}');
  });

  it('tableName should be correct', () => {
    expect(Model.tableName).toBe('user');
  });

  it('primary key should be id', () => {
    expect(Model.primaryKeyAttribute).toBe('id');
  });

  it('attribute should match with snapshot', () => {
    expect(Model.rawAttributes).toMatchSnapshot();
  });

  it('model name should be correct', () => {
    expect(Model.name).toBe('User');
  });

  it('basic options should be correct', () => {
    expect(Model.options.freezeTableName).toBeTruthy();
    expect(Model.options.underscored).toBeTruthy();
    expect(Model.options.timestamps).toBeTruthy();
    expect(Model.options.paranoid).toBeTruthy();
  });
});
