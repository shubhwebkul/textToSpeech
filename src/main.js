// default values
    var selectedText = window.getSelection();
    var speechSynthesis = window.speechSynthesis;

    let createActionElement = ({id, classes, style, title}) => {
        let createdElement = document.createElement('i');

        createdElement.id = id;
        createdElement.title = title;
        createdElement.style = style;
        createdElement.className = classes;

        return createdElement;
    }

    let addImportantTags = () => {
        let actionButtonsDiv = document.createElement('div');
        let actionButtonsPointer = document.createElement('i');
        let actionButtonsSpan = document.createElement('span');

        actionButtonsDiv.id = 'action-buttons';
        actionButtonsPointer.id = 'text-pointer';
        actionButtonsSpan.id = 'action-buttons-span';

        let body = document.querySelector('body');

        actionButtonsDiv.appendChild(actionButtonsSpan);
        actionButtonsDiv.appendChild(actionButtonsPointer);

        body.appendChild(actionButtonsDiv);
    }

    window.onload = () => {
        addImportantTags();
        let actionButtonsSpan = document.getElementById('action-buttons-span');

        var playButton = document.playButton = createActionElement({id: 'play', classes:'fa fa-play', style: 'font-size:24px;cursor: pointer;padding-right: 10px;', title: 'play'})
        var pauseButton = document.pauseButton = createActionElement({id: 'pause', classes:'fa fa-pause', style: 'font-size:24px;cursor: pointer;padding-right: 10px;display:none;', title: 'pause'})
        var stopButton = document.stopButton = createActionElement({id: 'stop', classes:'fa fa-stop', style: 'font-size:24px;cursor: pointer;padding-right: 10px;display:none;', title: 'stop'})
        var resumeButton = document.resumeButton = createActionElement({id: 'resume', classes:'fa fa-play-circle', style: 'font-size:24px;cursor: pointer;padding-right: 10px;display:none;', title: 'resume'})
        var copyButton = document.copyButton = createActionElement({id: 'copy', classes:'fa fa-copy', style: 'font-size:24px;cursor: pointer;padding-right: 10px;', title: 'copy'})

        var dividerButton = document.createElement('div');
        dividerButton.id = "divider";

        actionButtonsSpan.appendChild(playButton);
        actionButtonsSpan.appendChild(pauseButton);
        actionButtonsSpan.appendChild(stopButton);
        actionButtonsSpan.appendChild(resumeButton);
        actionButtonsSpan.appendChild(dividerButton);
        actionButtonsSpan.appendChild(copyButton);

        // addeventlisners
        playButton.addEventListener('mousedown', event => speakLady(event));
        pauseButton.addEventListener('mousedown', event => pauseLady(event));
        stopButton.addEventListener('mousedown', event => stopLady(event));
        resumeButton.addEventListener('mousedown', event => resumeLady(event));
        copyButton.addEventListener('mousedown', event => copySelectedData(event, 'targetField'));
    };

    // self invoking function(will execute on window load)
    (() => {
        let displayButtons = document.getElementById('action-buttons');
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
            
            if(event.target.className.includes('close-alert')) {
                closeAlert({'event': event, 'action': 'success'})
            }
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

        // load css file
        let headElement = document.querySelector('head');
        let customStyleSheet = document.createElement('link');
        let fontAwesomeStyleSheet = document.createElement('link');

        fontAwesomeStyleSheet.rel = customStyleSheet.rel = "stylesheet";
        customStyleSheet.href = "http://localhost/JS/textToSpeech/dist/style.css";
        fontAwesomeStyleSheet.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
        
        headElement.appendChild(customStyleSheet);
        headElement.appendChild(fontAwesomeStyleSheet);
    })();

    // event when text is selected
    let onTextSelection = () => {
        windowSelection = window.getSelection();
        windowSelectionRange = windowSelection.getRangeAt(0); //get the text range
        windowSelectionPosition = windowSelectionRange.getBoundingClientRect();

        actionButtonCollection = document.getElementById('action-buttons');
        if(actionButtonCollection) {
            let leftShift = (windowSelectionPosition.left >= 60) ? (windowSelectionPosition.left - 60) : windowSelectionPosition.left;
            let topShift = (windowSelectionPosition.top >= 60) ? (windowSelectionPosition.top - 60) : windowSelectionPosition.top;
            actionButtonCollection.style.display = "unset";
            actionButtonCollection.style.left = leftShift + "px";
            actionButtonCollection.style.top = topShift + "px";
        }
    }

    // event when text is selected
    let onTextNotSelected = () => {
        actionButtonCollection = document.getElementById('action-buttons');
        if(actionButtonCollection) {
            // stop speech if user deselects text
            speechSynthesis.cancel();
            actionButtonCollection.style.display = "none";
        }
    }

    // confirm before reloading the page
    window.onbeforeunload = () => {
        speechSynthesis.cancel();
    };

    // show and hide buttons using this function
    let manageSpeechButtons = ({playBtn, pauseBtn, stopBtn, resumeBtn}) => {
        document.playButton.style.display = playBtn;
        document.pauseButton.style.display = pauseBtn;
        document.stopButton.style.display = stopBtn;
        document.resumeButton.style.display = resumeBtn;
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

        // stop speech if user selects to copy data
        speechSynthesis.cancel();

        if(selectedText.type !== "None") {
            let targetField = document.getElementById(id);
            
            let textArea = document.createElement('textarea');
            textArea.value = selectedText;
            targetField.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            targetField.removeChild(textArea);

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
                        if(element && element.parentNode) {
                            element.parentNode.removeChild(element);
                        }
                    }, time);
                }
            })
        }
    }

    let closeAlert = ({event, action}) => {
        event = event || window.event;
        event.preventDefault();

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
