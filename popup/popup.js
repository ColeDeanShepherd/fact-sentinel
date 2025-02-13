document.getElementById("start").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "start" }, (response) => {
        console.log(response.status);
    });
});

document.getElementById("stop").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "stop" }, (response) => {
        console.log(response.status);
    });
});


// const sendMessageId = document.getElementById("sendmessageid");
// if (sendMessageId) {
//     sendMessageId.onclick = function() {
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//             chrome.tabs.sendMessage(
//                 tabs[0].id,
//                 {
//                     url: chrome.runtime.getURL("images/stars.jpeg"),
//                     imageDivId: crypto.randomUUID(),
//                     tabId: tabs[0].id
//                 },
//                 function(response) {
//                     window.close();
//                 }
//             );
//         });
//     };
// }
