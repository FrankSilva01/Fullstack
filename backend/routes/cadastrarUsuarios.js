const express = require('express');
const router = express.Router();
const connection = require('../dbConnection');

router.post('/', async function (req, res) {
  console.log('Rota /cadastrarUsuarios acessada')
  const dados = req.body;
  const cpf = dados.cpf;

  // Check if the CPF is already registered
  const cpfExists = await new Promise((resolve, reject) => {
    const checkQuery = 'SELECT COUNT(*) AS count FROM `usuarios-cadastro` WHERE cpf = ?';
    connection.query(checkQuery, [cpf], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result[0].count > 0);
      }
    });
  });

  if (cpfExists) {
    return res.status(400).json({ message: 'CPF já cadastrado. Não é permitido cadastrar o mesmo CPF novamente.' });
  }

  const sql = 'INSERT INTO `usuarios-cadastro` (cpf, nome, sobrenome, dataNascimento, email, genero) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(sql, [dados.cpf, dados.nome, dados.sobrenome, dados.dataNascimento, dados.email, dados.genero], function (error, result) {
    if (error) {
      console.error("Erro ao cadastrar usuário", error);
      return res.status(500).json({ message: 'Erro interno no servidor', error: error.message });
    }
    return res.status(200).json({ message: 'Cadastro realizado com sucesso!', insertId: result.insertId });
  });
});

module.exports = router;
