const electon = require("electron")
const { app, BrowserWindow } = require("electron");
const path = require("path")
const ipc = electon.ipcMain
const dialog = electon.dialog
const DiscordRPC = require("discord-rpc")
DiscordRPC.register("498930677484486656")
const rpc = new DiscordRPC.Client({transport: "ipc"})
const Menu = electon.Menu
const MenuItem = electon.MenuItem
const globalShortcut = electon.globalShortcut
const Tray = electon.Tray
const TrayIcon = path.join(__dirname, "Images/odar.png")
let tray = null

let mainWindow;

rpc.on("ready", () => {

  const startTimestamp = new Date();

  rpc.setActivity({
       details: "Working with Electron",
       state: "Some random app tests?",
       startTimestamp,
       largeImageKey: "javascript-electron-logo-s",
       smallImageKey: "github",
       largeImageText: "Ye learing it",
       smallImageText: "Odar.xyz",
       instance: false
     })
})
rpc.login({clientId: "498930677484486656"}).catch(console.error)

//Load IPC event from ipc.js:11
ipc.on("open-error-dialogx", function(event) {

    dialog.showErrorBox("Error Message Title", "Error Message Text")
    event.sender.send("oppend-error-msg", "Process oppend the error lol")

})

ipc.on("async-ipc-error", function(event) {

    dialog.showErrorBox("Async Error", "Async Error Text")
    event.sender.send("async-respond", "Response to async shit")

})


app.on("ready", function(){

    //TRAY MENU

    tray = new Tray(TrayIcon)

    const TrayTemplate = [
        {
            label: "Links",
            submenu: [
                {
                    label: "Site",
                    click: function(){
                        electon.shell.openExternal("https://odar.xyz")
                    }
                },
                {
                    label: "Discord",
                    click: function(){
                        electon.shell.openExternal("https://odar.xyz/invite")
                    }
                }
            ]
        },
        {
            label: "Support"
        }
    ]

    const ctxTrayMenu = Menu.buildFromTemplate(TrayTemplate)

    tray.setContextMenu(ctxTrayMenu)
    tray.setToolTip("Odar Electron App")

    //END TRAY MENU
    
    const template = [
        {
          label: "Menu",
          submenu: [
            {
              label: "Edit",
              submenu: [
                  {
                      role: "undo",
                  },
                  {
                      role: "redo"
                  },
                  {
                      type: "separator"
                  },
                  {
                      role: "cut"
                  },
                  {
                      role: "copy"
                  },
                  {
                      role: "paste"
                  },
                  {
                      role: "pasteandmatchstyle"
                  },
                  {
                      role: "delete"
                  },
                  {
                      role: "selectall"
                  }
              ]
            },
            {
              label: "Test",
               click: function () {
                 console.log("Clicked Test button")
               }
            },
            {
              label: "Help",
              click: function(){
                  electon.shell.openExternal("https://odar.xyz")
              },
              accelerator: "CmdorCtrl + H",
            },
            {
              label: 'Donate'
            },
            {
              type: "separator"
            },
            {
              label: "Scam"
            }
          ]
        },
        {
            label: "Site",
            click: function(){
                electon.shell.openExternal("https://odar.xyz")
            }
        }
      ]
  
    const menu =  Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  
    const ctxMenu = new Menu()
    ctxMenu.append(new MenuItem({
        label: "Click me",
        click: function() {
            console.log("Button cliked?")
        }
    }))
  
    ctxMenu.append(new MenuItem({
        role: "selectall"
    }))
  
      mainWindow = new BrowserWindow({
          width: 800,
          height: 600,
          maxHeight: 1000,
          maxWidth: 800,
          backgroundColor: "#23272A",
      })
      mainWindow.loadURL(path.join(`file://`, __dirname, "index.html"))
      //mainWindow.loadURL("https://odar.xyz")
  
  
      mainWindow.webContents.on("context-menu", function(e, params) {
          ctxMenu.popup(mainWindow, params.x, params.y)
      })
  
      mainWindow.on("ready-to-show", () => {
          mainWindow.show()
      })
  
      mainWindow.on("closed", () => {
          mainWindow = null
      })
  
      globalShortcut.register("Alt + 1", function(){
  
          mainWindow.show()
  
      })

});

app.on("will-quit", function(){

    globalShortcut.unregisterAll()

})

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
