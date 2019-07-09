const url = require("url");
const { BrowserWindow, Menu } = require("electron");
const { parseUrl } = require("./feed");

class window {
  windowHnd = null;
  options = {};
  devMode = false;

  /**
   * Create app window
   */
  create = (OPTIONS, DEV) => {
    if (this.windowHnd) return this.windowHnd;

    this.options = OPTIONS;
    this.devMode = DEV;

    this.windowHnd = new BrowserWindow({
      title: 'RSS Feeder',
      width: this.options.window.size.width,
      height: this.options.window.size.height,
      minWidth: 300,
      minHeight: 40,
      alwaysOnTop: this.options.window.pinned,
      frame: false,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
    this.windowHnd.setPosition(this.options.window.position.top, this.options.window.position.left);
    this.loadContent();
    this.setListeners();
  }

  /**
   * Load content stream to window
   */
  loadContent = () => {
    if (this.devMode && process.argv.indexOf("--noDevServer") === -1) {
      this.windowHnd.loadURL(url.format({ protocol: "http:", host: "localhost:8080", pathname: "index.html", slashes: true }));
    } else {
      this.windowHnd.loadURL(url.format({ protocol: "file:", pathname: path.join(__dirname, "dist", "index.html"), slashes: true }));
    }
  }

  /**
   * Set all listeners on window
   */
  setListeners = () => {
    // Show window after it's ready
    this.windowHnd.once("ready-to-show", () => {
      this.windowHnd.setMenu(Menu.buildFromTemplate([]));
      this.windowHnd.setTitle('RSS Feeder');
      this.windowHnd.show();
      if (this.devMode) { // Open the DevTools automatically if developing
        this.windowHnd.webContents.openDevTools();
      }
    });

    this.windowHnd.webContents.on('did-finish-load', () => this.runFeeder());

    // Close app after closing window
    this.windowHnd.on("closed", () => {
      this.windowHnd = null;
    });

    // Handle option save on closing
    this.windowHnd.on("close", () => {
      this.options.window.position.top = this.windowHnd.getPosition()[0];
      this.options.window.position.left = this.windowHnd.getPosition()[1];
      this.options.window.size.width = this.windowHnd.getSize()[0];
      this.options.window.size.height = this.windowHnd.getSize()[1];
      this.options.window.pinned = this.windowHnd.isAlwaysOnTop();
      this.options.window.maximized = this.windowHnd.isMaximized();
    });
  }

  runFeeder = () => {
    let promises = [];

    for (let i = 0; i < this.options.sources.length; ++i) {
      promises.push(parseUrl(this.options.sources[i]));
    }

    Promise.all(promises).then(feeds => {
      this.windowHnd.webContents.send('newFeeds', feeds);
    })
  }

  /**
   * Get window handler
   */
  getWindow = () => {
    return this.windowHnd;
  }
}

module.exports = { window };
