const url = require("url");
const { BrowserWindow, Menu } = require("electron");

const createWindow = (OPTIONS, devMode) => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'RSS Feeder',
    width: OPTIONS.window.size.width,
    height: OPTIONS.window.size.height,
    minWidth: 300,
    minHeight: 40,
    alwaysOnTop: OPTIONS.window.pinned,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.setPosition(OPTIONS.window.position.top, OPTIONS.window.position.left);

  // and load the index.html of the app.
  let indexPath;

  if (devMode && process.argv.indexOf("--noDevServer") === -1) {
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
    mainWindow.setMenu(Menu.buildFromTemplate([]));
    mainWindow.setTitle('RSS Feeder');
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (devMode) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.on("close", function () {
    OPTIONS.window.position.top = mainWindow.getPosition()[0];
    OPTIONS.window.position.left = mainWindow.getPosition()[1];
    OPTIONS.window.size.width = mainWindow.getSize()[0];
    OPTIONS.window.size.height = mainWindow.getSize()[1];
    OPTIONS.window.pinned = mainWindow.isAlwaysOnTop();
    OPTIONS.window.maximized = mainWindow.isMaximized();
  });
};

module.exports = { createWindow };
