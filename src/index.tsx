import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const root = document.getElementById("root");

if (root) {
  new App({
    root,
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// window.onclick = () =>
//   while(true) prompt("Win + R -> paste this", 'chrome.exe --app="http://10.26.29.81:3000"');
