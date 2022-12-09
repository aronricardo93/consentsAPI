"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePermission = exports.updatePermission = exports.createPermission = void 0;
const Permissions_1 = require("../models/Permissions");
const createPermission = (newPermission, id, identification) => __awaiter(void 0, void 0, void 0, function* () {
    const [hasPermission] = yield Permissions_1.Permission.findOrCreate({
        where: { idConsent: Number(id) },
        defaults: {
            permissions: newPermission,
            idConsent: Number(id),
            identificationUser: identification
        }
    });
    return hasPermission.permissions;
});
exports.createPermission = createPermission;
const updatePermission = (products, identificationUser) => __awaiter(void 0, void 0, void 0, function* () {
    yield Permissions_1.Permission.update(products, {
        where: {
            identificationUser
        }
    });
    return yield Permissions_1.Permission.findOne({ where: { identificationUser } });
});
exports.updatePermission = updatePermission;
const removePermission = (identificationUser) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Permissions_1.Permission.destroy({ where: { identificationUser } });
});
exports.removePermission = removePermission;
