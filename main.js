"use strict";

// Import parts of electron to use
const { app, ipcMain } = require("electron");
const path = require("path");
const { createWindow } = require("./srv/window");
const { parseUrl } = require("./srv/feed");
const { setOptions, getOptions } = require("./srv/options");

const APP_OPTIONS = getOptions();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const DEV = process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath);

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === "win32") {
  app.commandLine.appendSwitch("high-dpi-support", "true");
  app.commandLine.appendSwitch("force-device-scale-factor", "1");
}

app.on("ready", () => createWindow(APP_OPTIONS, DEV));

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  setOptions(APP_OPTIONS);
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow(APP_OPTIONS);
  }
});

ipcMain.on("initFeeder", (event, urls) => {
  for (let i in urls) {
    parseUrl(urls[i], event);
  }
});

/**
 * Options
 */
ipcMain.on("getOptions", event => {
  event.returnValue = APP_OPTIONS;
});

ipcMain.on("setOptions", (event, options) => {
  setOptions(options);
});
