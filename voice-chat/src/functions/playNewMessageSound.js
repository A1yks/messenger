import sound from '../ringtones/newMessage.mp3';

function playNewMessageSound() {
    const audio = new Audio();
    audio.src = sound;
    audio.play();
}

export default playNewMessageSound;
