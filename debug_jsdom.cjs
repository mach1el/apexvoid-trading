const { JSDOM } = require('jsdom');
const http = require('http');

JSDOM.fromURL("http://localhost:5173/", {
  runScripts: "dangerously",
  resources: "usable",
  pretendToBeVisual: true
}).then(dom => {
  dom.window.console.error = function() {
    console.error("JSDOM ERROR:", ...arguments);
  };
  dom.window.console.warn = function() {
    console.warn("JSDOM WARN:", ...arguments);
  };
  
  dom.window.addEventListener("error", event => {
    console.error("JSDOM GLOBAL ERROR:", event.error);
  });

  dom.window.addEventListener("unhandledrejection", event => {
    console.error("JSDOM UNHANDLED REJECTION:", event.reason);
  });
  
  setTimeout(() => {
    console.log("Finished waiting for JSDOM.");
    process.exit(0);
  }, 5000);
}).catch(err => {
  console.error("Failed to load:", err);
});
