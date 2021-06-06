import { decryptAesKey } from './keys';

function getKeys(publicRSAKey, privateRSAKey, cb) {
    return async (dispatch) => {
        const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/keys/getKeys`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicRSAKey }),
            credentials: 'include',
        });
        const { success, keys } = await request.json();
        const decryptedKeys = {};

        for (const chatId in keys) {
            decryptedKeys[chatId] = decryptAesKey(privateRSAKey, keys[chatId]);
        }

        if (success) {
            dispatch({ type: 'SET_AES_KEYS', keys: decryptedKeys });
            if (cb) cb();
        }
    };
}

export default getKeys;
