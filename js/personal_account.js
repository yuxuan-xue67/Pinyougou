

$(function(){
    var creator = 'Iriss'
    //目标一：信息渲染
    axios({
        //1.1获取用户数据
        url:'http://hmajax.itheima.net/api/settings',
        params:{
            creator
        }
    }).then(result => {
        console.log(result);
        //1.2回显数据到标签上
        var userObj = result.data.data;
        Object.keys(userObj).forEach(key => {
            if (key === 'avatar'){
                $('.upload_img').attr('src', userObj[key]);
            }else if (key === 'gender'){
                //获取性别单选框
                var gRadioList = $('.gender');
                //获取性别数字 0男1女
                var gNum = userObj[key];
                console.log(gRadioList[gNum]);
                gRadioList[gNum].checked = true;
            }else{
                $(`.${key}`).val(userObj[key]);
            }
        })
    })

    //目标二：头像修改
    $('.upload').change(function(e){
        //1.获取图片文件
        var fd = new FormData();
        fd.append('img',e.target.files[0])
        fd.append('creator',creator)
        //2.提交到服务器并更新头像
        axios({
            url: 'http://hmajax.itheima.net/api/avatar',
            method:'put',
            data: fd
        }).then(result => {
            console.log(result);
            //取出图片网址，用img标签加载显示
            var imgUrl = result.data.data.avatar;
            console.log(imgUrl);
            //document.querySelector('.my-img').src = imgUrl;
            $('.upload_img').attr('src', imgUrl);

        })
    })

    //目标三：信息修改
    $('.btn').on('click',function(){
        //获取email昵称性别
        var email = document.querySelector('.email').value;
        var nickname = document.querySelector('.nickname').value;
        var desc = document.querySelector('.desc').value;
        //gender比较特殊，单独处理
        if($(".male").is(':checked')){
            gender = 0;
        }else {
            gender = 1;
        }
        //console.log(gender);
        //console.log(desc);
        axios({
            url: `http://hmajax.itheima.net/api/settings`,
            method: 'put',
            data: {
                email,
                nickname,
                gender,
                desc,
                creator
            }
        }).then(result => {
            $('.success').css("display", "block");
            var timer = setTimeout(() => {
                $('.success').css("display", "none");
            }, 3000);
        })
    })
})