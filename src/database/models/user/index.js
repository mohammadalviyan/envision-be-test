import Sequelize from 'sequelize';
import moment from 'moment';
import connection from '../../mssqlConnection';

const { Model } = Sequelize;

/**
|-------------------------------------------------------------
| User Model.
|-------------------------------------------------------------
*/

class User extends Model {}

User.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dob: {
    type: Sequelize.DATEONLY,
    get(fieldName) {
      const val = this.getDataValue(fieldName);
      return val ? moment(val).format('DD-MM-YYYY') : val;
    },
    set(val) {
      this.setDataValue('dob', val ? moment(val, 'DD-MM-YYYY') : null);
    }
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isNotified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize: connection,
  modelName: 'User',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'user',
  scopes: {}
});

export default User;
