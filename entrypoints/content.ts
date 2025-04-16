export default defineContentScript({
  // matches: ['*://*.google.com/*'],
  matches: ['<all_urls>'],
  main() {
    console.log('Hello content.');
  },
});
