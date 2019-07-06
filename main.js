"use strict";

// Import parts of electron to use
const { app, ipcMain, shell, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const packageData = require(path.join(__dirname, "package.json"));
let Parser = require("rss-parser");
let parser = new Parser();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let DEV =
  process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath);

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === "win32") {
  app.commandLine.appendSwitch("high-dpi-support", "true");
  app.commandLine.appendSwitch("force-device-scale-factor", "1");
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  let indexPath;

  if (DEV && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (DEV) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  let progress = 0;

  setInterval(() => {
    progress = progress >= 1 ? 0 : progress + 0.1;
    //console.log("set progress to:", progress);
    mainWindow.setProgressBar(progress);
  }, 500);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("getFeed", event => {
  (async () => {
    try {
      let feed = await parser.parseURL("https://www.hongkiat.com/blog/feed/");
      event.reply("feedData", {
        title: feed.title,
        items: feed.items,
        feed: feed
      });
    } catch (error) {
      console.error("Error in fetching the website");
      event.reply("error", "Error in fetching the website");
    }
  })();
});

let currentTheme = undefined;

ipcMain.on("changeTheme", (event, value) => {
  currentTheme = value;
  event.returnValue = currentTheme;
});

ipcMain.on("getTheme", (event, value) => {
  // value = value || "light";
  // let e = path.join(__dirname, "theme", value + ".js");
  // console.log(e);
  // event.returnValue = require(path.join(__dirname, "theme", value + ".js"));
});
