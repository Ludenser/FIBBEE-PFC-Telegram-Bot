import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface UserAttributes {
  id: number;
  tg_username: string;
  clickup_user_id: number;
  clickup_username: string;
  clickup_token: string;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes { }
export class User extends Model<UserModel, UserAttributes> { }

export type UserStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize): UserStatic {
  return <UserStatic>sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    tg_username: {
      type: DataTypes.STRING,
      unique: true
    },
    clickup_user_id: {
      type: DataTypes.INTEGER,
      unique: true
    },
    clickup_username: {
      type: DataTypes.STRING,
      unique: true
    },
    clickup_token: {
      type: DataTypes.STRING
    }
  })
}