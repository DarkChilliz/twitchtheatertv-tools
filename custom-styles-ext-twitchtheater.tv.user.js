// ==UserScript==
// @name         custom-styles-ext-twitchtheater.tv.user.js
// @namespace    https://github.com/DarkChilliz
// @match         *://*twitchtheater.tv/*
// @run-at        document-start
// @grant        none
// @version      0.0.0.0001
// @updateURL    https://github.com/DarkChilliz/custom-styles-ext-twitchtheater.tv/raw/main/custom-styles-ext-twitchtheater.tv.user.js
// @downloadURL  https://github.com/DarkChilliz/custom-styles-ext-twitchtheater.tv/raw/main/custom-styles-ext-twitchtheater.tv.user.js
// @author       darkchilliz
// @description  30/09/2022, 3:29:15 am

// @grant        GM_addStyle
// @grant        GM_getResourceText

// @resource     IMPORTED_CSS file:///X:/GitHub/custom-styles-ext-twitchtheater.tv/js/main.css
// @resource     html /html/content.html
// @resource     icon1 /img/playerstyle.png
// @resource     icon2 /img/functionsmenu.png
// @resource     icon3 /img/favicon-192.png

// ==/UserScript==


(function() {
    'use strict';
    const my_css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(my_css);
});














// #####################################################################################

function createFuncMenuDiv() {
    var funcMenuDiv = document.createElement("div");
    funcMenuDiv.id = "funcMenuDiv";
    document.body.insertBefore(funcMenuDiv, document.getElementById("menudiv"));
}

function onReceiveImgURL(funcMenuDivHtml, playerStyleImg, functionsMenuImg) {
    document.getElementById("funcMenuDiv").outerHTML = funcMenuDivHtml;

    var playerStyleImgObj = document.getElementById("playerStyleImg"),
        functionsMenuImgObj = document.getElementById("functionsMenuImg");

    //playerStyleImg
    playerStyleImgObj.src = playerStyleImg;

    //functionsMenuImg
    functionsMenuImgObj.src = functionsMenuImg;

    var event = new CustomEvent("triggerScript");
    document.dispatchEvent(event);
}

(function () {
    var script = document.createElement('script'),//https://stackoverflow.com/questions/9515704

        isFirefox = typeof InstallTrigger !== 'undefined',//https://stackoverflow.com/questions/9847580
        isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime),

        //content.html
        txtFile = new XMLHttpRequest(),
        sContentHTML = "html/content.html",

        //createFuncMenuDiv()
        sPlayerStyleURL = "img/playerstyle.png",
        sFunctionsMenuURL = "img/functionsmenu.png",

        //main.js
        sScriptURL = "js/main.js",

        //main.css
        sMainCSS_URL = "css/main.css";

    if (isChrome == true) {//https://stackoverflow.com/questions/32344868 https://developer.chrome.com/extensions/extension#method-getURL
        script.src =        chrome.runtime.getURL(sScriptURL);
        sFunctionsMenuURL = chrome.runtime.getURL(sFunctionsMenuURL);
        sPlayerStyleURL =   chrome.runtime.getURL(sPlayerStyleURL);
        sContentHTML =      chrome.runtime.getURL(sContentHTML);
        sMainCSS_URL =      chrome.runtime.getURL(sMainCSS_URL);
    }
    else if (isFirefox == true) {//https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/getURL
        script.src =        browser.runtime.getURL(sScriptURL);
        sFunctionsMenuURL = browser.runtime.getURL(sFunctionsMenuURL);
        sPlayerStyleURL =   browser.runtime.getURL(sPlayerStyleURL);
        sContentHTML =      browser.runtime.getURL(sContentHTML);
        sMainCSS_URL =      browser.runtime.getURL(sMainCSS_URL);
    }

    createFuncMenuDiv();

    //content.html
    txtFile.open("GET", sContentHTML, true);//https://forums.tumult.com/t/2129
    txtFile.onreadystatechange = function () {
        if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse
            if (txtFile.status === 200) {  // Makes sure its found the file
                script.onload = function() {
                    onReceiveImgURL(txtFile.responseText, sPlayerStyleURL, sFunctionsMenuURL);
                    this.remove();
                };
            }
        }
    }
    txtFile.send(null);

    //main.js
    (document.head || document.documentElement).appendChild(script);

    //main.css
    var style = document.createElement('link');//https://stackoverflow.com/questions/9721344
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = sMainCSS_URL;
    (document.head || document.documentElement).appendChild(style);
})();