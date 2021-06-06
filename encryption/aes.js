const aes256 = require('aes256');
const crypto = require('crypto');

class Aes256 {
    constructor(key) {
        this.key = key;
    }

    encrypt(data) {
        return aes256.encrypt(this.key, data);
    }

    decrypt(data) {
        return aes256.decrypt(this.key, data);
    }

    static generateKey() {
        return crypto.randomBytes(16).toString('hex');
    }
}

module.exports = Aes256;
