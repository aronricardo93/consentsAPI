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
exports.privateRoute = exports.verifyToken = exports.generateToken = void 0;
const passport_jwt_1 = require("passport-jwt");
const User_1 = require("../models/User");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const notAuthorizedJson = { status: '401', message: 'Unauthorized!' };
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
passport_1.default.use(new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findByPk(payload.id);
    if (user) {
        return done(null, user);
    }
    else {
        return done(notAuthorizedJson, false);
    }
})));
const generateToken = (id, identification) => {
    return jsonwebtoken_1.default.sign({ id: id, identification: identification }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    return payload;
};
exports.verifyToken = verifyToken;
const privateRoute = (req, res, next) => {
    passport_1.default.authenticate('jwt', (err, user) => {
        return user ? next() : res.status(401).json(notAuthorizedJson);
    })(req, res, next);
};
exports.privateRoute = privateRoute;
exports.default = passport_1.default;
