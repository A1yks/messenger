async function checkToken() {
    const request = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/verify-token`, { credentials: 'include' });
    const result = await request.json();
    return result;
}

export default checkToken;
