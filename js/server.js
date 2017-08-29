var fs = require('fs');
var http = require('http');
http.createServer(function (req, res) {
//	监听函数，监听请求到来的函数
// 	req代表的客户端，res代表的是服务端
	res.setHeader('Content-Type', 'text/html;charset=utf-8');
	fs.createReadStream('./index.html').pipe(res);
	//同步的不好，会阻塞主线程，采用异步
	// let file = fs.readFileSync('index.html');
	// res.end(file);//必须要调用end响应才算完成
}).listen(8080, '10.4.122.187', function () {
	console.log('server start 8080');//ip可写可不写
});//要拥有特定的端口号和ip地址
