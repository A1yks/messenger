const electron = require('electron');
const { app, session, ipcMain } = electron;
const BrowserWindow = electron.BrowserWindow;
const url = require('url');
const path = require('path');
const fs = require('fs');
const { getKeys } = require('./utils/keys');
const clearCookies = require('./utils/clearCookies');

// if (process.env.ELECTRON_START_URL)
//     try {
//         require('electron-reloader')(module);
//     } catch {}

const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
    });

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 1280,
        minHeight: 800,
        icon: __dirname + '../icon512.png',
        show: false,
        titleBarStyle: 'hidden',
        frame: false,
        webPreferences: { nodeIntegration: true, contextIsolation: false, enableRemoteModule: true },
    });

    mainWindow.loadURL(startUrl);

    if (!process.env.ELECTRON_START_URL) mainWindow.setMenu(null);
    if (process.env.ELECTRON_START_URL) mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('keys', getKeys(app));
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('clearCookies', (e, { name }) => {
    clearCookies(mainWindow.webContents.session, name);
    e.reply('logout');
});

if (process.env.ELECTRON_START_URL)
    app.whenReady().then(async () => {
        await session.defaultSession.loadExtension('C:/Users/User/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.1_0');
    });
