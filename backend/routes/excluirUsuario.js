const express = require('express');
const router = express.Router();
const connection = require('../dbConnection');

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    const sql = 'DELETE FROM `usuarios-cadastro` WHERE id = ?';

    connection.query(sql, [id], function (error, result) {
        if (error) {
            console.error('Erro ao excluir usuário:', error);
            return res.status(500).json({ message: 'Erro interno no servidor', error: error.message });
        }
        return res.status(200).json(result);
    });
});

module.exports = router;