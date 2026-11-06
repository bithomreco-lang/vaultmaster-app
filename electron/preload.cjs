const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  startGoogleAuth: () => ipcRenderer.invoke('start-google-auth'),
  onAuthSuccess: (callback) => {
    ipcRenderer.on('auth-success', (_event, session) => callback(session));
  }
});

