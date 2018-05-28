module.exports = {
  Conectar: function () {
    var mysql = require('mysql');
    	return mysql.createConnection({
			  host: "localhost",
			  user: "ibict",
			  password: "ibict2017",
			  database: "visao" 

			});
  }
};