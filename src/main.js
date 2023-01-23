const { app, BrowserWindow, clipboard, globalShortcut } = require('electron');
const clipboardExt = require('electron-clipboard-extended');
require('./electronProcess/ipcMain.js')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
let window = null

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 300,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    backgroundColor: "#263238",
    // 屏幕居中
    center: true,
    // 是否可拖动
    movable: true,
    // 是否永远在最上层
    alwaysOnTop: true,
    // 暗黑模式
    darkTheme: true,
    // 窗口透明
    // transparent: true,
    // 隐藏title bar
    // titleBarStyle: 'hidden',
  });
  window = mainWindow;

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  globalShortcut.register('ctrl+shift+v',function(){
    // 还原窗口，选择历史记录列表
    if (globalMainWindow.isMinimized()) {
      globalMainWindow.restore()
    }
    globalMainWindow.focus()
    console.log('ctrl+d registed');
    // 可以往剪贴板里写点东西
    clipboard.writeText('123123123')
  })
  globalShortcut.register('ctrl+w',function(){
    app.quit()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 监听clipboard改变
clipboardExt.on('text-changed',() => {
  var clipboardText = clipboardExt.readText();
  //we get the data in clipboardText but only when text changes
  window.webContents.send('text-change', clipboardText)
}).startWatching();



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
