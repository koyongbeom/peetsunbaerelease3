const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('electron',{
    sendMessageApi : {
        setToken : function(token) {
            const result = ipcRenderer.sendSync("setToken", token);
            return result;
        },
        getToken : function() {
            const token = ipcRenderer.sendSync("getToken");
            return token;
        },
        notification : function(title, body){
            ipcRenderer.sendSync("notification", title, body)
        }
    }
})