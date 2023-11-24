const express = require('express');
const cors = require('cors');
const app = express();
const listarUsuariosRouter = require('./routes/listarUsuarios');
const excluirUsuarioRouter = require('./routes/excluirUsuario');
const atualizarUsuarioRouter = require('./routes/atualizarUsuario');
const cadastrarUsuariosRouter = require('./routes/cadastrarUsuarios');

const port = 3003;

app.use(express.json());
app.use(cors());

// Use os roteadores específicos para cada rota
app.use('/api/listarUsuarios', listarUsuariosRouter);
app.use('/api/excluirUsuario', excluirUsuarioRouter);
app.use('/api/atualizarUsuario', atualizarUsuarioRouter);
app.use('/api/cadastrarUsuarios', cadastrarUsuariosRouter);
app.use((req, res, next) => {
    console.log('Request received:', req.url); // Add this line
    next();
});


app.listen(port, () => {
    console.log('App rodando na porta ' + port);
});
