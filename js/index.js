// const console = require("console");

//轮播图
window.addEventListener('load', function(){
    //1.获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;

    //2.鼠标经过focus 就显示左右隐藏按钮 并停止轮播图自动播放
    focus.addEventListener('mouseenter', function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block'; 
        clearInterval(timer);
        timer = null; //清除timer变量
    })

    //3.鼠标离开 隐藏 轮播图重新自动播放
    focus.addEventListener('mouseleave', function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function(){
            //手动调用点击事件
            arrow_r.click();
        },2000)
    })

    //4.动态生成小圆圈 几张图，就有几个圆圈
    var ul = focus.querySelector('ul');
    var circle = focus.querySelector('.circle-box');
    // console.log(ul.children.length);
    for(var i = 0; i < ul.children.length; i++){
        //create li
        var li = document.createElement('li');
        //记录当前小圆圈索引号 通过自定义属性来做
        li.setAttribute('index', i);
        //把li插入进ul-circle里面
        circle.appendChild(li);
        
        //5.小圆圈的排他思想 直接生成小圆圈的同时绑定点击事件
        li.addEventListener('click', function(){
            //干掉所有人 把所有li清除current类名
            for(var i = 0; i < circle.children.length; i++){
                circle.children[i].className = '';
            }
            //留下我自己 当前li设置current类名
            this.className = 'current';

            //6.点击小圆圈，移动图片（移动的是ul！）
            //ul的移动距离 小圆圈的索引号 ✖️ 图片的宽度（注意是负值）
            //拿到当前li的索引号
            var index = this.getAttribute('index');
            //debug：当我们点击某个li 拿到当前li的索引号
            num = index;
            circle_num = index;
            //var focusWidth = focus.offsetWidth;
            //console.log(index);
            animate(ul, -index*focusWidth);
        })
    }
    //把ul-circle的第一个li设置类名为current
    circle.children[0].className = 'current';

    //7. 克隆第一张图片（li）放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //8. 点击右侧按钮，图片滚动一张
    var num = 0;
    //circle-num 控制小圆圈的播放
    var circle_num = 0;
    arrow_r.addEventListener('click',function(){
        //如果走到最后一张图片，ul要快速复原left为0
        if(num == ul.children.length - 1){
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth);
        
        //9. 点击右侧按钮，小圆圈跟随变化
        circle_num++;
        //如果circle_num==4，重新将值复原为0
        if(circle_num == ul.children.length-1){
            circle_num = 0;
        }
        //调用函数 
        circleChange();
    })
    //10. 左侧按钮做法 和右侧十分类似
    arrow_l.addEventListener('click',function(){
        //如果走到最后一张图片，ul要快速复原left为0
        if(num == 0){
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth;
        }
        num--;
        animate(ul, -num * focusWidth);
        //点击左侧按钮，小圆圈跟随变化
        circle_num--;
        //如果circle_num==4，重新将值复原为0
        if(circle_num < 0){
            circle_num = ul.children.length-2;
        }
        circleChange();
    })

    function circleChange(){
        //先清除其余小圆圈类名
        for(var i = 0; i < circle.children.length; i++){
            circle.children[i].className = '';
        }
        //留下当前小圆圈类名
        circle.children[circle_num].className = 'current';
    }

    //11.自动播放轮播图
    var timer = setInterval(function(){
        //手动调用点击事件
        arrow_r.click();
    },2000)
})

//电梯导航
$(function(){
    //当点击了li，此时不需要执行页面滚动事件里面的li背景选择 添加current
    //节流阀（互斥锁）
    var flag = true;
    //1.显示隐藏电梯导航
    var toolTop = $(".recom").offset().top;
    toggleTool();

    function toggleTool(){
        if ($(document).scrollTop() >= toolTop){
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    $(window).scroll(function(){
        toggleTool();
        //3.页面滚动到某个区域，左侧电梯导航li相对应添加和删除current类名
        if(flag){
            $('.floor .w').each(function(i,ele){
                if($(document).scrollTop() >= $(ele).offset().top){
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass();
                }
            })
        }
    })
    //2，点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function(){
        flag = false;
        console.log($(this).index());
        //每次点击li，需要计算出页面需要去往的位置
        //选出对应索引号的内容区的盒子 计算他的.offset().top
        var current = $('.floor .w').eq($(this).index()).offset().top;
        //页面动画滚动效果
        $('body, html').stop().animate({
            scrollTop: current
        },function(){
            flag = true;
        });
        //点击之后，让当前li添加current类名，姐妹移除current类名
        $(this).addClass('current').siblings().removeClass();
    })
    
})

