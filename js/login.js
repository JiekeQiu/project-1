document.addEventListener('DOMContentLoaded',function(){
    /*
    思路：
        验证用户名是否存在：不存在才能注册
        *把用户名传到接口，接口要验证该用户名是否存在
            *用ajax
            *事件：失去焦点
        *存在返回0，不存在返回1
     */
    var tel = document.querySelector('#tel');
    var phone =document.querySelector('.phone');
    var right1 = document.querySelector('.right1');
    // 用户名
    var username = document.querySelector("#username");
    var nickname =document.querySelector('.nickname');
    var right4 = document.querySelector('.right4');
    // 密码
    var password = document.querySelector('#password');
    var right3 = document.querySelector('.right3');
    var pass = document.querySelector(".pass");
    // 确认密码
    var aPasswod = document.querySelector('#aPasswod');
    var right2 = document.querySelector('.right2');
    var aPass = document.querySelector(".aPass");
    // 验证码
    var random = document.querySelector('.random');
    var right5 = document.querySelector('.right5');
    var error1 = document.querySelector('.error1');
    var verify = document.querySelector('.verify');
    // 条例
    var check = document.querySelector('.check');
         
    // 注册
    var btn = document.querySelector('.btn');

    //========== 开关================
    //手机开关
    var isok1 = false;
    
    // 用户名开关
    var isok2 = false;

    // 验证码开关
    var isok3 = false;

    // 密码开关
    var isok4 = false;

    // 判断是否同意条例
    var isok5 = false
    // 验证手机号码是否已被注册
   tel.onblur = function(){
        var val2 = tel.value.trim();
        if(val2){
            if(checkReg.tel(val2)){
                var url='../api/telName.php';
                var data = `tel=${val2}&time=&{new Date()}`;
                ajax('GET',url,data,function(str){
                    if(str=='0'){
                        right1.style.display='none';     
                        phone.style.display='inline';
                        phone.innerHTML='该号已被使用';     
                    }else{
                        right1.style.display='block';
                        phone.style.display='none';
                        isok1 = true;
                    }
                })
            }else{
                right1.style.display='none'; 
                phone.style.display='inline';
                phone.innerHTML='请输入正确的手机号码';
            }
        }else{
            right1.style.display='none'; 
            phone.style.display='inline';
            phone.innerHTML='请输入手机号码';
        }
    };

    // 验证用户是否存在
    username.onblur = function(){
        var val = username.value.trim();
        if(val){
            if(checkReg.name(val)){
                var url='../api/checkName.php';
                var data=`username=${val}&time=${new Date()}`;
                ajax("GET",url,data,function(str){
                    if(str=='0'){
                        right4.style.display='none';     
                        nickname.style.display='inline';
                        nickname.innerHTML='用户名已存在';
                    }else{
                        right4.style.display='block';
                        nickname.style.display='none';
                        isok2 = true;
                    }
                })   
            }else{
                right4.style.display='none'; 
                nickname.style.display='inline';
                nickname.innerHTML='请输入符合规则的用户名';
            }         
                 
        }else{
            right4.style.display='none'; 
            nickname.style.display='inline';
            nickname.innerHTML='请输入用户名';
        }
    };
    // 验证密码规则
    password.onblur = function(){
        var val4 = password.value.trim();
        if(val4){
            if(checkReg.psweasy(val4)){
                pass.style.display='none';
                right2.style.display='block'; 
                isok4 = true;
            }else{
                right2.style.display='none';
                pass.style.display='inline';
                pass.innerHTML='请输入正确密码格式';
            }         
                 
        }else{
            right2.style.display='none'; 
            pass.style.display='inline';
            pass.innerHTML='请输入密码';
        }
    };
    // 确认密码
    aPasswod.onblur = function(){
        var val5 = aPasswod.value.trim();
        var val4 = password.value.trim();
        if(val5){
            if(val5 == val4){
                aPass.style.display='none';
                right3.style.display='block';
            }else{
                right3.style.display='none';
                aPass.style.display='inline';
                aPass.innerHTML='两次密码不一致';
            }
        }else{
            right3.style.display='none';
            aPass.style.display='inline';
            aPass.innerHTML='请再次输入密码'; 
        }
    }
     
    // 验证码
    var num = random.value;
    num = randomNum();
    random.innerHTML= num;
    verify.onblur = function(){
        var val3 = verify.value;

        if(num==val3){
            error1.style.display='none';
            right5.style.display='block';
            isok3 = true;
        }else{
            right5.style.display='none';
            error1.style.display='inline';
        }
    };
    // 判断是否同意条例
    check.onclick=function(){
        isok5=!isok5;
    }
    btn.onclick=function(){
        if(isok5){
            if(isok1 && isok2 && isok3 && isok4){
                var val = username.value.trim();
                var val2 = tel.value.trim();
                var val4 = password.value.trim();
                var url='../api/reg.php';
                var data=`username=${val}&tel=${val2}&password=${val4}&time=${new Date()}`;
                ajax("POST",url,data,function(str){
                    if(str=='yes'){
                    //注册成功
                    location.href='enter.html'; 
                    }
                });
            }else{
                alert('请填写完整');  
            }

        }else{
            alert('请勾选');
        }
    }
})
