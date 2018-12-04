//引入mysql模块
const mysql=require('mysql');
var pool=mysql.createPool({
	host:'127.0.0.1',
	port:3306,
	user:'root',
	password:'',
	database:'nde',
	connectionLimit:20
});

//导出连接池模块
module.exports=pool;