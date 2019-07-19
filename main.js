"use strict";

// Import parts of electron to use
const { errorDefaultPath, handleException } = require("./srv/error");
const { app, ipcMain } = require("electron");
const { window } = require("./srv/window");
const { setOptions, getOptions } = require("./srv/options");

const mainWindow = new window();
const DEV = process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath);
const APP_OPTIONS = getOptions(mainWindow.getWindow());

try {
  // Temporary fix broken high-dpi scale factor on Windows (125% scaling)
  // info: https://github.com/electron/electron/issues/9691
  if (process.platform === "win32") {
    app.commandLine.appendSwitch("high-dpi-support", "true");
    app.commandLine.appendSwitch("force-device-scale-factor", "1");
  }

  app.on("ready", () => mainWindow.create(APP_OPTIONS, DEV));

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    setOptions(APP_OPTIONS, mainWindow.getWindow());
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (mainWindow.getWindow() === null) {
      mainWindow.create(APP_OPTIONS, DEV);
    }
  });

  // Options getter for window
  ipcMain.on("getOptions", event => {
    event.returnValue = APP_OPTIONS;
  });

  // Options setter for window
  ipcMain.on("setOptions", (event, options) => {
    setOptions(options, mainWindow.getWindow());
  });

} catch (error) {
  handleException("App error: " + error, 'unhandled', APP_OPTIONS.logDir || errorDefaultPath, mainWindow ? mainWindow.getWindow() : undefined);
}