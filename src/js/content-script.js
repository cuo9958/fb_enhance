// 向页面注入JS
function injectCustomJs(jsPath) {
    jsPath = jsPath || "js/inject.js";
    var temp = document.createElement("script");
    temp.setAttribute("type", "text/javascript");
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function () {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}

//启动
$(function () {
    const container = $("<div>").attr("id", "container");
    const btn = $("<btn>").attr("id", "go_btn").text("测试");
    $("body").append(container);
    container.append(btn);
    btn.click(function () {
        // command.test("测试数据");
        clickMessageBtn();
    });
});
//AdsCFObjectiveSelectorItemContainer-MESSAGES
function clickMessageBtn() {
    const btn = document.getElementById("AdsCFObjectiveSelectorItem-MESSAGES");
    console.log(btn);
    setTimeout(() => {
        btn.click();
    }, 520);
}
//内置命令
const command = {
    test: function (data, fn) {
        chrome.runtime.sendMessage({ name: "test", data }, function (response) {
            console.log("收到来自后台的回复：" + response);
            fn && fn();
        });
    },
};
//监听popup或者bj的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.name == "test") alert(request.data);
    sendResponse("我收到了你的消息！");
});
