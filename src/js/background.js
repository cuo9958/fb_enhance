// //通知
// chrome.notifications.create(null, {
// 	type: 'basic',
// 	iconUrl: 'img/icon.png',
// 	title: '这是标题',
// 	message: '您刚才点击了自定义右键菜单！'
// });

/**
 * request是传来的参数
 * sender是传入的对象url,tab
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (command[request.name]) {
        command[request.name].call(this, request.data, sendResponse, sender);
    }
});
const command = {
    test: function (data, response) {
        console.log("收到数据", data, typeof data);
        response("返回数据");
    },
};
//向content-script发消息
function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}
