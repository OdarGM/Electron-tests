const electron = require("electron")
const ipc = electron.ipcRenderer

const errorBtn = document.getElementById("errorBtn")
const AsyncBtn = document.getElementById("AsyncBtn")
const syncBtn = document.getElementById("syncBtn")

errorBtn.addEventListener("click", function() {

    //IPC EVENT NAME | index.js:10
    ipc.send("open-error-dialogx")

})

AsyncBtn.addEventListener("click", function() {

    ipc.send("async-ipc-error")

})

syncBtn.addEventListener("click", function() {


    
})

ipc.on("async-respond", function (event, args) {

    console.log(args)

})

ipc.on("oppend-error-msg", function (event, args) {

    console.log(args)

})