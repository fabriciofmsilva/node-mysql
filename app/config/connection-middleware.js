// o módulo depende de um pool de conexões
module.exports = pool => (req, res, next) => {
  pool.getConnection((err, connection) => {
    /* passa o erro, quando houver, para o 
    middleware que centraliza o tratamento de erro */
    if(err) return next(err);
    console.log('pool => obteve conexão');
    // adicionou a conexão na requisição
    req.connection = connection;
    // passa a requisição o próximo middleware
    next();
    // devolve a conexão para o pool no final da resposta
    res.on('finish', () => req.connection.release());
  });
};
