async function checkRefreshToken() {
    const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/refresh-tokens`, { credentials: 'include' });
    const result = await request.json();
    return result;
}

export default checkRefreshToken;
