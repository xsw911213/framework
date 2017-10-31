/*
 * 本插件共有两种使用方法:
 * 1.alert(str,autoHide),参数一为必填,字符串类型,参数二非必填,
 * ——例:
 * document.getElementById('alert').onclick = function(){
        alert('这是一条提示信息');
    };
 * document.getElementById('alert').onclick = function(){
        alert('这是一条自动消失的提示信息',autHide);
    };
 * 2.confirm(str,fun0,fun1,arr)
 * —第一个参数str为必填,字符串类型;
 * —第二个参数fun0为必填,为点击"取消"(左边)时执行的方法的方法名;
 * —第三个参数fun1为必填,为点击"确认"(右边)时执行的方法的方法名;
 * —第四个参数arr为选填参数,若填写则必须是填写数组类型的值,如['1','2'],否则则为默认值为['取消','确认'];
 * ——例:
 *  function aaa(){
        console.log(111);
    }
    function bbb(){
        console.log(2222);
    }

    document.getElementById('confirm1').onclick = function(){
        confirm('这是真的吗?',aaa,bbb);
    };

    document.getElementById('confirm2').onclick = function(){
        confirm('这是真的吗?',aaa,bbb,['否','是']);
    };

    PS：使用的时候需要有css的初始化，否则在显示时会出现一些问题
 */

(function(){
    var style = document.createElement('style');
    style.innerHTML = '.alert_parent{display:none;position:fixed;width:100%;height:100%;top:0;left:0;background-color:rgba(0,0,0,.7)}.close{position:absolute;width:100%;height:100%;top:0;left:0}.alert_chlid{position:absolute;width:'+280 * devicePixelRatio+'px;height:auto;top:50%;left:50%;border-radius:10px;background-color:#fff;overflow:hidden;transform:translate(-50%,-50%)}.alert_msg{position:relative;width:'+240 * devicePixelRatio+'px;margin:'+25 * devicePixelRatio+'px '+20 * devicePixelRatio+'px;text-align:center;font-size:'+14 * devicePixelRatio+'px;word-wrap:break-word}.no{position:relative;float:left;width:'+140*devicePixelRatio+'px;height:'+40 * devicePixelRatio+'px;border:hidden;border-top:solid 1px #e2e2e2;background-color:#fff;font-size:'+14 * devicePixelRatio+'px}.yes{position:relative;float:left;width:'+140*devicePixelRatio+'px;height:'+40 * devicePixelRatio+'px;border:hidden;border-top:solid 1px #e2e2e2;font-size:'+14 * devicePixelRatio+'px;color:#fff;background-color:#009cff}.show{animation-name:show;animation-duration:.2s;animation-timing-function:linear;animation-fill-mode:both;-webkit-animation-name:show;-webkit-animation-duration:.2s;-webkit-animation-timing-function:linear;-webkit-animation-fill-mode:both}@keyframes show{0%{transform:translate(-50%,-50%) scale(0)}80%{transform:translate(-50%,-50%) scale(1.15)}100%{transform:translate(-50%,-50%) scale(1)}}@-webkit-keyframes show{0%{-webkit-transform:translate(-50%,-50%) scale(0)}80%{-webkit-transform:translate(-50%,-50%) scale(1.15)}100%{-webkit-transform:translate(-50%,-50%) scale(1)}}.hide{animation-name:hide;animation-duration:.2s;animation-timing-function:linear;animation-fill-mode:both;-webkit-animation-name:hide;-webkit-animation-duration:.2s;-webkit-animation-timing-function:linear;-webkit-animation-fill-mode:both}@keyframes hide{0%{transform:translate(-50%,-50%) scale(1)}80%{transform:translate(-50%,-50%) scale(1.15)}100%{transform:translate(-50%,-50%) scale(0)}}@-webkit-keyframes hide{0%{-webkit-transform:translate(-50%,-50%) scale(1)}80%{-webkit-transform:translate(-50%,-50%) scale(1.15)}100%{-webkit-transform:translate(-50%,-50%) scale(0)}}';
    //style.innerHTML = '.alert_parent{display:none;position:fixed;width:100%;height:100%;top:0;left:0;background-color:rgba(0,0,0,.7)}.close{position:absolute;width:100%;height:100%;top:0;left:0}.alert_chlid{position:absolute;width:2.8rem;height:auto;top:50%;left:50%;border-radius:10px;background-color:#fff;overflow:hidden;transform:translate(-50%,-50%)}.alert_msg{position:relative;width:2.4rem;margin:.25rem .2rem;text-align:center;font-size:.14rem;word-wrap:break-word}.no{position:relative;float:left;width:1.4rem;height:.4rem;border:hidden;border-top:solid 1px #e2e2e2;background-color:#fff;font-size:.18rem}.yes{position:relative;float:left;width:1.4rem;height:.4rem;border:hidden;border-top:solid 1px #e2e2e2;font-size:.18rem;color:#fff;background-color:#009cff}.show{animation-name:show;animation-duration:.2s;animation-timing-function:linear;animation-fill-mode:both;-webkit-animation-name:show;-webkit-animation-duration:.2s;-webkit-animation-timing-function:linear;-webkit-animation-fill-mode:both}@keyframes show{0%{transform:translate(-50%,-50%) scale(0)}80%{transform:translate(-50%,-50%) scale(1.15)}100%{transform:translate(-50%,-50%) scale(1)}}@-webkit-keyframes show{0%{-webkit-transform:translate(-50%,-50%) scale(0)}80%{-webkit-transform:translate(-50%,-50%) scale(1.15)}100%{-webkit-transform:translate(-50%,-50%) scale(1)}}.hide{animation-name:hide;animation-duration:.2s;animation-timing-function:linear;animation-fill-mode:both;-webkit-animation-name:hide;-webkit-animation-duration:.2s;-webkit-animation-timing-function:linear;-webkit-animation-fill-mode:both}@keyframes hide{0%{transform:translate(-50%,-50%) scale(1)}80%{transform:translate(-50%,-50%) scale(1.15)}100%{transform:translate(-50%,-50%) scale(0)}}@-webkit-keyframes hide{0%{-webkit-transform:translate(-50%,-50%) scale(1)}80%{-webkit-transform:translate(-50%,-50%) scale(1.15)}100%{-webkit-transform:translate(-50%,-50%) scale(0)}}'
    //创建父级元素
    var ulparent = document.createElement('ul');
    ulparent.className = 'alert_parent';
    //创建阻止滑动层
    var ulpre = document.createElement('ul');
    ulpre.id = 'pre';
    //创建关闭按钮
    var close = document.createElement('a');
    close.className = 'close';
    //创建提示框
    var ulchlid = document.createElement('ul');
    ulchlid.className = 'alert_chlid';

    //生成
    document.body.appendChild(style);
    document.body.appendChild(ulparent);
    ulparent.appendChild(ulpre);
    ulparent.appendChild(close);
    ulparent.appendChild(ulchlid);

    var pre = document.getElementById('pre');
    pre.addEventListener('touchmove',function(e){
        e.preventDefault();
    });


    function showAlertMsg(){
        var alertParent = document.querySelector('.alert_parent');
        var alertChlid = document.querySelector('.alert_chlid');
        alertParent.style.display = 'block';
        alertChlid.className = 'alert_chlid show';
    };

    function hideAlertMsg(){
        var alertParent = document.querySelector('.alert_parent');
        var alertChlid = document.querySelector('.alert_chlid');
        alertChlid.className = 'alert_chlid hide';
        setTimeout(function(){
            alertParent.style.display = 'none';
        },300);
    };

    window.alert=function(alertMesg,autoHide){
        var isClick = false;
        //创建提示信息
        var alertChild = document.querySelector('.alert_chlid');
        alertChild.innerHTML='';
        var alertMsg = document.createElement('p');
        alertMsg.className = 'alert_msg';
        alertMsg.innerText = alertMesg;
        alertChild.appendChild(alertMsg);

        document.querySelector('.close').onclick = function(){
            isClick=true;
            var alertParent = document.querySelector('.alert_parent');
            var alertChlid = document.querySelector('.alert_chlid');
            alertChlid.className = 'alert_chlid hide';
            setTimeout(function(){
                alertParent.style.display = 'none';
            },300);
        };

        showAlertMsg();

        if(autoHide){
            setTimeout(function(){
                if(isClick==false){
                    hideAlertMsg();
                }
            },4000);
        }
    };


    window.confirm = function(confirmMesg,cancleFun,confirmFun,arr){
        function isArray (arr){
            return '[object Array]' == Object.prototype.toString.call(arr);
        }
        arguments[3] = (arguments[3] == undefined || isArray(arr)==false) ? ['取消','确认'] : arguments[3];
        var alertChild = document.querySelector('.alert_chlid');
        alertChild.innerHTML='';
        var confirmMsg = document.createElement('p');
        confirmMsg.className = 'alert_msg';
        confirmMsg.innerText = confirmMesg;
        alertChild.appendChild(confirmMsg);
        var buttonClassName = ['no','yes'];
        for(i = 0;i<2;i++){
            //创建按钮
            var button = document.createElement('button');
            button.className = buttonClassName[i];
            //button.style = 'position:relaive;width:150px;height:50px;background-color:rgb(0,156,255);border:hidden;font-size:26px;color:rgb(255,255,255);transform:translate(65px,-10px);';
            button.innerText = arguments[3][i];
            //生成
            ulchlid.appendChild(button);
            showAlertMsg();
        }
        document.querySelector('.no').onclick = function(){
            cancleFun();
            hideAlertMsg();
        };
        document.querySelector('.yes').onclick = function(){
            confirmFun();
            hideAlertMsg();
        };
    }
})();


