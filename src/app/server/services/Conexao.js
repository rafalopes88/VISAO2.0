module.exports = {
  Conectar: function () {
    var mysql = require('mysql');
    	return mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "ibict2017",
			  database: "visao"  
			});
  }
};