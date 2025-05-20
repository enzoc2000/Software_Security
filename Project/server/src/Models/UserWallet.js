"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWallet = void 0;
/**
 * Modello del saldo del portafoglio
 */
var UserWallet = /** @class */ (function () {
    function UserWallet(userId, balance, address) {
        this._userId = userId;
        this._balance = balance;
        this._address = address;
    }
    Object.defineProperty(UserWallet.prototype, "userId", {
        /**
         * Getter userId
         * @return Identificativo dell'utente
         */
        get: function () {
            return this._userId;
        },
        /**
         * Setter userId
         * @param userId Identificativo dell'utente
         */
        set: function (userId) {
            this._userId = userId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserWallet.prototype, "balance", {
        /**
         * Getter balance
         * @return Saldo del portafoglio
         */
        get: function () {
            return this._balance;
        },
        /**
         * Setter balance
         * @param balance Saldo del portafoglio
         */
        set: function (balance) {
            this._balance = balance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserWallet.prototype, "address", {
        /**
         * Getter address
         * @return Indirizzo del portafoglio
         */
        get: function () {
            return this._address;
        },
        /**
         * Setter address
         * @param address Indirizzo del portafoglio
         */
        set: function (address) {
            this._address = address;
        },
        enumerable: false,
        configurable: true
    });
    return UserWallet;
}());
exports.UserWallet = UserWallet;
