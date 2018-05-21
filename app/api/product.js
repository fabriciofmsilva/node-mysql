// // não depende mais do módulo mysql 
// app.get('/products', (req, res) => {
//   // não me importa de onde vem a conexão, só preciso de uma conexão!
//   req.connection.query('SELECT * FROM products', (err, products) => {
//       if(err) return next(err);
//       res.json(products);
//       // não preciso me preocupar em devolver a conexão para o pool
//   });
// });
const ProdutoDao = require('./product-dao');

app.get('/products', (req, res, next) => 
  new ProductDao(req.connection)
    .list()
    .then(products => res.json(products))
    .catch(next)
);
