"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consent = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../dao/db");
const User_1 = require("./User");
exports.Consent = db_1.sequelize.define('Consent', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    consentId: {
        type: sequelize_1.DataTypes.UUID,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM,
        defaultValue: 'AWAITING_AUTHORISATION',
        values: ['AWAITING_AUTHORISATION', 'AUTHORISED', 'REJECT']
    },
}, {
    tableName: 'consents',
    timestamps: true
});
exports.Consent.belongsTo(User_1.User, {
    constraints: true,
    foreignKey: 'identification'
});
