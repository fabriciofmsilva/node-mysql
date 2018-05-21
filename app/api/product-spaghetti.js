const mysql = require('mysql');

module.exports = app => {
  /* 
    cria um pool de conexão. Busca o host, user e password 
    de variáveis de ambiente do sistema operacional
  */
  const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'cangaceiro',
    password: 'javascript',
    database: 'cangaco'
  });

  // código anterior omitido 
  app.get('/products', (req, res, next) => {
    pool.getConnection((err, connection) => {
      /* passa o erro, quando houver, para o 
      middleware que centraliza o tratamento de erro */
      if (err) return next(err);
      connection.query('SELECT * FROM products', (err, products) => {
        // devolve a conexão para o pool
        connection.release();
        /* passa o erro, quando houver, para o 
        middleware que centraliza o tratamento de erro */
        if (err) return next(err);
        // devolve a resposta
        res.json(products);
      });
    });
  });
};
