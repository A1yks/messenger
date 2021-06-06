function getFormatString(date) {
    const dateTime = new Date(date).getTime() / 1000;
    const currTime = new Date().getTime() / 1000;

    if (currTime - dateTime > 86400 * 7) return 'DD.MM.YYYY';

    if (currTime - dateTime > 86400) return 'dddd';

    return 'HH:mm';
}

export default getFormatString;
