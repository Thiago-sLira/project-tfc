import { Model, DataTypes } from 'sequelize';
import db from '.';

class User extends Model {
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
