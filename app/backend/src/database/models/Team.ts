import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './Match';

export type TeamAtributes = {
  id: number,
  teamName: string,
}

export type TeamCreationAtributes = Omit<TeamAtributes, 'id'>;

class Team extends Model<TeamAtributes, TeamCreationAtributes> {
  declare teamName: string;
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Team;
