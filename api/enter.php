<?php
    /*
        查询登录页输入的用户名和密码是否正确
            get:
                username：用户名
                password：密码
            返回：

     */
    //连接数据库
    include 'connect.php';
    
    //接收数据
    $username=isset($_POST['user']) ? $_POST['user'] : '';
    $password=isset($_POST['password']) ? $_POST['password'] : '';
    $haha = $_POST['haha'];
    
    //写查询语句
    $sql="SELECT * FROM `user` WHERE $haha='$username' AND `password`='$password'";
    
    //执行：内部编译
    $res=$conn->query($sql);//结果集
    
 // var_dump($res);
    
    if($res->num_rows>0){
        echo 'yes';//用户名密码都正确，可以登陆
    }else{
        echo 'no';//不正确，不可以登陆
    }
?>