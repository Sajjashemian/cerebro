import { app, ipcMain, crashReporter } from 'electron'

import createMainWindow from './main/createWindow'
import createBackgroundWindow from './background/createWindow'
import config from './lib/config'
import AppTray from './main/createWindow/AppTray'

const trayIconSrc = `${__dirname}/tray_iconTemplate@2x.png`
const isDev = () => (
  process.env.NODE_ENV === 'development' || config.get('developerMode')
)
let mainWindow
let backgroundWindow
let tray

if (process.env.NODE_ENV !== 'development') {
  // Set up crash reporter before creating windows in production builds
  crashReporter.start({
    productName: 'Cerebro',
    companyName: 'Cerebro',
    submitURL: 'http://crashes.cerebroapp.com/post',
    autoSubmit: true
  })
}

app.on('ready', () => {
  mainWindow = createMainWindow({
    isDev,
    // Main window html
    src: `file://${__dirname}/main/index.html`,
  })

  backgroundWindow = createBackgroundWindow({
    src: `file://${__dirname}/background/index.html`,
  })

  tray = new AppTray({
    src: trayIconSrc,
    isDev: isDev(),
    mainWindow,
    backgroundWindow
  })

  // Show tray icon if it is set in configuration
  if (config.get('showInTray')) {
    tray.show()
  }

  app.dock && app.dock.hide()
})

ipcMain.on('message', (event, payload) => {
  const toWindow = event.sender === mainWindow.webContents ? backgroundWindow : mainWindow
  toWindow.webContents.send('message', payload)
})

ipcMain.on('updateSettings', (event, key, value) => {
  mainWindow.settingsChanges.emit(key, value)

  // Show or hide menu bar icon when it is changed in setting
  if (key === 'showInTray') {
    value ? tray.show() : tray.hide()
  }
  // Show or hide "development" section in tray menu
  if (key === 'developerMode') {
    tray.setIsDev(isDev())
  }
})
