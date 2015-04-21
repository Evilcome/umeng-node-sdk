# umeng-node-sdk
Umeng push notification nodejs version.

Inspired by official PHP sdk v1.4.

-----

* Fill free to contribute. *

## Progress

### IOS

- [x] Broadcast
- [ ] Customizedcast
- [ ] Filecast
- [x] Groupcast
- [x] Unicast

### Android

- [x] Broadcast
- [ ] Customizedcast
- [ ] Filecast
- [x] Groupcast
- [x] Unicast

## Usage

### An Example with Android Broadcast
**ATTENTION** 不同类型的消息类型发送的内容不一致，请查看官方文档，我也会尽快更新其他示例 


	var Umeng = require('umeng-node-sdk');
	Umeng.init(appKey: 'your_app-key', appMasterSecret: 'your_app_master_secret');

	var info = {
		timestamp: Date.now(),
		device_tokens: 'your_device_token',			// 44-length token
		payload: {
			body: {
				ticker: 'test',
				title: 'test title 中文',
				text: 'test text 特殊字符🐶',
				after_open: 'go_app'
			},
			extra: {
				foo: 'bar'
			}
		}
	};

	Umeng.android.broadcast(info, function(err, httpResponse, result) {
		if(err) console.log(err);

		console.log(result);
	});


### 友情提醒开发者
- 请注意`appkey`是否开通推送功能再接入此SDK
- 如反复收到1018错误，可能并不是appkey的问题，而是http请求的header中content-type不是json/application，或content-length不正确
- 常会遇到中文编码问题导致2008错误[论坛帖子](http://bbs.umeng.com/thread-6928-1-1.html)，需将中文转码，该问题本SDK已修复
