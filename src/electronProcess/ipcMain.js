const { ipcMain, clipboard } = require('electron')

// react to electron
ipcMain.on('select-value', (event, data) => {
    console.log('v aslkdjasldj get', data)
    clipboard.writeText(data)
})