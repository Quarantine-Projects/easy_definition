var bgpage = chrome.extension.getBackgroundPage();
var word = bgpage.word.trim();

document.addEventListener('DOMContentLoaded', function showWordDef() {
    if (word.length > 0) {
        // console.log(word);

        let apiKey = 'Token fa0b31f97c28f6f15bc2378159351287c5224d1d';
        let url = `https://owlbot.info/api/v4/dictionary/${word}`.toLowerCase();
        
        fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": apiKey
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(data);
            document.getElementById("definitionArea").innerText = data.definitions[0].definition;
            document.getElementById("searchWeb").setAttribute('href', `https://www.google.com/search?q=define+${word}`);
            document.getElementById("searchWeb").setAttribute('target', `https://www.google.com/search?q=define+${word}`);
        })
        .catch((error) => {
            document.getElementById("definitionArea").innerText = 'No definition found (Choose another word or refresh site)';
            document.getElementById("searchWeb").setAttribute('href', `https://www.google.com/search?q=define+${word}`);
            document.getElementById("searchWeb").setAttribute('target', `https://www.google.com/search?q=define+${word}`);
        });
    }
});