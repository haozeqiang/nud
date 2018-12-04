//引入express模块
const express=require('express');
//引入bodyparser模块
const bodyParser=require('body-parser');
//导入路由器文件
const user=require('./routes/user.js');
var app=express();
//构建服务器
app.listen(3000,()=>{
	console.log('服务器构建成功');
});

//使用bodyParser、托管静态资源
app.use(bodyParser.urlencoded({
	extended:false
}));
app.use(express.static('./public'));
//挂载路由器
app.use('/user',user);