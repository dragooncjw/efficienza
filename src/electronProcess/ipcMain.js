const { ipcMain, clipboard } = require('electron')

// react to electron
ipcMain.on('select-value', (event, data) => {
    clipboard.writeText(data)
})