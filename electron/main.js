const { app, BrowserWindow, ipcMain, session } = require('electron');
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
const isDev = require('electron-is-dev');
const os = require('os');
const path = require('path');

require('dotenv').config()

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // mainWindow.setMenu(null);
    mainWindow.maximize();

    const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startUrl);

    // if(isDev) {
    //     BrowserWindow.
    //     BrowserWindow.addDevToolsExtension(path.join(os.homedir(), '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0'));
    //     BrowserWindow.addDevToolsExtension(path.join(os.homedir(), '/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0'));
    // }

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// const reactDevtoolsExtensionPath = path.join(os.homedir(), `/AppData/Local/Google/Chrome/User Data/Default/Extensions/${process.env.REACT_DEVTOOLS_EXTENSION_ID}/${process.env.REACT_DEVTOOLS_VERSION}`);

app.on('ready', async () => {
    await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS]);
    // await session.defaultSession.loadExtension(reactDevtoolsExtensionPath);
    createWindow();
});