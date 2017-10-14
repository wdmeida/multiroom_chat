const app = require('./config/server');
const PORT = 3000;

const server = app.listen(PORT, function() {
  console.log('Servidor online');
});

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket) {
  console.log('Usuário conectou');

  socket.on('disconnect', function() {
    console.log('Usuário desconectou');
  });

  socket.on('msgParaServidor', function(data) {
    // Dialogs
    socket.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem });
    socket.broadcast.emit('msgParaCliente', { apelido: data.apelido, mensagem: data.mensagem });

    // Participants
    if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
      socket.emit('participantesParaCliente', { apelido: data.apelido });
      socket.broadcast.emit('participantesParaCliente', { apelido: data.apelido });      
    }
  });
});

