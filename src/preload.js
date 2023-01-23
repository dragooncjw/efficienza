// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // react to electron
  selectValue: (args) => {
    console.log('v alskajsd', args)
    ipcRenderer.send('select-value', args)
  },
  // Receive Methods
  clipboardTextChange: (callback) => ipcRenderer.on('text-change', (event, data) => { callback(data) }),
});