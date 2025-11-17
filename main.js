const { app, BrowserWindow } = require("electron");
const version = app.getVersion();

function createWindow() {
  const win = new BrowserWindow({
    title: `PPEPDMATENG v${version}`,
    width: 800,
    height: 600
  });

  win.loadURL("https://sites.google.com/view/ppedmateng/");
}

const path = require("path");
const dns = require("dns");

const ONLINE_URL = "https://sites.google.com/view/ppedmateng/";
const OFFLINE_PATH = path.join(__dirname, "offline", "Home.html");

function isOnline(callback) {
  dns.lookup("google.com", err => {
    callback(!err);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: { preload: path.join(__dirname, "preload.js") }
  });

  isOnline(online => {
    if (online) {
      win.loadURL(ONLINE_URL);
    } else {
      win.loadFile(OFFLINE_PATH);
    }
  });
}

app.whenReady().then(() => {
  createWindow();

   app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
