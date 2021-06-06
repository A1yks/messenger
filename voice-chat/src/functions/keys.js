import NodeRSA from 'node-rsa';
import { ipcRenderer } from 'electron';

let publicKey;
let privateKey;

ipcRenderer.on('keys', (e, keys) => {
    publicKey = keys.publicKey;
    privateKey = keys.privateKey;
});

export function decryptAesKey(privateRSAKey, encryptedAesKey) {
    const cipher = new NodeRSA();
    cipher.importKey(privateRSAKey);
    return cipher.decrypt(encryptedAesKey, 'utf8');
}

export function getAesKeys(getKeys, cb) {
    const timer = setInterval(() => {
        if (publicKey !== undefined && privateKey !== undefined) {
            getKeys(publicKey, privateKey, cb);
            clearInterval(timer);
        }
    });
}
