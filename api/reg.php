<?php
    /*
        接收前端传过来的用户名和密码,将两个数据插入到数据表里面
            get：
                username：新用户名
                psw：新密码
            返回：
                "yes" || "Error"  //成功或失败
     */
    
    //连接数据库
    include 'connect.php';
    
    //接收数据
    $username=isset($_POST['username']) ? $_POST['username'] : '';
    $tel=isset($_POST['tel']) ? $_POST['tel'] : '';
    $password=isset($_POST['password']) ? $_POST['password'] : '';
    
//  echo $username;//成功接收了

    //写sql语句
    $sql="INSERT INTO user(name,password,tel) VALUES('$username','$password','$tel')";
    
    //执行语句
    $res=$conn->query($sql);//返回布尔值，插入成功返回true，否则返回false
    
    if($res){
        //注册成功返回yes否则返回no
        echo 'yes';
    }else{
        echo "Error:" . $sql . "<br>" . $conn->error;
    }
    
    //关闭数据库
    $conn->close();
?>