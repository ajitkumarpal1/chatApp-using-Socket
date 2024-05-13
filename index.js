import express from "express";
import { Server } from "socket.io";
import http from "http"
import { connectDb } from "./mongoose.js";
import { mongooseModel } from "./mongoos.model.js";

const app = http.createServer(express())
const io = new Server(app, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
const liseUserArray = []
/* connect individual user */
io.on("connect", (socket) => {
    socket.emit("oldUser", liseUserArray)
    console.log("socked is connected")
    /* listaion adduser request */
    socket.on("addUser", async (userName) => {
        console.log(userName)
        socket.userName = userName
        io.emit("newUser", socket.userName)
        liseUserArray.push(userName)
        socket.emit("oldChat", await mongooseModel.find({}))



    })
    socket.on("addChat", async (chatObj) => {
        chatObj.user = socket.userName
        try {
            const chat = await mongooseModel(chatObj).save()
            console.log(chatObj)
            io.emit("chatBrodCast", chat)
        } catch (error) {

        }

    })
    /* after disconnection process */
    socket.on("disconnect", () => {
        console.log(`${socket.userName} is desconnected`)
        if (liseUserArray.indexOf(socket.userName) !== -1) {
            liseUserArray.splice(liseUserArray.indexOf(socket.userName), 1);
        }
        io.emit("offline", socket.userName)
    })
    /* typing  */
    socket.on("typing",()=>{
        console.log(socket.userName+" is typing ...")
        socket.broadcast.emit("typeUser",(socket.userName).toString())
    })
    socket.on("notTyping",()=>{
        console.log(socket.userName+" is stopd typing ...")
        socket.broadcast.emit("notTypeUser",(socket.userName).toString())
    })

})

app.listen(3100, () => {
    console.log("sorver is runig on port 3100")
    connectDb()
})
