const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    sendToMain: (channel, data) => ipcRenderer.send(channel, data)
}
)