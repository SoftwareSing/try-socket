function main () {
  const username = getUsername()
  const query = { username }
  const socket = window.io.connect('', { query })
  window.mySocket = socket

  socket.on('message', onMessage)
  socket.on('disconnect', onDisconnect)

  window.sendChatMessage = () => {
    const message = document.getElementById('input-message').value
    socket.emit('chat message', { username, message })
    document.getElementById('input-message').value = ''
  }
}

function onDisconnect () {
  console.log('disconnect socket')
}

function onMessage (data) {
  const { message } = data

  console.log(message)

  const msgDiv = document.createElement('div')
  const span = document.createElement('span')
  span.appendChild(document.createTextNode(`${message}`))
  msgDiv.appendChild(span)
  msgDiv.appendChild(document.createElement('br'))
  document.getElementById('msgList').prepend(msgDiv)
}

function getUsername () {
  const number = Math.floor(Math.random() * 10000)
  const strNumber = `${'0'.repeat(4 - String(number).length)}${number}`
  return `測試猿${strNumber}`
}

main()
