import io from 'socket.io'

let ioServer

export function runIoServer (httServer) {
  ioServer = io.listen(httServer)

  ioServer.sockets.on('connection', onConnection)

  return ioServer
}

function onConnection (socket) {
  const query = socket.handshake.query
  if (!query) {
    return undefined
  }

  socket.on('chat message', onMessage)

  const { username } = query
  const roomId = getRoomId(username)
  socket.join(roomId)
  ioServer.to(roomId).emit('message', { message: `歡迎 ${username} 加入` })
}

function onMessage ({ username, message }) {
  const roomId = getRoomId(username)
  ioServer.to(roomId).emit('message', { message: `${username}: ${message}` })
}

function getRoomId () {
  return 'test room'
}
