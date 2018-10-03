const electon = require("electron")
const { app, BrowserWindow } = require("electron");
const path = require("path")
const ipc = electon.ipcMain
const dialog = electon.dialog

let mainWindow;

//Load IPC event from ipc.js:11
ipc.on("open-error-dialogx", function(event) {

    dialog.showErrorBox("Error Message Title", "Error Message Text")
    event.sender.send("oppend-error-msg", "Process oppend the error lol")

})

ipc.on("async-ipc-error", function(event) {

    dialog.showErrorBox("Async Error", "Async Error Text")
    event.sender.send("async-respond", "Response to async shit")

})

app.on("ready", () => {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600, 
        maxHeight: 1000, 
        maxWidth: 800, 
        backgroundColor: "#23272A",
        /*frame: false */
    })
    mainWindow.loadURL(path.join(`file://`, __dirname, "index.html"))
    //mainWindow.loadURL("https://odar.xyz")

    //mainWindow.webContents.openDevTools()
    mainWindow.on("ready-to-show", () => {
        mainWindow.show()
    })

    mainWindow.on("closed", () => {
        mainWindow = null
    })

});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit()
    }
})

app.on("activate", () => {
    if(mainWindow === null){
        
        mainWindow = new BrowserWindow()
        mainWindow.loadURL(path.join(`file://`, __dirname, "index.html"))

        //mainWindow.webContents.openDevTools()
        mainWindow.on("ready-to-show", () => {
            mainWindow.show()
        })
    
        mainWindow.on("closed", () => {
            mainWindow = null
        })

    }
})