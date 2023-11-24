const mysql = require('mysql2')
const dotenv = require('dotenv');

// Carregue as variáveis de ambiente do arquivo .env
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect((error) => {
   
    if (error) {
        console.error("Erro ao acessar o banco de dados: " + error.message);
        return;
    }

    console.log("Conectado ao banco com sucesso!");
});


module.exports = connection;