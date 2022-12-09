"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../dao/db");
const Consent_1 = require("./Consent");
const User_1 = require("./User");
exports.Permission = db_1.sequelize.define('Permission', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true
    },
    permissions: {
        type: sequelize_1.DataTypes.STRING,
        get() {
            return this.getDataValue('permissions').split(';');
        },
        set(val) {
            this.setDataValue('permissions', val.join(';'));
        },
    }
}, {
    timestamps: false,
    tableName: 'permissions'
});
exports.Permission.belongsTo(Consent_1.Consent, {
    constraints: true,
    foreignKey: 'idConsent',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
exports.Permission.belongsTo(User_1.User, {
    constraints: true,
    foreignKey: 'identificationUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
