async function checkToken() {
    const request = await fetch('/api/auth/verify-token');
    const result = await request.json();
    return result;
}

export default checkToken;
