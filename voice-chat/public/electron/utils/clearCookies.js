async function clearCookies(session, name) {
    await session.cookies.remove('http://localhost', name, (error) => {
        if (error) return console.log(`error removing cookie ${name}`, error);
    });
}

module.exports = clearCookies;
