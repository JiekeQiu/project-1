//登录成功
document.addEventListener("DOMContentLoaded",function(){
    var login = document.querySelector('.login');

    var name = Cookie.get('user');
    function update(){
        var nmae = Cookie.get('user');
        console.log(name);
             
        if(name){
            login.innerHTML = name;
            $('.top_r li').mousemove(function(){
                $('.choose').css('display','block');
            })
            $('.top_r li').mouseout(function(){
                $('.choose').css('display','none');
            })
            
        }else{
            login.innerHTML = '请登录';
        }
    }
    update(); 
})
// 选项卡
document.addEventListener("DOMContentLoaded",function(){
    function Tab(){
            //构造函数里面放属性
            //var this=new Object();原料
            this.oNav = document.getElementById('nav');//Object
            this.aLi = this.oNav.getElementsByTagName('li'); //通过标签名查找元素//Object
            this.oList= document.getElementsByClassName('nav_list')[0];
            this.aCon = this.oNav.getElementsByClassName('con'); //通过类名查找元素//Object

            //return obj;
        }
        
        Tab.prototype.init=function(){//方法
            //循环绑定事件
            for(var i = 0; i < this.aLi.length; i++) {//Object
                var _this=this;//Object
                this.aLi[i].index = i; //添加索引，做一个标识，点击的时候就可以知道我点的是第几个了Object
                
                this.aLi[i].onmousemove= function() {//Object
                    _this.mousemove(this);//两个：第一个this：aLi[i]变成Object(修正指向) 后面：aLi[i]
                }

            }
            this.oList.onmouseout = function() {//Object
                    _this.mouseout();//两个：第一个this：aLi[i]变成Object(修正指向) 后面：aLi[i]
                }
        }

        Tab.prototype.mousemove=function(now) {//方法
            //排他:清空
            
            for(var i = 0; i < this.aLi.length; i++) {//Object
                this.aLi[i].className = '';
                this.aCon[i].style.display = 'none';
            }
            now.className = 'active'; //添加类名
            this.aCon[now.index].style.display = 'block';
        }

        Tab.prototype.mouseout=function() {//方法
            //排他:清空
            
            for(var i = 0; i < this.aLi.length; i++) {//Object
                this.aLi[i].className = '';
                this.aCon[i].style.display = 'none';
            }
        }


        var t1=new Tab();
        t1.init();//t1:Object
        
})
// 跳楼
document.addEventListener("DOMContentLoaded",function(){
    var main = document.getElementById("main");
    var top = document.getElementById("top");
    var catalog = document.getElementById("catalog");
    var aLis = catalog.getElementsByTagName("li");
    // var page = document.getElementById("page");
    var skip = main.getElementsByClassName('skip');
    var scrollTop = main.offsetTop;
    var tiems;
    for(var i=0;i<aLis.length;i++){
        aLis[i].index = i;
        aLis[i].onclick = function(){
            clearClass();
            this.className = 'active';
            
            window.scrollTo(0, skip[this.index].offsetTop);

        }
    }
    function clearClass(){
        for(var i=0;i<aLis.length;i++){
            aLis[i].className = '';
        }
    }
    window.onscroll=function(){
        var scrollTop=window.scrollY;
        for(var i=0;i<skip.length;i++){
            var Top=skip[i].offsetTop;
            if(scrollTop>=Top){
                clearClass();
                aLis[i].className='active';
            }
        }
        xiding();
                        
    }
    function xiding(){
        var topScroll = window.scrollY;
        var mainScroll = window.scrollY;
        if(topScroll>=600 || mainScroll>=scrollTop){
            top.style.display = 'block';
            main.className='menu';                         
        }else{
            top.style.display = 'none';
            main.className='';
        }
    }
   
    top.onclick = function(){
        clearInterval(tiems);
        tiems = setInterval(function(){
            var currentPos = window.scrollY;
            if(currentPos <=0){
                currentPos = 0;
                clearInterval(tiems);
            }
            var speed = Math.ceil(currentPos/10);
            currentPos -= speed;
            window.scrollTo(0,currentPos);
        },30)
        
    }
})



//------------------------------------------------
/*
js 轮播图特效（面向对象插件版）
 1）、开定时器，让图片运动：旧图挪走，新图进入可视区
 2）、(鼠标经过停止)点击上下按钮：可以切换下一张和上一张
 3）、焦点跟随，点击焦点可以切到对应的图片
 
 由于格式相对固定，需配合以下链接中的html格式使用，需要的话还有css可用
 D:\Study\second_stage\二阶段项目技术点\1.首页\轮播图\完美轮播图\轮播图封装.html
  */

function sliderShow(id,special) {
    this.special = special;
    this.slideimg = getid(id); //最大盒子
    this.ul = this.slideimg.children[0].children[0];
    this.alis = this.ul.children;
    this.iW = this.alis[0].offsetWidth; //获取一个图片的宽度
    this.num = 0; //可视区内图片下标，当前的那张
    this.light = this.slideimg.children[1];
    this.aspan = this.light.children; //焦点
}
sliderShow.prototype.init=function(){
    var _this = this;console.log(this.iW);
    //1.图片都在右侧
    for(var i = 0; i < this.alis.length; i++) {
        this.alis[i].style.left = this.iW + 'px';
    }

    //2.第一个图放到可视区
    this.alis[0].style.left = 0;

    //3、不断的轮下一张，开定时器：旧图挪走，新图进入可视区
    var timer = null;
    clearInterval(timer);
    timer = setInterval(function(){_this.next();}, 2000); //每隔2秒切一张图

    
    //4、鼠标经过停止，鼠标离开继续轮播
    this.slideimg.onmouseenter = function() {
        clearInterval(timer); //鼠标经过清除定时器
    }

    this.slideimg.onmouseleave = function() {
        clearInterval(timer); //放在定时器叠加
        timer = setInterval(function(){_this.next();}, 2000);
    }

    
    //7.点击焦点可以切到对应的图片
    for(var i = 0; i < this.aspan.length; i++) {
        this.aspan[i].index = i;
        this.aspan[i].onclick = function() {
            //给每一个焦点绑定点击事件
            var index = this.index;
            _this.spanClick(index);
        }
    }
}

sliderShow.prototype.next=function() { //切一个图片
    //旧图挪走 num=0
    startMove(this.alis[this.num], {'left': -this.iW});

    //新图进入可视区  this.num=1,先把新图放在右侧，再挪进来
    //      this.num++;
    this.num = ++this.num >= this.alis.length ? 0 : this.num;
    this.alis[this.num].style.left = this.iW + 'px';
    startMove(this.alis[this.num], {'left': 0}); //挪到可视区
    this.spanAvtive();
}



//6、焦点跟随，点击焦点可以切到对应的图片
sliderShow.prototype.spanAvtive=function() {
    for(var i = 0; i < this.aspan.length; i++) {
        this.aspan[i].className = '';
    }
    this.aspan[this.num].className = this.special;
}

sliderShow.prototype.spanClick=function(index){
    //判断方向
    if(index > this.num) {
        //从右边切到可视区
        //旧图 this.num 挪到左边
        startMove(this.alis[this.num], {'left': -this.iW});
        //新图 index 先放在右侧，再挪进可视区
        this.alis[index].style.left = this.iW + 'px';
        startMove(this.alis[index], {'left': 0});
        this.num = index;
        this.spanAvtive();
    }
    if(index < this.num) {
        //从左边切入
        //旧图挪到右侧
        startMove(this.alis[this.num], {'left': this.iW});
        //新的快速放左边，再进入可视区  index
        this.alis[index].style.left = -this.iW + 'px';
        startMove(this.alis[index], {'left': 0});
        this.num = index;
        this.spanAvtive();
    }
}

// ============中间轮播图=======
//------------------------------------------------
function sliderShow2(id,special) {
    this.special = special;
    this.slideimg = getid(id); //最大盒子
    this.ul = this.slideimg.children[0].children[0];
    this.alis = this.ul.children;
    this.iW = this.alis[0].offsetWidth; //获取一个图片的宽度
    this.num = 0; //可视区内图片下标，当前的那张
    this.pis = this.slideimg.children[1];
    this.prevImg = this.pis.children[0]; //上一张
    this.nextImg = this.pis.children[1]; //下一张
}
sliderShow2.prototype.init=function(){
    var _this = this;
    //1.图片都在右侧
    for(var i = 0; i < this.alis.length; i++) {
        this.alis[i].style.left = this.iW + 'px';
    }

    //2.第一个图放到可视区
    this.alis[0].style.left = 0;


    //5.点击上下按钮：可以切换下一张和上一张
    this.prevImg.onclick = function() {
        //上一张
        _this.prev();
    }

    this.nextImg.onclick = function() {
        //下一张
        _this.next();
    }
}

sliderShow2.prototype.next=function() { //切一个图片
    //旧图挪走 num=0
    startMove(this.alis[this.num], {'left': -this.iW});

    //新图进入可视区  this.num=1,先把新图放在右侧，再挪进来
    //      this.num++;
    this.num = ++this.num >= this.alis.length ? 0 : this.num;
    this.alis[this.num].style.left = this.iW + 'px';
    startMove(this.alis[this.num], {'left': 0}); //挪到可视区
}

sliderShow2.prototype.prev=function() {
    //旧图挪到右侧 this.num 0
    startMove(this.alis[this.num], {'left': this.iW});
    //新图快速放到左侧，再挪进可视区
    //      this.num--; //this.num 5
    this.num = --this.num < 0 ? this.alis.length - 1 : this.num;
    this.alis[this.num].style.left = -this.iW + 'px';
    startMove(this.alis[this.num], {'left': 0}); //可视区
}



sliderShow2.prototype.spanClick=function(index){
    //判断方向
    if(index > this.num) {
        //从右边切到可视区
        //旧图 this.num 挪到左边
        startMove(this.alis[this.num], {'left': -this.iW});
        //新图 index 先放在右侧，再挪进可视区
        this.alis[index].style.left = this.iW + 'px';
        startMove(this.alis[index], {'left': 0});
        this.num = index;
        this.spanAvtive();
    }
    if(index < this.num) {
        //从左边切入
        //旧图挪到右侧
        startMove(this.alis[this.num], {'left': this.iW});
        //新的快速放左边，再进入可视区  index
        this.alis[index].style.left = -this.iW + 'px';
        startMove(this.alis[index], {'left': 0});
        this.num = index;
        this.spanAvtive();
    }
}
window.onload = function() {
                //面向插件的封装和使用
                var lunbo1 = new sliderShow('slideshow','active');
                 var lunbo2 = new sliderShow('main_top_lunbo','active');
                 var lunbo3 = new sliderShow2('sliedimg','active');
                 var lunbo4 = new sliderShow('main_bottom_lunbo','active');
                 var lunbo5 = new sliderShow2('main_bottom_bC_lunbo','active');
                lunbo1.init();
                lunbo2.init();
                lunbo3.init();
                lunbo4.init();
                lunbo5.init();
}
// 页面渲染
document.addEventListener('DOMContentLoaded',function(){
    var main = document.querySelector('#main');
    main.onclick=function(){
        location.href= 'html/list.html';
    }    
})





