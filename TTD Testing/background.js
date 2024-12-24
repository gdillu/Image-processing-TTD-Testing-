chrome.runtime.onInstalled.addListener(() => {
    console.log("Pilgrimage Ticket Booker extension installed.");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'formData') {
        // Relay the message to content scripts
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, request);
        });
    }
});

