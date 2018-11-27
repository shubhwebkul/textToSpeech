/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// default values\n    var selectedText = window.getSelection();\n    var speechSynthesis = window.speechSynthesis;\n\n    let createActionElement = ({id, classes, style, title}) => {\n        let createdElement = document.createElement('i');\n\n        createdElement.id = id;\n        createdElement.title = title;\n        createdElement.style = style;\n        createdElement.className = classes;\n\n        return createdElement;\n    }\n\n    window.onload = () => {\n        let actionButtons = document.getElementById('action-buttons');\n\n        var playButton = document.playButton = createActionElement({id: 'play', classes:'fa fa-play', style: 'font-size:24px;cursor: pointer;', title: 'play'})\n        var pauseButton = document.pauseButton = createActionElement({id: 'pause', classes:'fa fa-pause', style: 'font-size:24px;cursor: pointer;display:none;', title: 'pause'})\n        var stopButton = document.stopButton = createActionElement({id: 'stop', classes:'fa fa-stop', style: 'font-size:24px;cursor: pointer;display:none;', title: 'stop'})\n        var resumeButton = document.resumeButton = createActionElement({id: 'resume', classes:'fa fa-play-circle', style: 'font-size:24px;cursor: pointer;display:none;', title: 'resume'})\n        var copyButton = document.copyButton = createActionElement({id: 'copy', classes:'fa fa-copy', style: 'font-size:24px;cursor: pointer;', title: 'copy'})\n\n        actionButtons.appendChild(playButton);\n        actionButtons.appendChild(pauseButton);\n        actionButtons.appendChild(stopButton);\n        actionButtons.appendChild(resumeButton);\n        actionButtons.appendChild(copyButton);\n\n        // addeventlisners\n        playButton.addEventListener('mousedown', event => speakLady(event));\n        pauseButton.addEventListener('mousedown', event => pauseLady(event));\n        stopButton.addEventListener('mousedown', event => stopLady(event));\n        resumeButton.addEventListener('mousedown', event => resumeLady(event));\n        copyButton.addEventListener('mousedown', event => copySelectedData(event, 'targetField'));\n    };\n\n    // self invoking function(will execute on window load)\n    (() => {\n        // clear speaking lady before loading the page\n        speechSynthesis.cancel();\n\n        document.addEventListener('click', event => {\n            event = event || window.target;\n            event.preventDefault();\n\n            let selectedTextObject = new SpeechSynthesisUtterance(selectedText);\n            if(selectedTextObject.text) {\n                onTextSelection();\n            } else {\n                onTextNotSelected();\n            }\n            \n            if(event.target.className.includes('close-alert'))\n                closeAlert({'event': event, 'action': 'success'})\n        });\n\n        document.addEventListener('dblclick', event => {\n            event = event || window.target;\n            event.preventDefault();\n\n            let selectedTextObject = new SpeechSynthesisUtterance(selectedText);\n            if(selectedTextObject.text) {\n                onTextSelection();\n            } else {\n                onTextNotSelected();\n            }\n        });\n    })();\n\n    // event when text is selected\n    let onTextSelection = () => {\n        actionButtonCollection = document.getElementById('action-buttons');\n        if(actionButtonCollection)\n            actionButtonCollection.style.visibility = \"visible\";\n    }\n\n    // event when text is selected\n    let onTextNotSelected = () => {\n        actionButtonCollection = document.getElementById('action-buttons');\n        if(actionButtonCollection)\n            actionButtonCollection.style.visibility = \"hidden\";\n    }\n\n    // confirm before reloading the page\n    window.onbeforeunload = () => {\n        speechSynthesis.cancel();\n    };\n\n    // show and hide buttons using this function\n    let manageSpeechButtons = ({playBtn, pauseBtn, stopBtn, resumeBtn}) => {\n        document.playButton.style.display = playBtn;\n        document.pauseButton.style.display = pauseBtn;\n        document.stopButton.style.display = stopBtn;\n        document.resumeButton.style.display = resumeBtn;\n    }\n\n// TextToSpeech related functions\n    // let lady speak the selected text\n    let speakLady = e => {\n        e = e || window.event;\n        e.preventDefault();\n        let selectedTextObject = new SpeechSynthesisUtterance(selectedText);\n        if(selectedTextObject.text) {\n            speechSynthesis.speak(selectedTextObject);\n\n            manageSpeechButtons({\n                'playBtn': \"none\",\n                'pauseBtn': \"unset\",\n                'stopBtn': \"unset\",\n                'resumeBtn': \"none\",\n            })\n            showAlert({'action': 'success', message: \"Playing\", isRemove: true});\n        }\n\n        // addeventlistner on completing the text speech\n        selectedTextObject.onend = () => {\n            manageSpeechButtons({\n                'playBtn': \"unset\",\n                'pauseBtn': \"none\",\n                'stopBtn': \"none\",\n                'resumeBtn': \"none\",\n            })\n            showAlert({'action': 'success', message: \"Completed\", isRemove: true});\n        }\n    };\n\n    // stop lady to speech the selected text\n    let stopLady = e => {\n        e = e || window.event;\n        e.preventDefault();\n\n        manageSpeechButtons({\n            'playBtn': \"unset\",\n            'pauseBtn': \"none\",\n            'stopBtn': \"none\",\n            'resumeBtn': \"none\",\n        })\n        showAlert({'action': 'error', message: \"You stopped TextToSpeech\", isRemove: true});\n\n        speechSynthesis.cancel();\n    };\n\n    // pause speech and enable resume button\n    let pauseLady = e => {\n        e = e || window.event;\n        e.preventDefault();\n\n        manageSpeechButtons({\n            'playBtn': \"none\",\n            'pauseBtn': \"none\",\n            'stopBtn': \"unset\",\n            'resumeBtn': \"unset\",\n        })\n        showAlert({'action': 'success', message: \"You just paused textToSpeech\", isRemove: true});\n        \n        speechSynthesis.pause();\n    };\n\n    // resume to paused speech\n    let resumeLady = e => {\n        e = e || window.event;\n        e.preventDefault();\n\n        manageSpeechButtons({\n            'playBtn': \"none\",\n            'pauseBtn': \"unset\",\n            'stopBtn': \"unset\",\n            'resumeBtn': \"none\",\n        })\n        showAlert({'action': 'success', message: \"textToSpeech started again\", isRemove: true});\n\n        speechSynthesis.resume();\n    };\n\n// copy related functions\n    let copySelectedData = (e, id) => {\n        e = e || window.event;\n        e.preventDefault();\n        if(selectedText.type !== \"None\") {\n            let targetField = document.getElementById(id);\n            \n            let textArea = document.createElement('textarea');\n            textArea.value = selectedText;\n            targetField.appendChild(textArea);\n            textArea.focus();\n            textArea.select();\n            document.execCommand('copy');\n            targetField.removeChild(textArea);\n\n            // addTitleToElem({elem: copyButton, msg: 'copied', time: 2000});\n            showAlert({'action': 'success', message: \"Text Copied\", isRemove: true});\n        }\n    }\n\n// Alert Related functions\n    let showAlert = ({action, time, message, isRemove}) => {\n        time = time || 4000;\n        isRemove = isRemove || false;\n        let alertId = createAlertElement({createElementFor: action, isRemove: isRemove});\n        let targetElementCollection = document.getElementsByClassName(action);\n        let targetElementArrayCollection = Array.prototype.slice.call( targetElementCollection );\n\n        if(targetElementArrayCollection) {\n            targetElementArrayCollection.forEach(element => {\n                if(element.alertId == alertId) {\n                    element.innerHTML += message;\n                    element.style.display = \"block\";\n\n                    setTimeout(() => {\n                        if(element && element.parentNode) {\n                            element.parentNode.removeChild(element);\n                        }\n                    }, time);\n                }\n            })\n        }\n    }\n\n    let closeAlert = ({event, action}) => {\n        event = event || window.event;\n        let successElementCollection = document.getElementsByClassName('success');\n        let errorElementCollection = document.getElementsByClassName('error');\n        let successElementArrayCollection = Array.prototype.slice.call( successElementCollection )\n        let errorElementArrayCollection = Array.prototype.slice.call( errorElementCollection )\n\n        let elementArrayCollection = successElementArrayCollection.concat(errorElementArrayCollection);\n\n        let targetElement = elementArrayCollection.filter(element => {\n            if(element.alertId == event.target.parentNode.parentNode.alertId)\n                return true;\n            return false;\n        })\n\n        if(targetElement && targetElement[0])\n            targetElement[0].style.display = \"none\";\n\n    }\n\n    let createAlertElement = ({createElementFor, isRemove}) => {\n        let body = document.getElementsByTagName('body')[0];\n        let mainContainer = document.getElementsByClassName('alert-collection');\n\n        if(!(mainContainer && mainContainer[0])) {\n            mainContainer = document.createElement('div');\n            mainContainer.classList.add('alert-collection')\n        } else {\n            mainContainer = mainContainer[0];\n        }\n\n        isRemove ? mainContainer.innerHTML = '' : '';\n\n        let innerContainer = document.createElement('div');\n        innerContainer.classList.add('alert');\n        innerContainer.classList.add(createElementFor);\n        innerContainer.id = createElementFor;\n        let alertId = Math.round(Math.random()*10000);\n        innerContainer.alertId = alertId;\n\n        let alertDefaultText = document.createElement('strong');\n        alertDefaultText.innerHTML = createElementFor + ' ! ';\n        alertDefaultText.style.textTransform = 'capitalize';\n\n        let span = document.createElement('span');\n        let crossIcon = document.createElement('i');\n        crossIcon.className = \"fa fa-close close-alert\";\n        crossIcon.style = \"font-size:20px\";\n        span.appendChild(crossIcon);\n        \n        \n        innerContainer.appendChild(span);\n        innerContainer.appendChild(alertDefaultText);\n        mainContainer.appendChild(innerContainer);\n        body.appendChild(mainContainer);\n        \n        return alertId;\n    }\n\n// create element\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });