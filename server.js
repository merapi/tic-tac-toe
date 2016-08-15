import Server from 'socket.io'

const port = process.env.PORT || 8765;
const io = new Server().listen(port)

io.on('connection', socket => {
  console.log('new connection', socket.id)
})

console.log(`Server is running at port ${port}`)