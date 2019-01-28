
/**
 * 模拟请求
 * @author Jie.
 */

const config = require("../config/config.json");
const utils = require("./utils");
const qs = require('querystring'); 
const request = require('request');

// var param =  {
//     page:1,
//     rows: 8,
//     noticeTypeId: "",
//     examineStateCode: "1"
// };
// post("/notice/queryCompanyNoticeAction",param,function(data,flag,msg){
//     console.log(data);
// });
/**
 * 模拟p9的请求
 * @param action action
 * @param param 参数
 * @param callBack 回调函数
 */
function post(action, param, callBack) {
    var bid = config['bsessionid'];
    if (!bid) return utils.print("请先登录再操作!", "red");
    if (action.indexOf("bsessionid=") == -1) {
        if (action.indexOf("?") > -1) {
            action += "&as_call_type=ajax&bsessionid=" + bid;
        } else {
            action += "?as_call_type=ajax&bsessionid=" + bid;
        }
    }
    var content = param ? qs.stringify(param) : null;
    var options = {
        method: 'post',
        url: config.rootPath + action,
        form: content,
        type: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };
    request(options, function (err, res, body) {
        if (err) {
            utils.print(err, "red");
        } else {
            try {
                body = JSON.parse(body);
            } catch (error) {
                body = { msg: "解析结果时出错!" };
            }
            if (body && body['status'] == "SUCCESS") {
                callBack && callBack(body.data, true, "success");
            } else {
                callBack && callBack(body.data, false, body.msg);
            }
        }
    });
}
module.exports={post};