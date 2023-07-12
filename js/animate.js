function animate(obj, target, callback){
    clearInterval(obj.timer);//确保只有一个timer在运行
    obj.timer = setInterval(function(){
        if(obj.offsetLeft == target){
            clearInterval(obj.timer);//到达target就停止
        }
        if(callback){
            //调用函数
            callback();
        }
        //把步长改为整数：如果step为正数，向上取整；为负数，向下取整（取绝对值更大）
        var step = (target-obj.offsetLeft)/10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + 'px';
    },15)
}