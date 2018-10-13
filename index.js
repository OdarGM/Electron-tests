const electron = require("electron")
const url = require("url")
const path = require("path")

const { app, BrowserWindow, Menu, ipcMain } = electron

//Make it to remove the dev shit acces

process.env.NODE_ENV = "production"

let mainWindow;
let addWindow;

app.on("ready", function(){

    mainWindow = new BrowserWindow()

    mainWindow.loadURL(url.format({
        
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true

    }))

    mainWindow.on("closed", function(){
        
        app.quit()

    })

    const mainMenu = Menu.buildFromTemplate(template)

    Menu.setApplicationMenu(mainMenu)

})

function createAddWindow(){

    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Add Shopping List Item"
    })

    addWindow.loadURL(url.format({
        
        pathname: path.join(__dirname, "addWindow.html"),
        protocol: "file:",
        slashes: true

    }))

    addWindow.on("close", function(){

        addWindow = null

    })

    const mainMenu = Menu.buildFromTemplate(template)

    Menu.setApplicationMenu(mainMenu)

}

ipcMain.on("item-add", function(e, item){

    mainWindow.webContents.send("item-add", item)

    addWindow.close()

})

const template = [
    {
        label: "File",
        submenu: [
            {
                label: "Add Item",
                accelerator: process.platform == "darwin" ? "Command+W" : "Ctrl+W",
                click(){
                    createAddWindow()
                }
            },
            {
                label: "Clear Items",
                accelerator: process.platform == "darwin" ? "Command+P" : "Ctrl+P",
                click(){
                    mainWindow.webContents.send("item-clear")
                }
            },
            {
                label: "Quit",
                accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                click(){
                    app.quit()
                }
            }
        ]
    }
]

//Check if its Mac

if(process.platform == "darwin"){

    template.unshift({})

}

//Dev tools

if(process.env.NODE_ENV !== "production"){

    template.push({
        label: "Developer Tools",
        submenu: [
            {
                label: "Toggle DevTools",
                click(Item, focusedWindow){

                    focusedWindow.toggleDevTools()

                },
                accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I"
            },
            {
                role: "reload"
            }
        ]
    })

}