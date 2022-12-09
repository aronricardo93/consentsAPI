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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPassword = exports.findByIdentification = exports.createUser = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (identification, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = bcrypt_1.default.hashSync(password, 10);
    const [user, created] = yield User_1.User.findOrCreate({
        where: {
            identification
        },
        defaults: {
            identification,
            password: hash
        }
    });
    return created ? user : new Error('This identification exists already!');
});
exports.createUser = createUser;
const findByIdentification = (identification) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.User.findOne({ where: { identification } });
});
exports.findByIdentification = findByIdentification;
const matchPassword = (passwordText, encrypted) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.compareSync(passwordText, encrypted);
});
exports.matchPassword = matchPassword;
