const express = require('express');
const app = express();
const pool = require('./pool-factory');
const connectionMiddleware = require('./connection-middleware');

// ativando nosso middleware
app.use(connectionMiddleware(pool));

// registra as rotas
require('../api/product')(app);

// middleware de tratamento de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
	res.status(500).json({ error: err.toString() });
});

module.exports = app;
