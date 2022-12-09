import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../dao/db'

export type UserType = {
    id: number,
    identification: string,
    iat: number,
    exp: number
  };

export interface UserInstance extends Model{
    id:number,
    identification: string,
    password: string
}

export const User = sequelize.define<UserInstance>('User',{

    id: {
        primaryKey: true,
        autoIncrement:true,
        type: DataTypes.INTEGER
    },
    identification: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        timestamps: true,
        tableName: 'users'
    })