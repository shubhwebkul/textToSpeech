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

        document.addEventListener('click', event => {
            event = event || window.target;
            event.preventDefault();

            let selectedTextObject = new SpeechSynthesisUtterance(selectedText);
            if(selectedTextObject.text) {
                onTextSelection();
            } else {
                onTextNotSelected();
            }
            
            if(event.target.className.includes('close-alert'))
                closeAlert({'event': event, 'action': 'success'})
        });
        document.addEventListener('dblclick', event => {
            event = event || window.target;
            event.preventDefault();

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
            showAlert({'action': 'success', message: "Playing", isRemove: true});
        }

        // addeventlistner on completing the text speech
        selectedTextObject.onend = () => {
            manageSpeechButtons({
                'playBtn': "unset",
                'pauseBtn': "none",
                'stopBtn': "none",
                'resumeBtn': "none",
            })
            showAlert({'action': 'success', message: "Completed", isRemove: true});
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
        showAlert({'action': 'error', message: "You stopped TextToSpeech", isRemove: true});

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
        showAlert({'action': 'success', message: "You just paused textToSpeech", isRemove: true});
        
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
        showAlert({'action': 'success', message: "textToSpeech started again", isRemove: true});

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

            // addTitleToElem({elem: copyButton, msg: 'copied', time: 2000});
            showAlert({'action': 'success', message: "Text Copied", isRemove: true});
        }
    }

// Alert Related functions
    let showAlert = ({action, time, message, isRemove}) => {
        time = time || 4000;
        isRemove = isRemove || false;
        let alertId = createAlertElement({createElementFor: action, isRemove: isRemove});
        let targetElementCollection = document.getElementsByClassName(action);
        let targetElementArrayCollection = Array.prototype.slice.call( targetElementCollection );

        if(targetElementArrayCollection) {
            targetElementArrayCollection.forEach(element => {
                if(element.alertId == alertId) {
                    element.innerHTML += message;
                    element.style.display = "block";

                    setTimeout(() => {
                        element.parentNode.removeChild(element);
                    }, time);
                }
            })
        }
    }

    let closeAlert = ({event, action}) => {
        event = event || window.event;
        let successElementCollection = document.getElementsByClassName('success');
        let errorElementCollection = document.getElementsByClassName('error');
        let successElementArrayCollection = Array.prototype.slice.call( successElementCollection )
        let errorElementArrayCollection = Array.prototype.slice.call( errorElementCollection )

        let elementArrayCollection = successElementArrayCollection.concat(errorElementArrayCollection);

        let targetElement = elementArrayCollection.filter(element => {
            if(element.alertId == event.target.parentNode.parentNode.alertId)
                return true;
            return false;
        })

        if(targetElement && targetElement[0])
            targetElement[0].style.display = "none";

    }

    let createAlertElement = ({createElementFor, isRemove}) => {
        let body = document.getElementsByTagName('body')[0];
        let mainContainer = document.getElementsByClassName('alert-collection');

        if(!(mainContainer && mainContainer[0])) {
            mainContainer = document.createElement('div');
            mainContainer.classList.add('alert-collection')
        } else {
            mainContainer = mainContainer[0];
        }

        isRemove ? mainContainer.innerHTML = '' : '';

        let innerContainer = document.createElement('div');
        innerContainer.classList.add('alert');
        innerContainer.classList.add(createElementFor);
        innerContainer.id = createElementFor;
        let alertId = Math.round(Math.random()*10000);
        innerContainer.alertId = alertId;

        let alertDefaultText = document.createElement('strong');
        alertDefaultText.innerHTML = createElementFor + ' ! ';
        alertDefaultText.style.textTransform = 'capitalize';

        let span = document.createElement('span');
        let crossIcon = document.createElement('i');
        crossIcon.className = "fa fa-close close-alert";
        crossIcon.style = "font-size:20px";
        span.appendChild(crossIcon);
        
        
        innerContainer.appendChild(span);
        innerContainer.appendChild(alertDefaultText);
        mainContainer.appendChild(innerContainer);
        body.appendChild(mainContainer);
        
        return alertId;
    }
