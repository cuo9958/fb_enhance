$(function () {
    $("#add").click(async function () {
        try {
            const tab = await getCurr();
            console.log(tab);
            const model = {
                url: tab.url,
                title: $("#title").val(),
            };
            console.log(model);
            const cookies = await getCookies(model.url);
            console.log(cookies);
        } catch (error) {
            alert(error.message);
        }

        // test();
    });
});
//获取当前页面
function getCurr() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true }, function (tab) {
            console.log(tab);
            if (tab.length === 0) {
                reject("没有获取到网页");
            } else {
                resolve(tab[0]);
            }
        });
    });
}
/**
 * 获取cookie:hostOnly,sameSite,session
 * 比用:domain,name,value,path,secure,httpOnly,expirationDate,storeId
 * @param {*} url url
 */
function getCookies(url) {
    return new Promise((resolve, reject) => {
        chrome.cookies.getAll({ url }, function (cookies) {
            resolve(cookies);
        });
    });
}
function test() {}
// // 读取数据，第一个参数是指定要读取的key以及设置默认值
// chrome.storage.sync.get({color: 'red', age: 18}, function(items) {
// 	console.log(items.color, items.age);
// });
// // 保存数据
// chrome.storage.sync.set({color: 'blue'}, function() {
// 	console.log('保存成功！');
// });
// chrome.tabs.sendMessage chrome.tabs.connect
// chrome.extension. getBackgroundPage()
