var AndroidUnicast = require('./src/notification/android/AndroidUnicast');

var test = new AndroidUnicast();
var option = test._data;
var payload = option.payload;
var body = payload.body;

test.setAppMasterSecret('nuslg4drwbdu1odmmrdzcb9ll9pza7cl');

option.appkey = '54648b6bfd98c5ce56000106';
option.timestamp = Date.now();
option.device_tokens = 'AnAAY5En3B7_hUqNj1If0fHtVCWkHCQXu6COu9cMmjeY';

body.ticker = 'test';
body.title = 'test title 为什么';
body.text = 'test text';
body.after_open = 'go_app';

payload.extra = {
	liu: 'yi'
};

test.send(function(err, httpResponse, body) {
	console.log(err);
	console.log(httpResponse);
});