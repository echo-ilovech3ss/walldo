import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
const isDev = !app.isPackaged

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width: 480,
    height: 720,
    minWidth: 400,
    minHeight: 600,
    frame: false,
    transparent: false,
    backgroundColor: '#0A0A0F',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    },
    show: false
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  if (isDev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// IPC: Get screen resolution
ipcMain.handle('get-screen-size', () => {
  const display = screen.getPrimaryDisplay()
  return {
    width: display.size.width * display.scaleFactor,
    height: display.size.height * display.scaleFactor,
    scaleFactor: display.scaleFactor
  }
})

// IPC: Save image and set as wallpaper
ipcMain.handle('set-wallpaper', async (_event, dataUrl: string) => {
  try {
    const wallpaperDir = join(app.getPath('userData'), 'wallpapers')
    if (!existsSync(wallpaperDir)) {
      await mkdir(wallpaperDir, { recursive: true })
    }

    const filePath = join(wallpaperDir, `walldo-${Date.now()}.png`)
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '')
    await writeFile(filePath, Buffer.from(base64Data, 'base64'))

    // Dynamic import because wallpaper is ESM-only
    const { setWallpaper } = await import('wallpaper')
    await setWallpaper(filePath)

    return { success: true, path: filePath }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Failed to set wallpaper:', message)
    return { success: false, error: message }
  }
})

// IPC: Window controls
ipcMain.on('window-minimize', () => mainWindow?.minimize())
ipcMain.on('window-maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow?.maximize()
  }
})
ipcMain.on('window-close', () => mainWindow?.close())

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
