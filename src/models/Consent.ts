import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../dao/db'
import { statusType } from '../enums/statusType'
import { User } from './User'


export interface ConsentInstance extends Model{
    id: number,
    consentId: string
    status: statusType
}

export const Consent = sequelize.define<ConsentInstance>('Consent', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    consentId: {
        type: DataTypes.UUID,
    },
    status: {
        type: DataTypes.ENUM,
        defaultValue: 'AWAITING_AUTHORISATION',
        values: ['AWAITING_AUTHORISATION', 'AUTHORISED','REJECT']
    },
},
{
    tableName: 'consents',
    timestamps: true
})

Consent.belongsTo(User, {
    constraints: true,
    foreignKey: 'identification'
})