import express from 'express'
import http from 'http'
import path from 'path'

import { rootDir } from './rootDir'
import { runIoServer } from './ioServer'

function getApp () {
  const app = express()

  app.use('/', express.static(path.join(rootDir, 'client')))

  return app
}

function main () {
  const app = getApp()
  const server = http.createServer(app)
  const port = 3939
  server.listen(port, () => {
    console.log(`listening on: ${port}`)
  })
  runIoServer(server)
}

main()
