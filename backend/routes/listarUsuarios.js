// routes/listarUsuarios.js
const express = require('express');
const router = express.Router();
const connection = require('../dbConnection');

router.get('/', function (req, res) {
    const sql = 'SELECT * FROM `usuarios-cadastro`';

    connection.query(sql, function (error, result) {
        if (error) {
            console.error("Erro ao listar os usuarios", error);
            return res.status(500).json({ message: 'Erro interno no servidor', error: error.message });
        }
        return res.status(200).json(result);
    });
});

module.exports = router;
