const ajax = require('../../scripts/post');
const utils = require('../../scripts/utils');

function projectlist(search,callback){
    var params = {
        keywords : search || "",
        state:'',
        typeCode:''
    }
    ajax.post("/oa/weekItemQueryAction",params,function(data,flag,msg){
        if(flag){
            var cdata = JSON.parse(data.data);
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


module.exports = { projectlist };