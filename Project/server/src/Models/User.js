"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/**
 * Modello utente della filiera
 */
var User = /** @class */ (function () {
    function User(id, username, password, role, name, city, address, streetNumber, companyLogo, wallet) {
        this._id = id;
        this._username = username;
        this._passwordHash = password;
        this._role = role;
        this._name = name;
        this._city = city;
        this._address = address;
        this._streetNumber = streetNumber;
        this._companyLogo = companyLogo;
        this._wallet = wallet;
    }
    Object.defineProperty(User.prototype, "id", {
        /**
         * Getter id
         * @return Identificativo utente
         */
        get: function () {
            return this._id;
        },
        /**
         * Setter id
         * @param {number} id
         */
        set: function (id) {
            this._id = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "username", {
        /**
         * Getter username
         * @return Username utente
         */
        get: function () {
            return this._username;
        },
        /**
         * Setter username
         * @param {string} username
         */
        set: function (username) {
            this._username = username;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "passwordHash", {
        /**
         * Getter password
         * @return Password utente
         */
        get: function () {
            return this._passwordHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "role", {
        /**
         * Getter role
         * @return Ruolo dell'utente nella filiera
         */
        get: function () {
            return this._role;
        },
        /**
         * Setter role
         * @param {string} role
         */
        set: function (role) {
            this._role = role;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "name", {
        /**
         * Getter name
         * @return Nome dell'azienda
         */
        get: function () {
            return this._name;
        },
        /**
         * Setter name
         * @param {string} name
         */
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "city", {
        /**
         * Getter city
         * @return Città dell'utente
         */
        get: function () {
            return this._city;
        },
        /**
         * Setter city
         * @param {string} city
         */
        set: function (city) {
            this._city = city;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "address", {
        /**
         * Getter address
         * @return Indirizzo dell'utente
         */
        get: function () {
            return this._address;
        },
        /**
         * Setter address
         * @param {string} address
         */
        set: function (address) {
            this._address = address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "streetNumber", {
        /**
         * Getter streetNumber
         * @return Numero civico dell'utente
         */
        get: function () {
            return this._streetNumber;
        },
        /**
         * Setter streetNumber
         * @param {number} streetNumber
         */
        set: function (streetNumber) {
            this._streetNumber = streetNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "companyLogo", {
        /**
         * Getter companyLogo
         * @return URL del logo dell'utente
         */
        get: function () {
            return this._companyLogo;
        },
        /**
         * Setter companyLogo
         * @param {string} companyLogo
         */
        set: function (companyLogo) {
            this._companyLogo = companyLogo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "wallet", {
        /**
         * Getter walletAddress
         * @return Indirizzo del wallet dell'utente
        */
        get: function () {
            return this._wallet;
        },
        /**
         * Setter walletAddress
         * @param {string} walletAddress
         */
        set: function (wallet) {
            this._wallet = wallet;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "passwordhash", {
        /**
         * Setter password
         * @param {string} password
         */
        set: function (password) {
            this._passwordHash = password;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
exports.User = User;
