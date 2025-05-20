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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpUser = signUpUser;
exports.loginUser = loginUser;
exports.linkWallet = linkWallet;
exports.getUserById = getUserById;
var User_1 = require("../Models/User");
var UserWallet_1 = require("../Models/UserWallet");
var UserDAO_1 = require("../DAO/UserDAO");
var cryptoUtils_1 = require("../Utils/cryptoUtils");
var UserWalletDAO_1 = require("../DAO/UserWalletDAO");
/**
 * Servizio per la gestione degli utenti.
 * Usa un'istanza di UserDAO.
 */
var userDAO = new UserDAO_1.UserDAO();
var userWalletDAO = new UserWalletDAO_1.UserWalletDAO();
/**
 * Inizializza gli utenti di default nel sistema se non esistono già facendo riferimento al seedUsers.
 */
function signUpUser(username, password, role, name, city, address, streetNumber, companyLogo, walletAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var existingUser, passwordHash, user, userid, userWallet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userDAO.findByUsername(username)];
                case 1:
                    existingUser = _a.sent();
                    if (!!existingUser) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, cryptoUtils_1.hashPassword)(password)];
                case 2:
                    passwordHash = _a.sent();
                    user = new User_1.User(0, username, passwordHash, role, name, city, address, streetNumber, companyLogo);
                    return [4 /*yield*/, userDAO.save(user)];
                case 3:
                    userid = _a.sent();
                    userWallet = new UserWallet_1.UserWallet(userid, 0, walletAddress);
                    linkWallet(userid, userWallet);
                    return [3 /*break*/, 5];
                case 4: throw new Error('Username già in uso');
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Effettua il login di un utente verificando username e password.
 * @throws Error se le credenziali non sono valide.
 */
function loginUser(username, password, walletAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var user, isPasswordValid;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, userDAO.findByUsername(username)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        throw new Error('Utente non trovato');
                    }
                    return [4 /*yield*/, (0, cryptoUtils_1.verifyPassword)(password, user.passwordHash)];
                case 2:
                    isPasswordValid = _b.sent();
                    if (!isPasswordValid) {
                        throw new Error('Password errata');
                    }
                    // Verifica l'indirizzo del wallet
                    if (((_a = user.wallet) === null || _a === void 0 ? void 0 : _a.address) !== walletAddress) {
                        throw new Error('Indirizzo wallet non valido');
                    }
                    return [2 /*return*/, user];
            }
        });
    });
}
/**
 * Collega un indirizzo wallet a un utente esistente.
 * @throws Error se l'utente non viene trovato.
 */
function linkWallet(userId, wallet) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userDAO.findById(userId)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new Error('Utente non trovato');
                    }
                    user.wallet = wallet;
                    return [4 /*yield*/, userWalletDAO.save(wallet)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, userDAO.update(user)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
/**
 * Recupera un utente dato il suo ID.
 */
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userDAO.findById(userId)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
