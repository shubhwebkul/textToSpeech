// default values
    var selectedText = window.getSelection();
    var speechSynthesis = window.speechSynthesis;
    var playButton = document.getElementById('play');
    var pauseButton = document.getElementById('pause');
    var stopButton = document.getElementById('stop');
    var resumeButton = document.getElementById('resume');
    var copyButton = document.getElementById('copy');

    // self invoking function(will execute on window load)
    (() => {
        // clear speaking lady before loading the page
        speechSynthesis.cancel();

        document.addEventListener('click', () => {
            let selectedTextObject = new SpeechSynthesisUtterance(selectedText);
            if(selectedTextObject.text) {
                onTextSelection();
            } else {
                onTextNotSelected();
            }
        });
        document.addEventListener('dblclick', () => {
            let selectedTextObject = new SpeechSynthesisUtterance(selectedText);
            if(selectedTextObject.text) {
                onTextSelection();
            } else {
                onTextNotSelected();
            }
        });

        // addeventlisners
        playButton.addEventListener('mousedown', event => speakLady(event));
        pauseButton.addEventListener('mousedown', event => pauseLady(event));
        stopButton.addEventListener('mousedown', event => stopLady(event));
        resumeButton.addEventListener('mousedown', event => resumeLady(event));
        copyButton.addEventListener('mousedown', event => copySelectedData(event, 'targetField'));
    })();

    // event when text is selected
    let onTextSelection = () => {
        actionButtons = document.getElementsByClassName('action-buttons');
        if(actionButtons && actionButtons[0])
            actionButtons[0].style.visibility = "visible";
    }

    // event when text is selected
    let onTextNotSelected = () => {
        actionButtons = document.getElementsByClassName('action-buttons');
        if(actionButtons && actionButtons[0])
            actionButtons[0].style.visibility = "hidden";
    }

    // confirm before reloading the page
    window.onbeforeunload = () => {
        speechSynthesis.cancel();
    };

    // show and hide buttons using this function
    let manageSpeechButtons = ({playBtn, pauseBtn, stopBtn, resumeBtn}) => {
        playButton.style.display = playBtn;
        pauseButton.style.display = pauseBtn;
        stopButton.style.display = stopBtn;
        resumeButton.style.display = resumeBtn;
    }

// TextToSpeech related functions
    // let lady speak the selected text
    let speakLady = e => {
        e = e || window.event;
        e.preventDefault();
        let selectedTextObject = new SpeechSynthesisUtterance(selectedText);
        if(selectedTextObject.text) {
            speechSynthesis.speak(selectedTextObject);

            manageSpeechButtons({
                'playBtn': "none",
                'pauseBtn': "unset",
                'stopBtn': "unset",
                'resumeBtn': "none",
            })
        }

        // addeventlistner on completing the text speech
        selectedTextObject.onend = () => {
            manageSpeechButtons({
                'playBtn': "unset",
                'pauseBtn': "none",
                'stopBtn': "none",
                'resumeBtn': "none",
            })
        }
    };

    // stop lady to speech the selected text
    let stopLady = e => {
        e = e || window.event;
        e.preventDefault();

        manageSpeechButtons({
            'playBtn': "unset",
            'pauseBtn': "none",
            'stopBtn': "none",
            'resumeBtn': "none",
        })

        speechSynthesis.cancel();
    };

    // pause speech and enable resume button
    let pauseLady = e => {
        e = e || window.event;
        e.preventDefault();

        manageSpeechButtons({
            'playBtn': "none",
            'pauseBtn': "none",
            'stopBtn': "unset",
            'resumeBtn': "unset",
        })
        
        speechSynthesis.pause();
    };

    // resume to paused speech
    let resumeLady = e => {
        e = e || window.event;
        e.preventDefault();

        manageSpeechButtons({
            'playBtn': "none",
            'pauseBtn': "unset",
            'stopBtn': "unset",
            'resumeBtn': "none",
        })

        speechSynthesis.resume();
    };

// copy related functions
    let copySelectedData = (e, id) => {
        e = e || window.event;
        e.preventDefault();
        if(selectedText.type !== "None") {
            let targetField = document.getElementById(id);
            
            let textArea = document.createElement('textarea');
            textArea.value = selectedText;
            targetField.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            targetField.removeChild(textArea);

            addTitleToElem({elem: copyButton, msg: 'copied'});
        }
    }

    let addTitleToElem = ({elem, msg}) => {
        let titleUpper = document.createElement('span');
        titleUpper.classList.add('title-upper');
        let titleSpan = document.createElement('span');
        titleSpan.classList.add('title-msg');
        titleSpan.innerHTML = msg;

        elem.appendChild(titleUpper);
        elem.appendChild(titleSpan);

        setTimeout(() => {
            elem.removeChild(titleUpper);
            elem.removeChild(titleSpan);
        }, 2000);        
    }

// Alert Related functions
    let showAlert = action => {
        
    }