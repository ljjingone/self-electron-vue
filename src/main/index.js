import { ipcMain,app, BrowserWindow } from 'electron'
import Bot from '../common/js/bot.js'
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

  
  let bot

  ipcMain.on('random', (event, arg) => {
    const params = {
      createWindow: event.sender,
      exchange: arg.constructorParams.fun,
      apiKey: arg.constructorParams.apiKey,
      secret: arg.constructorParams.secret,
    }
    bot = new Bot(params);
    bot.generateRandomOrders(arg.randomParams.bidNarrowVolume,arg.randomParams.askNarrowVolume,arg.randomParams.bidNarrowVolume,arg.randomParams.maxVolume,arg.randomParams.minVolume)
  })

  //停止
  ipcMain.on('stop', (event, arg) => {
    if(!bot) {
      event.sender.send('log', '机器人尚未创建')
      return;
    }
    bot.stop(event.sender)
    
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
