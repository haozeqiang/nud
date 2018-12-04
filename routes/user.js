//引入express模块
const express=require('express');
const pool=require('../pool.js');
//创建路由器
var router=express.Router();
//--------------------------------用户登录-------------------------------------------
//创建用户登录接口
router.post('/login',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if(!$uname){
		res.send('用户名不能为空');
	}
	if(!$upwd){
		res.send('用户密码不能为空');
	}
	var sql='select * from nde_user where uname=? and upwd=?';
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send('登录成功');
		}else{
			res.send('用户名或密码错误');
		}
	});
});
//--------------------------------用户注册-------------------------------------------
//创建用户注册接口
router.post('/register',(req,res)=>{
	//var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	//var $email=req.body.email;
	var $phone=req.body.phone;
	if(!$phone){
		res.send('- 手机号码不是一个有效号码');
		return;
	}
	if(!$upwd){
		res.send('- 登录密码不能少于 6 个字符。');
		return;
	}
	/*if(!$email){
		res.send({code:403,msg:'邮箱不能为空'});
		return;
	}
	if(!$phone){
		res.send({code:404,msg:'手机不能为空'});
		return;
	}*/
	var sql='insert into nde_user values(null,null,?,null,?,null,null,null)';
	pool.query(sql,[$upwd,$phone],(err,result)=>{
		//console.log(result);
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
});
//----------------------邮箱注册接口---------------------------
router.post('/yregister',(req,res)=>{
	//var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var $email=req.body.email;
	//var $phone=req.body.phone;
	//if(!$phone){
		//res.send('- 手机号码不是一个有效号码');
		//return;
	//}
	if(!$upwd){
		res.send('- 登录密码不能少于 6 个字符。');
		return;
	}
	if(!$email){
		res.send({code:403,msg:'邮箱不能为空'});
		return;
	}
	/*if(!$phone){
		res.send({code:404,msg:'手机不能为空'});
		return;
	}*/
	var sql='insert into nde_user values(null,null,?,?,null,null,null,null)';
	pool.query(sql,[$upwd,$email],(err,result)=>{
		//console.log(result);
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
});
//-------------------------------删除用户---------------------------------------
router.get('/delete',(req,res)=>{
	var $uid=req.query.uid;
	if(!$uid){
		res.send('请输入要删除的用户编号');
	}
	var sql='delete from nde_user where uid=?';
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:400,msg:'删除成功'});
		}else{
			res.send({code:401,msg:'删除失败，检查输入的用户编号'});
		}
	});
});
//-------------------------------修改用户信息-----------------------------------
router.post('/update',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var $email=req.body.email;
	var $phone=req.body.phone;
	var $uid=req.body.uid;
	for(var key in req.body){
		if(!key){
			res.send(key);
		}
	}
	var sql='update nde_user set uname=?,upwd=?,email=?,phone=? where uid=?';
	pool.query(sql,[$uname,$upwd,$email,$phone,$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectdRows>0){
			res.send({code:401,msg:'修改成功'});
		}else{
			res.send({code:402,msg:'修改失败'});
		}
	});
});

//---------------------------------注册时候查询用户名是否重复---------------------
router.post('/cx',(req,res)=>{
	var $uname=req.body.uname;
	if(!$uname){
		res.send({code:401,msg:'用户名不能为空'});
		return;
	}
	
	var sql='select * from nde_user where uname=?';
	pool.query(sql,[$uname],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
});
//------------------------查询邮箱是否重复-----------------
router.post('/cxyx',(req,res)=>{
	var $email=req.body.email;
	if(!$email){
		res.send({code:401,msg:'邮箱不能为空'});
		return;
	}
	
	var sql='select * from nde_user where email=?';
	pool.query(sql,[$email],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
});

//--------------------------------------------登录页查询图片----------------------------------------------
router.get('/img',(req,res)=>{
	var sql='select * from user_login_img';
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
//登录验证码
//验证手机号码
router.post('/cxsj',(req,res)=>{
	var $phone=req.body.phone;
	if(!$phone){
		res.send('手机不能为空');
		return;
	}
	
	var sql='select * from nde_user where phone=?';
	pool.query(sql,[$phone],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send('1');
		}else{
			res.send('0');
		}
	});
});

//导出路由器模块
module.exports=router;
























