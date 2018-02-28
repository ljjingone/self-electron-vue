import { ipcMain,app, BrowserWindow } from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.webContents.openDevTools()


  // 前端数据接口
  ipcMain.on('top', (event, arg) => {
    console.log("mian1" + arg)  // prints "ping"
    event.sender.send('back1', '上行')//在main process里向web page发出message
  })
  ipcMain.on('bot', (event, arg) => {
    console.log("mian1" + arg)  // prints "ping"
    event.sender.send('back2', '下行')//在main process里向web page发出message
  })
  ipcMain.on('random', (event, arg) => {
    console.log("mian1" + arg)  // prints "ping"
    event.sender.send('back3', '随机')//在main process里向web page发出message
  })
  ipcMain.on('stop', (event, arg) => {
    console.log("mian1" + arg)  // prints "ping"
    event.sender.send('back4', '停止')//在main process里向web page发出message
  })






  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
