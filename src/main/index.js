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
    event.sender.send('log', 'main监听到随机交易点击事件')
    const params = {
      createWindow: event.sender,
      apiKey: '183a2ec2-b575e97b-1b7b059c-c2443',
      secret: '42a3edba-64cd725a-0eeffc05-1cd10',
    }
    bot = new Bot(params);
    event.sender.send('log', '机器人创建成功')
    // bot.generateRandomOrders();
    bot.generateRandomOrders()
    // event.sender.send('back3', '随机')//在main process里向web page发出message
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
