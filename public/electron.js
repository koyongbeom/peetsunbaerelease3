const { app, BrowserWindow, ipcMain, Notification} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const keytar = require("keytar");
const { KeyboardTabSharp } = require("@mui/icons-material");
const { stringify } = require("querystring");
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1520,
    height: 927,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      devTools: isDev,
      preload: path.join(__dirname, "..", "preload.js"),
      icon: path.join(__dirname, "img", "logo.ico")
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.setResizable(true);
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.focus();

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("setToken", (event, token) => {
  keytar.setPassword("peetsunbae", "koyongbeom@gmail.com", token).then(result => {
    event.returnValue = result;
  })
})

ipcMain.on("getToken", (event) => {
  keytar.getPassword("peetsunbae", "koyongbeom@gmail.com").then(result => {
    event.returnValue = result;
  })
})

//notification-------------------------------------------------------------
ipcMain.on("notification", (event, title, body) => {
  new Notification({ title: title, body: body }).show();
})
//------------------------------------------------------------------------

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

