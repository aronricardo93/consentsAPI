import { Model, DataTypes} from 'sequelize'
import { sequelize } from '../dao/db'
import { Consent } from './Consent'
import { User } from './User'

export interface PermissionInstance extends Model{
    id: number,
    permissions: string
}

export const Permission = sequelize.define<PermissionInstance>('Permission', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    permissions: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('permissions').split(';')
        },
        set(val:[]) {
            this.setDataValue('permissions',val.join(';'))
        },
    }
},
{
    timestamps: false,
    tableName: 'permissions'
})

Permission.belongsTo(Consent, {
    constraints: true,
    foreignKey: 'idConsent',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Permission.belongsTo(User, {
    constraints: true,
    foreignKey: 'identificationUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})