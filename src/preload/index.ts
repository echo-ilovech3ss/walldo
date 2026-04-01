import { contextBridge, ipcRenderer } from 'electron'

const api = {
  getScreenSize: (): Promise<{ width: number; height: number; scaleFactor: number }> =>
    ipcRenderer.invoke('get-screen-size'),

  setWallpaper: (dataUrl: string): Promise<{ success: boolean; path?: string; error?: string }> =>
    ipcRenderer.invoke('set-wallpaper', dataUrl),

  windowMinimize: (): void => ipcRenderer.send('window-minimize'),
  windowMaximize: (): void => ipcRenderer.send('window-maximize'),
  windowClose: (): void => ipcRenderer.send('window-close'),

  platform: process.platform
}

contextBridge.exposeInMainWorld('api', api)

export type ElectronAPI = typeof api
