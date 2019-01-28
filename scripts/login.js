/**
 * @description 登录操作
 * @version 1.0.0
 * @author Jie.
 */

const config = require("../config/config.json");
const encrypt = require("./encrypt");
const request = require('request');
const qs = require('querystring'); 
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

function beforeLogin() {
    var questions = [{
        type: 'input',
        name: 'username',
        default: function () {
            return config['username']||"";
        },
        message: "请输入用户名："
    }, {
        type: 'password',
        name: 'password',
        default: function () {
            return '';
        },
        message: "请输入密码："
    }];
    inquirer.prompt(questions).then((answers) => {
        var _answers = JSON.parse(JSON.stringify(answers))
        if(!_answers['username']){
            return console.log("请输入用户名！");
        }
        if(!_answers['password']){
            return console.log("请输入密码！");
        }
        login(_answers['username'],_answers['password']);
    });
}
function login(username, password) {
    /**加密密码 */
    encrypt.setMaxDigits(130);
    var key = new encrypt.RSAKeyPair(
        "10001",
        "",
        "818e85269508bd1b747a0fa10a85e832ce461ccc2195f944430611c7ac28b0da2eb7814a57c194a4fd396d6ec802aa74353fa4f6981bdc726d79400920304e6d60780f5b55fc312831618d512c32df94133cefddedd733843cd419b9c2e6c7bb593b134018d84c6a14e1e2931ddc0d9c9342fef8c95dd3cc29552f1056c822b1"
    );
    var ps = encrypt.encryptedString(key, encodeURIComponent(password));
    /**post表单内容 */
    var queryData = {
        username:username,
        password:ps
    };
    var content = qs.stringify(queryData);  
    /**请求配置*/
    var options = {
        method: 'post',
        url: config.rootPath + "/loginAsAction",
        form: content,
        type:"json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };
    var errorMsg = "登录出错,请稍后再试！";
    request(options, function (err, res, body) {
        if (err) {
            console.log(errorMsg);
            writeJson(username,ps,"");
        } else {
            try {
                body = JSON.parse(body);
            } catch (error) {
                body = {msg:errorMsg};
            }
            if(body&&body['status']=="SUCCESS"){
                console.log("登录成功");
                writeJson(username,ps,body['data']['bsessionid']);
            }else{
                console.log(body.msg);
                writeJson(username,ps,"");
            }
        }
    });
}
/**存到json文件中 */
function writeJson(username,password,bsessionid){
    config['username'] = username;
    config['password'] = password;
    config['bsessionid'] = bsessionid;
    var data = JSON.stringify(config,null,4);
    fs.writeFile(path.resolve("../config/config.json"),data,function(err){
        if(err){
            console.log(err);
        }
    });
}
module.exports = { beforeLogin,login };