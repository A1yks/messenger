const fs = require('fs');
const path = require('path');
const NodeRSA = require('node-rsa');

function getKeys(app) {
    const appPath = path.join(app.getPath('exe'), '../');

    if (fs.existsSync(path.join(appPath, 'keys/publicRSA.pem')) && fs.existsSync(path.join(appPath, 'keys/privateRSA.pem'))) {
        const publicKey = fs.readFileSync(path.join(appPath, 'keys/publicRSA.pem'), 'utf8');
        const privateKey = fs.readFileSync(path.join(appPath, 'keys/privateRSA.pem'), 'utf8');
        return { publicKey, privateKey };
    }

    if (!fs.existsSync(path.join(appPath, 'keys'))) fs.mkdirSync(path.join(appPath, 'keys'));

    const keys = new NodeRSA().generateKeyPair();
    const publicKey = keys.exportKey('public');
    const privateKey = keys.exportKey('private');
    fs.writeFile(path.join(appPath, 'keys/publicRSA.pem'), publicKey, (err) => {
        if (err) throw new Error(err);
    });
    fs.writeFile(path.join(appPath, 'keys/privateRSA.pem'), privateKey, (err) => {
        if (err) throw new Error(err);
    });

    return { publicKey, privateKey };
}

module.exports = { getKeys };
