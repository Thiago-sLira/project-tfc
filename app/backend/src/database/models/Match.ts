import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  homeTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Match.addScope('withTeams', {
  include: [
    {
      association: 'homeTeam',
      attributes: ['teamName'],
    },
    {
      association: 'awayTeam',
      attributes: ['teamName'],
    },
  ],
});

Match.addScope('allTeamsPerformance', {
  include: [
    {
      association: 'homeTeam',
      attributes: ['teamName'],
    },
    {
      association: 'awayTeam',
      attributes: ['teamName'],
    },
  ],
});

export default Match;
