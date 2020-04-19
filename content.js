
// console.log("definition extension running");

window.addEventListener('mouseup', function getSelectedText() {
    let selectedText = window.getSelection().toString().trim();    
    // console.log(selectedText);
    if (selectedText.length > 0) {
        let message = {
        text: selectedText
        };
        chrome.runtime.sendMessage(message);
    }
});
