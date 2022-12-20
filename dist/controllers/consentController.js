"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeConsent = exports.findConsentsByDocument = exports.findConsentById = exports.updateConsent = exports.createConsent = void 0;
const passport_1 = require("../config/passport");
const consentService = __importStar(require("../services/ConsentService"));
const permissionService = __importStar(require("../services/PermissionService"));
const links_1 = require("../models/mocks/links");
const meta_1 = require("../models/mocks/meta");
const createConsent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Consent']
    if (req.body && req.headers.authorization) {
        try {
            const { status } = req.body;
            const [_, token] = req.headers.authorization.split(' ')[1];
            const user = (0, passport_1.verifyToken)(token);
            const consent = yield consentService.createConsent(status, user.identification);
            const permissions = yield permissionService.createPermission(req.body.permissions, consent.id, user.identification);
            const consentCustomized = yield consentService.getConsentCustomized(consent.id);
            res.status(201).json({ loggedUser: { identification: user.identification, rel: 'CPF' }, data: consentCustomized, permissions, links: links_1.links, meta: meta_1.meta });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
});
exports.createConsent = createConsent;
const updateConsent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Consent']
    if (req.body && req.params && req.headers.authorization) {
        try {
            const [_, token] = req.headers.authorization.split(" ");
            let { id } = req.params;
            let _a = req.body, { status } = _a, products = __rest(_a, ["status"]);
            const user = (0, passport_1.verifyToken)(token);
            const updatedPermission = yield permissionService.updatePermission(products, user.identification);
            const updatedConsent = yield consentService.updateConsent(id, status);
            res.status(200).json({ data: updatedConsent, products: updatedPermission === null || updatedPermission === void 0 ? void 0 : updatedPermission.permissions, links: links_1.links, meta: meta_1.meta });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
});
exports.updateConsent = updateConsent;
const findConsentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    // #swagger.tags = ['Consent']
    if (req.params) {
        try {
            const { id } = req.params;
            const data = yield consentService.findById(id);
            if (data) {
                const consent = yield consentService.getConsentCustomized(Number((_b = data.consent) === null || _b === void 0 ? void 0 : _b.id));
                res.status(200).json({ data: consent, permissions: (_c = data.permissions) === null || _c === void 0 ? void 0 : _c.permissions, links: links_1.links, meta: meta_1.meta });
            }
            else {
                res.status(404).json({ Error: `ID ${id} not found!` });
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
});
exports.findConsentById = findConsentById;
const findConsentsByDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    // #swagger.tags = ['Consent']
    if (req.params) {
        try {
            const { document } = req.params;
            const data = yield consentService.findByDocument(document);
            if (data.consent) {
                res.status(200).json({ data: data.consent, permissions: (_d = data.permissions) === null || _d === void 0 ? void 0 : _d.permissions, links: links_1.links, meta: meta_1.meta });
            }
            else {
                res.status(404).json({ message: "Document not found!" });
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
});
exports.findConsentsByDocument = findConsentsByDocument;
const removeConsent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Consent']
    if (req.params && req.headers.authorization) {
        try {
            let { id } = req.params;
            const [_, token] = req.headers.authorization.split(" ");
            const user = (0, passport_1.verifyToken)(token);
            const consent = yield consentService.removeConsent(id, user.identification);
            consent ? res.status(204).json({}) : res.status(404).json({ Error: "Id not found!" });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
});
exports.removeConsent = removeConsent;
