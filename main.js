// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
//NOTE agregada shell
const shell = require('electron').shell

const createWindow = () => {
  // Create the browser window.
  // NOTE para crear ventanas
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  // NOTE archivo html que carga
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // NOTE herramientas tipo inspeccionar elemento
   mainWindow.webContents.openDevTools()

   // NOTE hay un recolector de basura que esta en el tutorial pero no aca

   // NOTE menu:, creado objeto, especifica label, submenusito de barra de arriba
   //      submenu: deplegable con opciones
   var menu = Menu.buildFromTemplate([
        {
            label : 'Menu',
            submenu : [
                {
                    label: 'Google link',
                    // llama al shell para abrir urn externa
                    click(){
                        shell.openExternal('http://google.com')
                    }
                },
                {type: 'separator'},
                {
                    label: 'Submenu3',
                },
                {
                    label: 'Exit',
                    // NOTE accion del submenu, sale
                    click(){
                        app.quit()
                    }
                },
            ]
        },
        {
            label : 'Menu2',
        }

   ])
   Menu.setApplicationMenu(menu)

   // NOTE setea el menu
  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  // NOTE listener de evento, cuando se activa la app inicia la ventana
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.