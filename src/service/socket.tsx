import {Socket, io} from 'socket.io-client'

const socket: Socket = io("https://peetsunbae.com", {autoConnect : false, reconnection : false});