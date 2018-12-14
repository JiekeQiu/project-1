<?php
    /*
        接收前端传过来的用户名，验证数据库是否存在该用户名，返回相关信息给前端
            get：
                username：待验证用户名
            返回：
                0 || 1 //0代表用户名已存在，1代表用户名不存在
     */


    //连接数据库
    include 'connect.php';
    
    //接收参数
    $username=isset($_GET['username']) ? $_GET['username'] : '';
    

    //写查询语句
    $sql="SELECT * FROM user WHERE name='$username'";
    
    //执行语句
    $res=$conn->query($sql);//结果集

    
    if($res->num_rows>0){//num_rows存记录的条数，所有超过0就意味着存在
        //数据库存在该用户名
        echo 0;
    }else{
        echo 1;
    }
    
    //关闭结果集和数据库
    $res->close();
    $conn->close();
    
?>