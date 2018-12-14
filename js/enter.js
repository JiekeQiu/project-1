document.addEventListener('DOMContentLoaded',function(){
    $('.content_list_tab div').click(function(){
        $('.content_list_tab div').removeClass('active');//清空样式
        $(this).addClass('active');
        $('.content_r .page').css('display','none');
        $('.content_r .page').eq($(this).index()).css('display','block');
    });
    // 账号页验证码
    var random = document.querySelector('.random');
    var right = document.querySelector('.right');
    var error = document.querySelector('.error');
    var dynamic = document.querySelector('.dynamic'); 
    var isok3 = false;
    var num = random.value;
    num = randomNum();
    random.innerHTML= num;
    dynamic.onblur = function(){
        var val3 = dynamic.value;
        if(num==val3){
            error.style.display='none';
            right.style.display='block';
            isok3 = true;
                 
        }else{
            right.style.display='none';
            error.style.display='block';
        }
    };
    // 点击登录
    var user = document.querySelector('.user');
    var password = document.querySelector('.password');
    var remind = document.querySelector('.remind');
    var btn2 = document.querySelector('.btn2');
    btn2.onclick = function(){
        var val1 = user.value.trim();
        var val2 = password.value.trim();
        var val3 = dynamic.value.trim();
        if(val1 && val2 && val3){
            var url='../api/enter.php';
             // 判断val1是什么类型的值
            if(checkReg.tel(val1)){
                var data=`haha=tel&user=${val1}&password=${val2}&time=${new Date()}`;
            }else if(checkReg.name(val1)){
                var data=`haha=name&user=${val1}&password=${val2}&time=${new Date()}`;
            }
            ajax('POST',url,data,function(str){
                if(str=='yes'){
                    var now=new Date();
                    now.setDate(now.getDate()+7)
                    Cookie.set('user',val1,{'expires':now,'path':'/project/aa/src/'});
                    location.href='../index.html';
            }else{
                remind.style.display='block';
                remind.innerHTML='用户名或密码错误';
                     
            }
            })
        }else{
            remind.style.display='block';
            remind.innerHTML='请输入用户名或密码';
        }
    }
    





    // 短信页验证码
    var code = document.querySelector('.code');
    var btn = document.querySelector('.btn');
    btn.onclick = function(){
        code.value= randomNum();
    }

})