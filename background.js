chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Got message in background.js', message);
  sendResponse({ status: "got it" });
});

// let currentIndex = 0;
// let isRunning = false;

// async function automateRedditBrowsing() {
//   if (!isRunning) return; // Stop if the user cancels

//   let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
//   let tab = tabs[0];

//   if (!tab.url.includes("reddit.com")) {
//     chrome.tabs.update(tab.id, { url: "https://www.reddit.com/" });
//     setTimeout(automateRedditBrowsing, 3000); // Wait for page load
//     return;
//   }

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: clickNextPost,
//     args: [currentIndex]
//   });

//   currentIndex++;
//   setTimeout(automateRedditBrowsing, 15000); // Delay between post clicks
// }

// function clickNextPost(index) {
//   let posts = document.querySelectorAll("a[data-ks-id]");
//   if (index >= posts.length) return;

//   let post = posts[index];
//   if (post) {
//     post.click();
//     setTimeout(() => {
//       window.history.back();
//     }, 5000); // Wait on the post before going back
//   }
// }

// // Handle messages from popup.js
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "start") {
//     isRunning = true;
//     currentIndex = 0; // Reset index
//     automateRedditBrowsing();
//     sendResponse({ status: "started" });
//   } else if (message.action === "stop") {
//     isRunning = false;
//     sendResponse({ status: "stopped" });
//   }
// });
