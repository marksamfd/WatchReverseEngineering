// Modules to control application life and create native browser window
// const {app, BrowserWindow} = require('electron')
const path = require('path')
const fs = require('fs-extra')

const { menubar } = require('menubar');
const { ipcMain } = require("electron")
const mb = menubar({
  browserWindow: {
    height: 375,
    skipTaskbar: true,
    experimentalFeatures: true,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    }
  }
})
let app, mainWindow
app = mb.app
// app.commandLine.appendSwitch('enable-experimental-web-platform-features')
console.log(app.commandLine.hasSwitch('enable-experimental-web-platform-features'))
// console.log(app)
mb.on('after-create-window', () => {
  console.log('app is ready');
  mainWindow = mb.window
  mainWindow.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    console.log(event, "select Device")
    console.log(deviceList,deviceList[0].deviceId)
    callback(deviceList[0].deviceId)
  })
  mainWindow.setResizable(false)
  // your app code here
  mainWindow.on("resized", (e) => {
    console.log(e)
  })
});

ipcMain.on("heartData", (e, data) => {
  // console.log(data)
  fs.readJson('./file')
    .then(packageObj => {

    })
  fs.outputJSON("./file", data)
})

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
/* app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}) */

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
/* app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
}) */

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
