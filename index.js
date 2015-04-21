var AndroidUnicast = require('./src/notification/android/AndroidUnicast');

var test = new AndroidUnicast();
var option = test._data;
var payload = option.payload;
var body = payload.body;

option.appkey = '111';
option.timestamp = Date.now();
option.device_tokens = 'AnAAY5En3B7_hUqNj1If0fHtVCWkHCQXu6COu9cMmjeY';

body.ticker = 'test ticker';
body.title = 'test title';
body.text = 'test text';
body.after_open = 'go_app';

payload.extra = {
	liu: 'yi'
};

test.send(function(err, httpResponse, body) {
	console.log(err);
	console.log(body);
});