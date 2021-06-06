const NodeRSA = require('node-rsa');

function getRSAKeys() {
    const keys = new NodeRSA({ b: 512 }).generateKeyPair();

    const publicKey = keys.exportKey('public');
    const privateKey = keys.exportKey('private');

    console.log(publicKey);
    console.log(privateKey);
}

getRSAKeys();
