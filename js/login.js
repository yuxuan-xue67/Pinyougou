
window.addEventListener('load', function(){
    //1.添加点击时间
    var btn = document.querySelector('.btn');
    btn.addEventListener('click',function(){
        // var username_msg = document.querySelector('.username_msg');
        // var password_msg = document.querySelector('.password_msg');
        var submit_msg = document.querySelector('.submit_msg_span');
        //username_msg.style.display = 'inline-block';
        // function alertUsername(msg, isSuccess){
        //     username_msg.classList.remove(bgStyle);
        //     //现实提示框
        //     username_msg.style.display = 'inline-block';
        //     //实现细节
        //     //console.log(username_msg.innerHtml);
        //     username_msg.innerHTML = '<i class="error_icon"></i>' + msg;
        //     var bgStyle = isSuccess ? 'success' : 'error';
        //     username_msg.classList.add(bgStyle);
        // }
        // function alertPassword(msg, isSuccess){
        //     password_msg.style.display = 'inline-block';
        //     password_msg.innerHTML = '<i class="error_icon"></i>' + msg;
        //     var bgStyle = isSuccess ? 'success' : 'error';
        //     password_msg.classList.add(bgStyle);
        // }
        function alertSubmitMsg(msg, isSuccess){
            submit_msg.classList.remove(bgStyle);
            submit_msg.style.display = 'inline-block';
            submit_msg.innerHTML = msg;
            var bgStyle = isSuccess ? 'success' : 'error';
            submit_msg.classList.add(bgStyle);

            setTimeout(() => {
                submit_msg.style.display = 'none';
                submit_msg.classList.remove(bgStyle);
            },2000)
        }
        
        //console.log(111);
        //alert(111);
        //1.获取账户和密码
        var username = document.querySelector('.username').value;
        var password = document.querySelector('.password').value;
        //2.判断账号长度
        if(username.length < 8){
            alertSubmitMsg('用户名必须大于等于8位',false);
            //console.log('用户名必须大于等于8位');
        }
        //3.判断密码长度
        if(password.length < 6){
            alertSubmitMsg('密码必须大于等于6位',false);
            //console.log('密码必须大于等于6位');
        }
        //4.基于axios提交用户名和密码
        axios({
            url:'http://hmajax.itheima.net/api/login',
            method: 'post',
            data: {
                username,
                password
            }
        }).then(result => {
            if(result.data.message === '登录成功'){
                alertSubmitMsg(result.data.message, true);  
            }
            console.log(result);
        }).catch(error =>{
            alertSubmitMsg(error.response.data.message, false)
            console.log(error.response.data.message);
        })
    })
})