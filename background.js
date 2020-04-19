// console.log('background running');

chrome.runtime.onMessage.addListener(receiver);

chrome.runtime.onInstalled.addListener(installScript);

chrome.commands.onCommand.addListener(function(command) {
    console.log('onCommand event received for message: ', command);
});

window.word = 'no text selected';

function receiver(request, sender, sendResponse) {
    //   console.log(request);
    word = request.text;
}

// Installing contentScript in all open tabs
function installScript(details){
    // console.log('Installing content script in all tabs.');
    let params = {
        currentWindow: true
    };
    chrome.tabs.query(params, function gotTabs(tabs){
        const contentjsFile = chrome.runtime.getManifest().content_scripts[0].js[0];
        
        // For developers: No error when refresing in chrome://extensions
        const regex = RegExp('chrome*');
        for (let index = 0; index < tabs.length; index++) {
            if(!regex.test(tabs[index].url)){
                chrome.tabs.executeScript(tabs[index].id, {
                    file: contentjsFile
                },
                result => {
                    const lastErr = chrome.runtime.lastError;
                    if (lastErr) {
                        console.error('tab: ' + tabs[index].id + ' lastError: ' + JSON.stringify(lastErr));
                    }
                })
            }
        }
    });    
}
