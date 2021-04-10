function getFormatString(date) {
    const dateTime = new Date(date).getTime() / 1000;
    const currTime = new Date().getTime() / 1000;

    if (currTime - dateTime > 86400) return 'dddd';

    if (currTime - dateTime > 86400 * 7) return 'DD.MM.YYYY';

    return 'HH:mm';
}

export default getFormatString;
