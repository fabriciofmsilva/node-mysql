const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit,
  host : 'localhost',
  user : 'cangaceiro',
  password : 'javascript',
  database : 'cangaco'
});

console.log('pool => criado');

pool.on('release', () => console.log('pool => conexão retornada'));

process.on('SIGINT', () => 
  pool.end(err => {
    if (err) return console.log(err);
    console.log('pool => fechado');
    process.exit(0);
  })
);

module.exports = pool;
