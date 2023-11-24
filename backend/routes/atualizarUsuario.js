const express = require('express');
const router = express.Router();
const connection = require('../dbConnection');
const { cpf: cpfValidator } = require('cpf-cnpj-validator');

router.put('/:id', async function (req, res) {
  const id = req.params.id;
  let {
    nome,
    sobrenome,
    dataNascimento,
    email,
    genero,
    cpf,
  } = req.body;

  console.log('Received Data:', req.body);

  // Adicione a validação do CPF
  if (!cpfValidator.isValid(cpf)) {
    return res.status(400).json({ message: 'CPF inválido.' });
  }

  const isCPFAlreadyExists = await checkCPFExists(cpf, id);
  if (isCPFAlreadyExists) {
    return res.status(400).json({ message: 'CPF já cadastrado.' });
  }

  const sql =
    'UPDATE `usuarios-cadastro` SET nome=?, sobrenome=?, dataNascimento=?, email=?, genero=?, cpf=? WHERE id=?';

  connection.query(
    sql,
    [nome, sobrenome, dataNascimento, email, genero, cpf, id],
    function (error, result) {
      if (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ message: 'Erro interno no servidor', error: error.message });
      }

      console.log('Update successful. Rows affected:', result.affectedRows);

      return res.status(200).json(result);
    }
  );
});

// Adicione a função de validação de CPF existente
const checkCPFExists = async (cpf, userId) => {
    try {
      const [rows] = await connection.promise().query(
        'SELECT * FROM `usuarios-cadastro` WHERE cpf = ? AND id <> ?',
        [cpf, userId]
      );
      return rows.length > 0;
    } catch (error) {
      console.error('Erro ao verificar CPF existente:', error);
      throw error;
    }
  };
  
module.exports = router;
