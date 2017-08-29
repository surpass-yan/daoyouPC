var express=require('express');
var app = express();
//动态计算设备宽高
var winW=document.documentElement.clientWidth || document.body.clientWidth;
var winH=document.documentElement.clientHeight || document.body.clientHeight;
$('.main').width(winW).height(winH);

//点击登录按钮登录
$('#login').click(function(evt){
	evt.preventDefault();
	$.ajax({
		url: 'http://10.4.122.187:8080/tourguide/computer/login.do',
		type: 'POST',
		data: {
			name: $('.account').val(),
			password: $('.keyword').val()
		},
		success: function(data){
			if(data.ret_code === 1){
				location.reload();
			}
		}
	});
});



//cookie传参
app.use(function (req, res, next) {
	if (req.session.login_account) {  // 判断用户session是否存在
		next();
	} else {
		var arr = req.url.split('/');
		for (var i = 0, length = arr.length; i < length; i++) {
			arr[i] = arr[i].split('?')[0];
		}

		// 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
		if (arr.length > 2 && arr[0] == ''&&arr[1] == 'operlogin' && arr[2] == 'checklogin' || arr[2] == 'login') {
			next();
		}
		else {
			// req.session.originalUrl = req.originalUrl ? req.originalUrl : null;  // 记录用户原始请求路径
			res.redirect("./index.html");
		}
	}
});
app.listen(8080);
