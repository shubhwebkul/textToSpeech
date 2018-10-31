let speakLady = (() => {
    let msg = window.getSelection();
    let msgObject = new SpeechSynthesisUtterance(msg);
    window.speechSynthesis.speak(msgObject);
});

let stopLady = (() => {
    window.speechSynthesis.cancel();
});

let pauseLady = (() => {
    window.speechSynthesis.pause();
});

let resumeLady = (() => {
    window.speechSynthesis.resume();
});