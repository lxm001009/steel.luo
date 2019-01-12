// JavaScript Document

 window.onload = function(){
//轮播初始化
            var lunbo = document.getElementById('content');
            var imgs = lunbo.getElementsByTagName('img');
            var uls = lunbo.getElementsByTagName('ul');
            var lis = lunbo.getElementsByTagName('li');
//初始状态下，一个圆圈为高亮模式
            lis[0].style.fontSize = '26px';
            lis[0].style.color = '#fff';
//定义一个全局变量，用来进行自动轮播图片顺序的变化
            var pic_index = 1;
//自动轮播.使用pic_time记录播放，可以随时使用clearInterval()清除掉。
            var pic_time = setInterval(autobofang,3000);
//手动轮播
            for(var i=0;i<lis.length;i++){
                lis[i].addEventListener("mouseover",change,false);
            }
            function change(event){
                var event=event||window.event;
                var target=event.target||event.srcElement;
                var children = target.parentNode.children;
                for(var i=0;i<children.length;i++){
                    if(target == children[i]){
                        picChange(i);
                    }
                }
            }
//图片切换函数
            function picChange(i){
//让所有图片都不显示，所有圆圈都为普通样式
                for(var j=0;j<imgs.length;j++){
                    imgs[j].style.display = 'none'; lis[j].style.fontSize = '24px';
                    lis[j].style.color = '#999';
                }
//让选中的索引的图片显示，对应的圆圈高亮
                imgs[i].style.display = 'block';
                lis[i].style.fontSize = '26px';
                lis[i].style.color = '#fff';
            }
//自动播放的事件处理
            function autobofang(){
                if(pic_index >= lis.length){
                    pic_index = 0;
                }
                change1(pic_index);
                pic_index++;
            }
//自动播放的图片转化中的事件
            function change1(index){
                picChange(index);
//鼠标移入ul标签，自动播放图片暂停
                uls[0].addEventListener("mouseover",pause,false);
//鼠标移出ul标签，自动播放图片继续
                uls[0].addEventListener("mouseout",go,false);
            }
//自动播放暂停函数
            function pause(event){
                var event=event||window.event;
                var target=event.target||event.srcElement;
                switch(target.id){
                    case "pic1":
                        clearInterval(pic_time);
                        break;
                    case "pic2":
                        clearInterval(pic_time);
                        break;
                    case "pic3":
                        clearInterval(pic_time);
                        break;
					case "pic4":
                        clearInterval(pic_time);
                        break;
                }
            }
//自动播放图片继续函数
            function go(event){
                var event=event||window.event;
                var target=event.target||event.srcElement;
                switch(target.id){
                    case "pic1":
                        pic_index = 1;
                        pic_time = setInterval(autobofang,3000);
                        break;
                    case "pic2":
                        pic_index = 2;
                        pic_time = setInterval(autobofang,3000);
                        break;
                    case "pic3":
                        pic_index = 3;
                        pic_time = setInterval(autobofang,3000);
                        break;
					case "pic4":
                        pic_index = 4;
                        pic_time = setInterval(autobofang,3000);
                        break;
                }
            }
        }