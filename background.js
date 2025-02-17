async function getRedditPosts(activeTab) {
  const results = await chrome.scripting.executeScript({
    target: { tabId: activeTab.id },
    func: getRedditPostsScriptFn
  });

  if (results.length !== 1) {
    throw new Error("Unexpected number of results");
  }

  const result = results[0];
  if (result.error !== undefined) {
    throw new Error(result.error);
  }

  return result.result;
}

function getRedditPostsScriptFn() {
  const as = Array.from(document.querySelectorAll('a[slot="title"]'));

  return as.map(a => ({
    title: a.innerText,
    href: a.href
  }));
}

let isRunning = false;

async function startRunning() {
  // Ensure not already running.
  if (isRunning) {
    console.warn("Already running");
    return;
  }

  // Get the active tab.
  const activeTab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0];

  // Redirect to Reddit if not already there.
  if (!activeTab.url.includes("reddit.com")) {
    await chrome.tabs.update(activeTab.id, { url: "https://www.reddit.com/" });
  }

  // Get all Reddit posts.
  const posts = await getRedditPosts(activeTab);

  console.log('Posts: ', posts);
}

async function stopRunning() {
  // Ensure already running.
  if (!isRunning) {
    console.warn("Already stopped");
    return;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start") {
    startRunning();
  } else if (message.action === "stop") {
    stopRunning();
  } else {
    console.error(`Unknown action: ${message.action}`);
  }

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
