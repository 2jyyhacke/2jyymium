const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  urlGit: (url) => ipcRenderer.send('url-git', url),
  onUrlYukle: (callback) => ipcRenderer.on('url-yukle', (event, url) => callback(url)),
  getExtensions: () => ipcRenderer.invoke('get-extensions'),
  openExtensionFolder: (path) => ipcRenderer.send('open-extension-folder', path),
  toggleExtension: (id, enabled) => ipcRenderer.invoke('toggle-extension', id, enabled),
});