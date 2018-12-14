function ajax(mechod,url,data,success){
    
    //1.创建对象
    var xhr=new XMLHttpRequest();
    
    if(mechod=='GET' && data){
        //请求方式是get并且有数据
        url+='?'+data;  //var url=`api/checkname.php?username=${val}&time=${new Date()}`;
    }
    
    xhr.open(mechod,url,true);
    
    //2.发送请求
    if(mechod=='GET'){
        xhr.send();//如果是get方式，直接发送请求
    }else{
        //post方式
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(data);//如果是post方式，数据放在send()里面传输
    }
    
    //3.后台做
    
    //4.接收数据
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                //成功的：dom操作，数据渲染
                if(success){
                    //如果有回调，就用回调
                    success(xhr.responseText);//实参
                }
            }else{
                alert('出错了，状态码是：'+xhr.status);//404 找不到页面，408请求超时
            }
        }
    }
    
}



/**
 * Created by Xnew on 2016/8/25.
 */
//animate 动画
//    step 步长
// 目标位置
function animate(obj, target){
    clearInterval(obj.timer);
    var step = obj.offsetLeft < target ? +10 : -10;
    obj.timer = setInterval(function(){
        obj.style.left = obj.offsetLeft + step + "px";
        //console.log(Math.abs(target - obj.offsetLeft));
        if(Math.abs(target - obj.offsetLeft) <= 10){
            obj.style.left = target + "px";
            clearInterval(obj.timer);
        }
    }, 10)
}
/*
    公共函数：经常会使用到的函数，大家都可以调用
*/


/*
    randomNum(min,max)
    生成min到max之间的一个随机数
    参数一：最小值
    参数二：最大值
 */
function randomNumber(min,max){
    //返回min到max之间的随机数
    //最小的：Math.random()+min 0-1之间   0-0.99999
    //最大的：Math.random()*max+1
    return parseInt(Math.random() * (max - min + 1)) + min;
}

//----------------------------------------------
/*
    getid(id):
    说明：通过id查找元素
    参数：传id名进来
    
 */
function getid(i){
    return document.getElementById(i);
}

//------------------------------------------------
/*
    filterTex(str)
        过滤敏感词汇
        参数：传入需要过滤的字符串，将敏感词转为'**'，返回过滤后的str
 */
function filterTex(str){
    //敏感词库
    var sensitiveWord = ['傻B','妈蛋','fuck','操','日','鸡巴','艹','你妈','bitch','婊子','傻X','叼你','垃圾','扑街','死'];
    //逐个对比敏感词库并用**替换敏感词
    for(var i=0;i<sensitiveWord.length;i++){
        var reg = new RegExp(sensitiveWord[i],'gi');
        str = str.replace(reg,'**');
    }
    return str;
}

//-----------------------------------------
/*
    randomColor(str);
    说明：生成随机颜色
    参数：传参数16生成16进制颜色，传入参数'rgb'生成rgb颜色
*/
function randomColor(str){
    if(str==16){
        //生成16进制颜色'0123456789abcdef'
        var str = '0123456789abcdef';
        var color = '#';
        for(var i=0;i<6;i++){
            color += str.charAt(parseInt(Math.random()*str.length));
        }
        return color;
    }else if(str=='rgb'){
        //生成rgb(255,255,255),3个随机数，每个都在0-255之间
        var r = parseInt(Math.random() * 256);
        var g = parseInt(Math.random() * 256);
        var b = parseInt(Math.random() * 256);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }else{
        alert('传入参数16或rgb');
    }
}

//-----------------------------------------
/*
    随机生成4位数字加大小写字母验证码
 */
function randomNum(){
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //2.生成随机思维数有字母的验证码
    var num = '';
    for(var i=0;i<4;i++){
        num += str.charAt(parseInt(Math.random()*str.length));
    }
    return num;
}

//-----------------------------------------------
/*
    zeroize(num)
    说明：补零操作
    如果num小于10，则给其前面补上0，如：1 => 01
 */
function zeroize(num){
    if(num<10){
        return '0' + num;
    }else{
        return '' + num;
    }
}

//-------------------------------------------
//封装时间函数，把毫秒转成xx天xx时xx分xx秒
//返回值为对象：return{}

function setTime(msec){
    var _sec = Math.floor(msec/1000);
    var sec = zeroize(msec%60);//秒
    var min = zeroize(Math.floor(msec/60)%60);//分
    var hour = zeroize(Math.floor(msec/60/60)%24);//小时
    var day = Math.floor(msec / 60 / 60 / 24);//天
    return{//想返回多个数的时候，做成json数据
        'sec':sec,
        'min':min,
        'hour':hour,
        'day':day
    };
}

//-------------------------
//字符串转成对象

//传的参数： id=001&name=iphone7 plugs&imgurl=img/ip7.jpg&price=5899&sale=5888
//返回值：{id: "001", name: "iphone7 plugs", imgurl: "img/ip7.jpg", price: "5899", sale: "5888"}

function strToObj(str){
    var obj = {};
    var arr1 = str.split('&');
    for(var i=0;i<arr1.length;i++){
        var arr2 = arr1[i].split('=');
        obj[arr2[0]] = arr2[1];
    }
    return obj;
}



//---------------------------
//对象转成字符串方法封装

//传的参数：{id: "001", name: "iphone7 plugs", imgurl: "img/ip7.jpg", price: "5899", sale: "5888"}
//返回值： id=001&name=iphone7 plugs&imgurl=img/ip7.jpg&price=5899&sale=5888

function objToStr(obj){
    var str = '';
    for(var key in obj){
        str += key + '=' + obj[key] + '&';
    }
    str = str.slice(0,-1);
    return str;
}



//---------------------------
//事件监听
/*
    事件监听兼容性处理：
    参数一：节点名
    参数二：事件名称
    参数三：事件处理函数
 
 */

function bind(ele,type,fn){
    if(ele.addEventListener){
        //ie9+ 主流浏览器
        ele.addEventListener(type,fn,false);
    }else{
        //ie8-
        ele.attachEvent('on'+type,fn);
    }
}


//------------------------------
/*
    获取样式，可以获取元素的css样式，兼容所有浏览器
    参数一obj：节点名
    参数二name：属性名
 */
function getstyle(obj, name) {
    //获取样式
    if(obj.currentStyle) {
        //ie8-
        return obj.currentStyle[name];
    } else {
        //主流浏览器
        return getComputedStyle(obj,false)[name];
    }
}


/*
    运动框架封装：startMove()
    最终版：多对象，多属性，链式运动框架(运动队列)
    参数一：对象名
    参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
    参数三：回调函数(可选参数)
 */

function startMove(obj,json,fnend){
    clearInterval(obj.timer);//关闭所有定时器，防止定时器
    obj.timer = setInterval(function(){//使用obj.timer 每个对象都有自己的定时器，防止多个对象使用同一个定时器，导致清除了其他对象的定时器
        var istrue = true;//设置开关，控制回调函数的执行
        //1.遍历，获取属性名，设置初始键值
        for(var key in json){
            var cur = 0;//存初始值
            if(key == 'opacity'){
                cur = getstyle(obj,key) * 100;//透明度
            }else{
                cur = parseInt(getstyle(obj,key));//width、height、border-width等以px为单位
            }
            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            var speed = (json[key] - cur) / 6;//距离越大，速度越大，该式中speed具有方向
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);//去除小数部分，speed绝对值最小值为1，避免对象在临界值附近晃动
            if(cur != json[key]){
                istrue = false;//如果没有达到目标值，开关false
            }else{
                istrue = true;
            }
            //3.运动
            if(key == 'opacity'){
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter = `alpha(opacity:${cur + speed})`;
            }else{
                obj.style[key] = cur + speed + 'px';//针对普通属性left、top、height
            }
        }
        //4.回调函数：准备一个开关，确保以上json所有的属性都已经达到目标值，才能调用这个回调函数
        if(istrue){//如果为true，证明以上属性都达到了目标值
            clearInterval(obj.timer);
            if(fnend){
                fnend();
            }
        }

    },30);
}

/*
    checkReg:正则封装，函数可进行表单验证
        checkReg.trim():去除前后空格
        tel():电话号码
        email():邮箱
        idcard()：身份证
        psweasy():6-18位首字母开头密码
        pwwagain(str1,str2)：判定str1和str2是否相等
        urladr()：域名
        name()：账号字母开头,6-20位

 */
var checkReg = {
    trim: function(str) { //去掉前后空格
        var reg = /^\s+|\s+$/g;
        return str.replace(reg, '');
    },
    tel: function(str) { //号码
        var reg = /^1[3-9]\d{9}$/
        return reg.test(str);
    },
    email: function(str) { //邮箱正则
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //网上推荐
        return reg.test(str);
    },
    idcard: function(str) { //身份证
        var reg = /^(\d{17}|\d{14})[\dX]$/;
        return reg.test(str);
    },
    psweasy: function(str) { //6-18位首字母开头
        var reg = /^[a-zA-Z]\w{5,17}$/;
        return reg.test(str);
    },
    pwwagain: function(str1, str2) {
        return str1 === str2; //全等 恒等
    },
    urladr: function(str) {
        var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        return reg.test(str);
    },
    name:function(str){//账号字母开头,6-20位
        var reg=/^[a-zA-Z][\w\-]{5,19}$/;
        return reg.test(str);
    },
    chinese:function(str){//中文
        var reg=/^[\u2E80-\u9FFF]+$/;
        return reg.test(str);
    },
    birthday:function(str){//从1900到2099年间，有闰年2月29
        var reg = /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;
        return reg.test(str);
    }
}


//--------------------------------
/*
    封装cookie函数:
    存: Cookie.set()
    取:  Cookie.get()
    删: Cookie.remove()
 */

var Cookie={
    
    set:function(name,value,prop){//设置cookie
        //存数据到cookie里面:必写的
        var str=name+'='+value;
        
        //json存后面一些可选参数
        if(prop){
            //expires:设置失效时间
            if(prop.expires){
                str+=';expires='+prop.expires.toUTCString();//把时间转成字符串
            }
            //设置path路径
            if(prop.path){
                //如果设置了
                str+=';path='+prop.path;
            }
            //domain设置可访问cookie的域名
            if(prop.domain){
                str+=';domain='+prop.domain;
            }
        }
        //写到cookie
        document.cookie=str;
    },
    get:function(key){
        var cookies=document.cookie;//name=tiantian; age=18; usn=yuanyuan; pws=456123
        var arr=cookies.split('; ');//['name=tiantian','age=18','usn=yuanyuan','pws=456123']
        for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//['name','tiantian']
            if(key==arr2[0]){
                return arr2[1];
            }
        }
    },
    remove:function(key){
        //删的原理:设置过期时间
        var now=new Date();
        now.setDate(now.getDate()-1);
        this.set(key,'no',{expires:now});//'no'：是因为该键将删除，所以写什么键值都行
    }
}


/*
    ajax函数封装：要参数
        参数一：请求方式：get  post
        参数二：接口路径
        参数三：数据(可选)  name='tiantian'&psw=123456  传给后端的数据
        参数四：成功的回调函数(可选的)
 
*/
     
