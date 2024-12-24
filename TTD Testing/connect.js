console.log("it startd running")
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'formData') {
        console.log('Received form data:', request.data);
        // Here you can add further processing of the data if needed
    }
});
