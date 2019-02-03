const ajax = require('../../scripts/post');
const utils = require('../../scripts/utils');
const data = require('../../scripts/data');
const fs = require("fs");
const ph = require("path");
/**查看项目 */
function projectlist(search,callback){
    var params = {
        keywords : search || "",
        state:'',
        typeCode:''
    }
    ajax.post("/oa/weekItemQueryAction",params,function(data,flag,msg){
        if(flag){
            var cdata = JSON.parse(data.data.data);
            var rows = cdata.rows;
            if(rows && rows.length==0){
                utils.print("未搜索到项目!");
            }else{
                if(callback){
                    callback(rows);
                }else{
                    for(var i in rows){
                        var name = rows[i]['name'];
                        var code = rows[i]['code'];
                        console.log((i*1+1)+"."+name+","+code);
                    }
                }
            }
        }else{
            utils.print("查询项目出错!","red");
        }
    });
}
/**data的配置 */
var dayDataConfig = {
    queryAction:{
        url:"/oa/queryDailyReportAction",
        param:{
            'dayTime':''
        }
    },
    saveAction:{
        url:"/oa/dailyReportSaveAction"
    },
    newAction:{
        url:"/oa/dailyReportNewAction",
        param:{
            'dayTime':''
        }
    }
};
var itemDataConfig = {
    newAction: {
        url: "/oa/dailyReportDetailNewAction"
    },
    saveAction: {
        url: "/oa/dailyReportDetailSaveAction"
    },
    queryAction: {
        url: "/oa/dailyReportDetailQueryAction",
        param: {
            'masterId':"1"
        }
    },
};
var dayData = data.creat('dayData',dayDataConfig);
var itemData = data.creat('itemData',itemDataConfig);
/**编写日报 */
function writeDaily(){
    var path = ph.resolve(process.cwd(),"./dayreport.json");
    fs.exists(path,function(exists){
        if(!exists){
            utils.print("根目录下没发现日报配置文件!","red");
        }else{
            queryDay(path);
        }
    });
    function queryDay(path){
        /**读取日报配置文件 */
        readDayConfig(path,function(sdata){
            if(!sdata['date']){
                return utils.print("请设置填写日报的日期！","red");
            }
            dayDataConfig.queryAction.param.dayTime = sdata['date'];
            dayDataConfig.newAction.param.dayTime = sdata['date'];
            dayData.clear();
            dayData.refreshData(function(cdata,flag,msg){
                if(flag){
                    if(cdata.length >0){
                        dayData.selectRow(cdata[0]['id']);
                        var aaa = dayData.getValue("content");
                        utils.print(aaa);
                        //s.mainId = dayData.getValue("id");
                        //s.queryItem(dayData.getValue("id"));
                    }else{
                        dayData.newData(function(rowId,flag){   
                           if(flag){
                               dayData.selectRow(rowId);
                               utils.print("日报id："+rowId);
                           }else{
                               utils.print("新建日报失败","red");
                           }
                        });
                    }
                }else{
                    utils.print("获取日报信息失败","red");
                }
            });
        });
    }
};
function readDayConfig(path,callback){
    fs.readFile(path, 'utf-8', function (err, data) {
        if (err) {
            utils.print('日报配置文件读取失败!', "red");
            callback && callback(null);
        } else {
            try {
                var re = JSON.parse(data);
                callback && callback(re);
            } catch (e) {
                callback && callback(null);
            }
        }
    });
};
module.exports = { projectlist,writeDaily };