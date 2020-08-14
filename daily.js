// ..................变量声明...................
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
//定义向左，向右箭头
var go = document.getElementById("go"),
    back = document.getElementById("back");
var count = 1;
//定义按钮
var game = document.getElementById("game"),
    work = document.getElementById("work");
var look = document.getElementById("look");
var open = 0;
var select = 0;
//定义图片
var image_getup = new Image();
image_getup.src = 'getup.png'; //早上起床
var image_hello = new Image();
image_hello.src = '打招呼.png';
var image_seeyou = new Image();
image_seeyou.src = 'seeyou.png';//海绵宝宝派大星打招呼
var image_excited = new Image();
image_excited.src = 'excited.jpg';//决定玩什么游戏
var image_sleep = new Image();
image_sleep.src = 'sleeping.png';//睡觉
var image_talk = new Image();
image_talk.src = 'talkkk.jpg';//文本框
var image_restaurant = new Image();
image_restaurant.src ='蟹堡王.jpg';
var image_runS = new Image();
image_runS.src = '奔跑.png';
var image_runP = new Image();
image_runP.src = '派大星.png';
//两个场景 scene1是海绵宝宝和蟹老板，scene2是海绵宝宝和章鱼哥
var scene1 = new Image();
scene1.src="蟹老板与海绵宝宝.png";
var scene2 = new Image();
scene2.src="章鱼哥与海绵宝宝.png";

//物种+资料图片
var trepang= new Image(),trepangText = new Image();//海参
trepang.src="海参.png";trepangText.src = "海参资料.png";
var puffer = new Image();//河豚
puffer.src="泡芙老师（河豚）.png"
var whale = new Image();//抹香鲸珍珍
var whale = new Image();//抹香鲸珍珍
whale.src="珍珍（抹香鲸）.png"
var starfish = new Image(),starfishText = new Image();//派大星（海星）
starfish.src="派大星.png";starfishText.src='海星资料.png';
var octopus = new Image();//章鱼
octopus.src="章鱼.png"; 
var turtle = new Image(),turtleText = new Image();//海龟
turtle.src="海龟.png";turtleText.src="海龟资料.png"
var green = new Image();//绿藻
green.src="绿藻.png";
var coral = new Image(),coralText = new Image();//珊瑚
coral.src="红扇珊瑚.png";coralText.src="红扇珊瑚资料.png";

//定义视频
 var getup = document.getElementById('getup'),
     pufferv = document.getElementById('pufferv'),//河豚
     whalev = document.getElementById('whalev'),//鲸
     octopusv = document.getElementById('octopusv'),//章鱼
     greenv = document.getElementById('greenv');//绿藻
//定义音频
var turtlea = document.getElementById('turtlea'),//海龟
    corala = document.getElementById('corala');//珊瑚

// 定义进度条
var progress = 0;

//定义背景滚动
 var ppf;
var lastTime = new Date;
loc_x = 0;
pps = 20;

//判断第几张图
var number=0;


//获取鼠标点击时canvas的坐标（弹出视频）
function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
  //防止使用CSS和JS改变了canvas的高宽之后是表面积拉大而实际显示像素不变而造成的坐标获取不准的情况
    return {
        x:( x - bbox.left) * (canvas.width / bbox.width),
        y: (y - bbox.top) * (canvas.height / bbox.height)
    };
}
//箭头计数响应 
window.onload = function(){
    go.onclick = function()
    {
        count++;
    }
    back.onclick = function()
    {
        count--;
    }
}
//按钮按键响应
game.onclick = function(){
    select = 1;
    count++;
}
work.onclick = function(){
    select = 2;
    count++;
}
look.onclick = function(){
    open = 1;
    count++;
}

//根据count的取值switch选择背景图片
function redraw(count){
     switch(count)
    {
        //第一幕早上起床
        case 1:
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image_getup, 0, 0, canvas.width, canvas.height);
            //视频隐藏
            getup.style.display="none";
            back.style.display = "none";
            break;
        //起床播放视频
        case 2:
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image_hello, 0, 0, canvas.width, canvas.height);
            //视频显示
            getup.style.display="inline";
            back.style.display = "block";
            break;
        //准备出门,遇见派大星
        case 3:
            //视频隐藏
            getup.style.display="none";
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image_hello, 0, 0, canvas.width, canvas.height);
            break; 
        case 4:
        //派大星约海绵宝宝玩游戏
            context.clearRect(0, 0, canvas.width, canvas.height);
            //图片半透明处理
            context.save();
            context.globalAlpha = 0.3;
            context.drawImage(image_hello, 0, 0, canvas.width, canvas.height);
            context.restore();
            //添加对话文本
            context.font = "15pt Microsoft JhengHei";
            context.fillText("派大星：海绵宝宝我们一起去玩游戏吧！！",canvas.width / 5-30, canvas.height / 4);
            //隐藏按钮
            alternative.style.display = "none";
            break;
        case 5:
        //海绵宝宝回复派大星
            context.clearRect(0, 0, canvas.width, canvas.height);
            //图片半透明处理
            context.save();
            context.globalAlpha = 0.3;
            context.drawImage(image_hello, 0, 0, canvas.width, canvas.height);
            //添加对话文本
            context.font = "15pt Microsoft JhengHei";
            context.fillText("派大星：海绵宝宝我们一起去玩游戏吧！！", canvas.width / 5-30, canvas.height / 4);
            context.restore();
            //显示按钮
            alternative.style.display = "block";
            break; 
        case 6:
        //海绵宝宝回复派大星
            context.clearRect(0, 0, canvas.width, canvas.height);
            //图片半透明处理
            context.save();
            context.globalAlpha = 0.3;
            context.drawImage(image_hello, 0, 0, canvas.width, canvas.height);
            //添加对话文本
            context.font = "15pt Microsoft JhengHei";
            context.fillText("派大星：海绵宝宝我们一起去玩游戏吧！！", canvas.width / 5-30, canvas.height / 4);
            context.restore();
            //隐藏按钮
            alternative.style.display = "none";
            //玩游戏
            if(select == 1){
                context.fillText("海绵宝宝：好啊，我们一起去玩游戏吧！！", canvas.width / 4, canvas.height / 4+200)
            }
            //去上班
            else{
                context.fillText("海绵宝宝：对不起派大星，我今天要去上班。", canvas.width / 4-30, canvas.height / 4+200)
            }
            break; 
        case 7:
        //去上班，玩游戏路上
            context.clearRect(0, 0, canvas.width, canvas.width);
            //玩游戏
            if(select == 1){
                context.drawImage(image_excited, 0, 0, canvas.width, canvas.height);
                context.font = "15pt Microsoft JhengHei";
                context.fillText("海绵宝宝：派大星我们来清理垃圾吧！！", canvas.width / 5-50, canvas.height / 3);
            }
            //去上班
            else if(select == 2){
                context.drawImage(image_seeyou, 0, 0, canvas.width, canvas.height);
                context.font = "15pt Microsoft JhengHei";
                context.fillText("再见！海绵宝宝", canvas.width / 2+70, canvas.height / 3);
            }
            break;
        case 8:
        //界面加载
            context.clearRect(0, 0, canvas.width, canvas.height);
            //玩游戏
            if(select == 1){
                drawFrame();
                context.font = "20pt Microsoft JhengHei";
                context.fillText("请点击下方游戏文字，进行游戏。",50,100);
            }
            //去上班
            else if(select == 2){
                //进度条
                drawProgressBar();
            }
            break;
        case 9:
            context.clearRect(0, 0, canvas.width, canvas.height);
            if(select == 1){
                context.drawImage(image_sleep, 0, 0, canvas.width, canvas.height);
                context.drawImage(image_talk,20,20,250,40);
                context.save();
                context.font = "10pt Microsoft JhengHei";
                context.fillText("为什么比基尼海滩会有这么多垃圾呢？",30,45);
                context.restore();
            }
            //蟹堡王
            else if(select == 2){
                context.drawImage(image_restaurant,0,0,canvas.width,canvas.height);
            }
            break;
        case 10:
            looking.style.display = "none";
            context.clearRect(0, 0, canvas.width, canvas.height);
            //睡觉引出措施
            if(select == 1){
                context.drawImage(image_sleep, 0, 0, canvas.width, canvas.height);
                context.drawImage(image_talk,10,10,250,110);
                context.save();
                context.font = "10pt Microsoft JhengHei";
                context.fillText("因为有一些人类乱扔垃圾等不道德的行",25,45);
                context.fillText("为，导致我们的海滩出现了被污染的情",25,65);
                context.fillText("况，我的很多朋友都生病了，也过得不",25,85);
                context.fillText("开心了。",25,105);
                context.restore();
            }
            
            //海参进场并介绍
            else if(select == 2){
                context.drawImage(scene1,0,0,canvas.width,canvas.height);
                context.drawImage(trepang,-canvas.width/3+20,-20,canvas.width,canvas.height);
                context.save();
                context.font = "15pt blod 楷体";
                context.fillStyle = 'yellow';
                context.fillText("海绵宝宝：蟹老板，那是什么物种啊！",canvas.width/2-60,canvas.height/3);
                 context.restore();
            }
            break;
        case 11:
            context.clearRect(0, 0, canvas.width, canvas.height);
            if(select == 1){
                context.drawImage(image_sleep, 0, 0, canvas.width, canvas.height);
                context.drawImage(image_talk,10,10,250,80);
                looking.style.display = "block";
                context.save();
                //文本字体大小
                context.font = "10pt Microsoft JhengHei";
                //改变文本颜色
                context.fillStyle = 'blue';
                context.fillText("为了让比基尼海滩的所有成员重拾快乐，",20,45);
                context.fillText("我们人类可以做些什么呢？",25,65);
                context.restore();
            }
             //蟹老板介绍
            else if(select == 2){
                context.drawImage(scene1,0,0,canvas.width,canvas.height);
                context.drawImage(trepang,-canvas.width/3+20,-20,canvas.width,canvas.height);
                context.save();
                context.font = "15pt blod 楷体";
                context.fillStyle = 'black';
                context.fillText("蟹老板:那是海参",2*canvas.width/3-50,canvas.height/4);
                context.restore();
            }
            break;
        case 12:
            //按钮隐藏
            looking.style.display = "none";
            context.clearRect(0, 0, canvas.width, canvas.height);
            if(select == 1&& open == 1){
                context.drawImage(image_sleep, 0, 0, canvas.width, canvas.height);
                context.drawImage(image_talk,10,10,250,300);
                context.save();
                context.font = "10pt Microsoft JhengHei";
                context.fillStyle = 'green';
                context.fillText("1.惜食海鲜，拒食鱼翅和其他濒危海洋",25,45);
                context.fillText("动物，不购买海豹皮等海洋生物制品。",25,65);
                context.fillText("2.过低碳生活。随着人类对二氧化碳排",25,85);
                context.fillText("放量的不断增加，导致海洋吸收了过多",25,105);
                context.fillText("的二氧化碳，使其酸性不断升高。这不",25,125);
                context.fillText("仅会影响海洋吸收二氧化碳的能力，更",25,145);
                context.fillText("会对海洋生态系统造成严重影响。",25,165);
                context.fillText("3.做个有责任感的海边游客，在海边度",25,185);
                context.fillText("假时，将个人垃圾丢进垃圾箱或随身带",25,205);
                context.fillText("走；在海边游玩时，不捕捉和伤害海洋",25,225);
                context.fillText("动物；不在海水中随意小便；潜水时，",25,245);
                context.fillText("不触碰珊瑚礁和其他海洋生物，不擅自",25,265);
                context.restore();
            }
            //海参介绍
            else if(select == 2){
                context.drawImage(trepangText,0,0,canvas.width,canvas.height);
            }
            break;
        case 13:
            context.clearRect(0, 0, canvas.width, canvas.height);
            if(select == 1&&open == 1){
                context.drawImage(image_sleep, 0, 0, canvas.width, canvas.height);
                context.drawImage(image_talk,10,10,250,300);
                context.save();
                context.font = "10pt Microsoft JhengHei";
                context.fillStyle = 'green';
                context.fillText("触摸、喂食海洋生物；不购买海洋生物",25,45);
                context.fillText("标本和工艺品.",25,65);
                context.fillText("4.少用塑料制品，避免“塑化”海洋。",25,85);
                context.fillText("塑料垃圾大量进入海洋后，在海水中难",25,105);
                context.fillText("以分解，还容易被当作食物吃掉造成海",25,125);
                context.fillText("洋动物消化不良而死亡。我们应尽可能",25,145);
                context.fillText("少用塑料制品，非要用时尽量重复使用、",25,165);
                context.fillText("循环利用。一定注意不要乱扔垃圾，尤",25,185);
                context.fillText("其是塑料制品，避免它们进入下水道，",25,205);
                context.fillText("最终被带入大海。",25,225);
                context.fillText("5.了解海洋科普知识，支持海洋公益行",25,245);
                context.fillText("动，宣传海洋保护知识。只有真正了解",25,265);
                context.restore();
            }
            //引入下一物种泡芙老师（河豚）
            else if(select == 2){
                context.drawImage(scene1,0,0,canvas.width,canvas.height);
                context.drawImage(puffer,-canvas.width/3+20,-20,canvas.width,canvas.height);
                context.save();
                context.font = "15pt blod 楷体";
                context.fillStyle = 'yellow';
                context.fillText("海绵宝宝：蟹老板，快看是泡芙老师",canvas.width/2-60,canvas.height/3);
                context.restore();
            }
            break;
        case 14:
            context.clearRect(0, 0, canvas.width, canvas.height);
            if(select == 1&&open == 1){
                go.style.display = "block";
                context.drawImage(image_sleep, 0, 0, canvas.width, canvas.height);
                context.drawImage(image_talk,10,10,250,300);
                context.save();
                context.font = "10pt Microsoft JhengHei";
                context.fillStyle = 'green';
                context.fillText("海洋，才知道如何去爱它、保护它。政",25,45);
                context.fillText("府和社会环保组织经常会定期举办一些",25,65);
                context.fillText("海洋公益活动、海洋知识讲座，我们不",25,85);
                context.fillText("妨多参加，并向周围的人宣传保护海洋",25,105);
                context.fillText("海洋公益活动、海洋知识讲座，我们不",25,125);
                context.fillText("妨多参加，并向周围的人宣传保护海洋",25,145);
                context.fillText("的知识。",25,165);
                context.restore();
               
            }
            else if(select == 2){
                context.clearRect(0,0,canvas.width,canvas.height);
                context.drawImage(scene1,0,0,canvas.width,canvas.height);
                context.drawImage(puffer,-canvas.width/3+20,-20,canvas.width,canvas.height);
                context.save();
                context.font = "15pt blod 楷体";
                context.fillStyle = 'black';
                context.fillText("蟹老板:❤我看到了❤",2*canvas.width/3-50,canvas.height/4);
                 context.restore();
            }
            break;
        case 15:
            context.clearRect(0, 0, canvas.width, canvas.height);
            if(select == 1&&open == 1){
                context.drawImage(image_sleep, 0, 0, canvas.width, canvas.height);
                context.save();
                context.font = "30pt Microsoft JhengHei";
                context.fillStyle = 'white';
                context.fillText("晚安，",50,50);
                context.fillText("比基尼海滩的每一个人！",5,145);
                context.restore();
                go.style.display = "none";
            }
            if(select == 2){
                context.clearRect(0,0,canvas.width,canvas.height);
                number = 1; context.drawImage(scene1,0,0,canvas.width,canvas.height);
                context.drawImage(puffer,-canvas.width/3+20,-20,canvas.width,canvas.height);
                context.save();
                context.font = "15pt blod 楷体";
                context.fillStyle = 'yellow';
                context.fillText("海绵宝宝：泡芙老师好像是河豚呢ヾ(@^▽^@)ノ",canvas.width/2-140,canvas.height/3);
                context.fillText("            你好泡芙老师(点击泡芙老师)",canvas.width/2-140,canvas.height/3+20);
                context.restore();
            }
            break;
        case 16:
            if(select == 2){
                number = 0;
                document.getElementById("pufferv").style.display="none";//视频隐藏
                pufferv.pause();
                context.clearRect(0,0,canvas.width,canvas.height);
                context.drawImage(scene1,0,0,canvas.width,canvas.height);
                context.drawImage(puffer,-   canvas.width/3+20,-20,canvas.width,canvas.height);
                context.save();
                context.font = "15pt blod 楷体";
                context.fillStyle = 'white';
                context.fillText("泡芙老师：哦不，是海绵宝宝",50,100);
                context.restore();
            }
            break;
        //抹香鲸珍珍引入
        case 17:
            if(select == 2){
                context.clearRect(0,0,canvas.width,canvas.height);
                context.drawImage(scene1,0,0,canvas.width,canvas.height);
                context.drawImage(whale,-    canvas.width/3+20,-20,canvas.width,canvas.height);
                context.save();
                context.font = "15pt blod 楷体";
                context.fillStyle = 'yellow';
                context.fillText("海绵宝宝：蟹老板，珍珍又是什么呢？",canvas.width/2-60,canvas.height/3);
                context.restore();
            }
            break;
        case 18:
            if(select == 2){
                number = 2;
                context.clearRect(0,0,canvas.width,canvas.height);
                context.drawImage(scene1,0,0,canvas.width,canvas.height);
                context.drawImage(whale,-canvas.width/3+20,-20,canvas.width,canvas.height);
                context.save();
                context.font = "15pt blod 楷体";
                context.fillStyle = 'white';
                context.fillText("珍珍：海绵宝宝，我是抹香鲸哦！（点击珍珍）",50,100);
                context.restore();
            }
           break;
        //派大星
        case 19:
            if(select == 2){
                number = 0;
                document.getElementById("whalev").style.display="none";
                whalev.pause();
                context.clearRect(0,0,canvas.width,canvas.height);
                context.drawImage(scene1,0,0,canvas.width,canvas.height);
                context.drawImage(starfish,-canvas.width/3+20,-20,canvas.width,canvas.height);
                context.save();
                context.font = "15pt blod 楷体";
                context.fillStyle = 'pink';
                context.strokeStyle='black';
                context.strokeText("派大星：嘿！海绵宝宝，我们去钓水母吧！",50,100);
                context.fillText("派大星：嘿！海绵宝宝，我们去钓水母吧！",50,100);
                context.restore();
            }
            break;
        case 20:
            if(select == 2){
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene1,0,0,canvas.width,canvas.height);
            context.drawImage(starfish,-canvas.width/3+20,-20,canvas.width,canvas.height);
            context.save();
            context.font = "15pt blod 楷体";
            context.fillStyle = 'yellow';
            context.fillText("海绵宝宝：对不起，派大星。我正在上班呢",canvas.width/2-80,canvas.height/3);
            }
            context.restore();
            break;
        //海星介绍
        case 21:
            if(select == 2){
            context.clearRect(0,0,canvas.width,canvas.height); 
            context.drawImage(starfishText,0,0,canvas.width,canvas.height);
            }
            break;
        case 22:
            if(select == 2){
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene1,0,0,canvas.width,canvas.height);
            context.drawImage(starfish,-canvas.width/3+20,-20,canvas.width,canvas.height);
            context.save();
            context.font = "15pt blod 楷体";
            context.fillStyle = 'pink';
             context.strokeStyle='black';
            context.strokeText("派大星：好吧，海绵宝宝。再见,海绵宝宝",50,100);
            context.fillText("派大星：好吧，海绵宝宝。再见,海绵宝宝",50,100);
            context.restore();
            }
            break;
        //进入下一场景
        case 23:
            if(select == 2){
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene1,0,0,canvas.width,canvas.height);
            context.save();
            context.font = "15pt blod 楷体";
            context.fillStyle = 'yellow';
            context.fillText("海绵宝宝：蟹老板，我要去工作了",canvas.width/2-60,canvas.height/3);
            context.restore();
            }
            break;
        case 24:
            if(select == 2){
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene2,0,0,canvas.width,canvas.height);
            context.save();
            context.font = "15pt blod 楷体";
            context.fillStyle = 'yellow';
            context.fillText("海绵宝宝：嘿，章鱼哥",2*canvas.width/3-50,canvas.height/3);
            context.restore();
            }
            break;
         case 25:
            if(select == 2){
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene2,0,0,canvas.width,canvas.height);
            context.save();
            context.font = "15pt blod 楷体";
            context.fillStyle = 'blue';
            context.strokeStyle='black';
            context.strokeText("章鱼哥：嘿……",2*canvas.width/3-50,canvas.height/3);
            context.fillText("章鱼哥：嘿……",2*canvas.width/3-50,canvas.height/3);
            context.restore();
            }
            break;
        case 26:
            if(select == 2){
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene2,0,0,canvas.width,canvas.height);
            context.save();
            context.font = "15pt blod 楷体";
            context.fillStyle = 'yellow';
            context.fillText("海绵宝宝：我记得章鱼哥好像是章鱼吧",2*canvas.width/3-120,canvas.height/3);
            context.restore();
            }
            break;
        //章鱼介绍
        case 27:
            if(select == 2){
            number = 3;
             context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene2,0,0,canvas.width,canvas.height);
            context.drawImage(octopus,-canvas.width/3+20,-20,canvas.width,canvas.height);
            context.save();
            context.font = "15pt blod 楷体";
            context.fillStyle = 'blue';
            context.strokeStyle='black';
            context.strokeText("章鱼哥：没错(点击章鱼)",2*canvas.width/3-50,canvas.height/3);
            context.fillText("章鱼哥：没错(点击章鱼)",2*canvas.width/3-50,canvas.height/3);
            context.restore();
            }
            break;
        //引入海龟
        case 28:
            if(select == 2){
            number = 0;
           
            turtlea.pause(); document.getElementById('octopusv').style.display="none";
            octopusv.pause();
             context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene2,0,0,canvas.width,canvas.height);
            context.drawImage(turtle,-canvas.width/3+20,-20,canvas.width,canvas.height);
            context.save();
            context.font = "15pt blod 楷体";
            context.fillStyle = 'yellow';
            context.fillText("海绵宝宝：章鱼哥快看，是海龟",2*canvas.width/3-120,canvas.height/3);
            context.restore();
            }
            break;
        //海龟介绍
        case 29:
            if(select == 2){
            turtlea.play();
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene2,0,0,canvas.width,canvas.height);
            context.drawImage(turtleText,0,0,canvas.width,canvas.height);
            }
            break;
        //绿藻
        case 30:
            if(select == 2){
            turtlea.pause();
            number = 4;
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene2,0,0,canvas.width,canvas.height);
            context.drawImage(green,-canvas.width/3+20,-20,canvas.width,canvas.height);
            context.save();
            context.font = "15pt blod 楷体";
            context.fillStyle = 'yellow';
            context.fillText("海绵宝宝：哦，不！！是绿藻(点击绿藻)",2*canvas.width/3-160,canvas.height/3);
            context.restore();
            }
            break;
        //珊瑚
        case 31:
            if(select == 2){
            number = 0;
            document.getElementById('greenv').style.display="none";
            greenv.pause();
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene2,0,0,canvas.width,canvas.height);
            context.drawImage(coral,-canvas.width/3+20,-20,canvas.width,canvas.height);
            context.save();
            context.font = "15pt blod 楷体";
            context.fillStyle = 'yellow';
            context.fillText("海绵宝宝：好漂亮的珊瑚",2*canvas.width/3-140,canvas.height/3);
            context.restore();
            }
            break;
        case 32:
            if(select == 2){
            corala.pause();
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene2,0,0,canvas.width,canvas.height);
            context.drawImage(coral,-canvas.width/3+20,-20,canvas.width,canvas.height);
            context.save();
            context.font = "15pt blod 楷体";
            context.fillStyle = 'blue';
            context.strokeStyle='black';
            context.strokeText("章鱼哥：没错",2*canvas.width/3-50,canvas.height/3);
            context.fillText("章鱼哥：没错",2*canvas.width/3-50,canvas.height/3);
            context.restore();
            }
            break;
        //珊瑚介绍
        case 33:
            if(select == 2){
            corala.play();
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene2,0,0,canvas.width,canvas.height);
            context.drawImage(coralText,0,0,canvas.width,canvas.height);
            }
            break;
        //结束一天日程
        case 34:
            if(select == 2){
            corala.pause();
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene2,0,0,canvas.width,canvas.height);
            context.save();
            context.font = "15pt blod 楷体";
            context.fillStyle = 'yellow';
            context.fillText("海绵宝宝：时间不早了，我下班了章鱼哥",2*canvas.width/3-200,canvas.height/3);
            context.restore();
            }
            go.style.display = "block";
            break;
        case 35:
            if(select == 2){
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(scene2,0,0,canvas.width,canvas.height);
            context.save();
            context.font = "15pt blod 楷体";
            context.fillStyle = 'blue';
            context.strokeStyle='black';
            context.strokeText("章鱼哥：再见，海绵宝宝",2*canvas.width/3-80,canvas.height/3);
            context.fillText("章鱼哥：再见，海绵宝宝",2*canvas.width/3-80,canvas.height/3);
            context.restore();
            }
            go.style.display = "none";
            break;
        default:
            context.clearRect(0, 0, canvas.width, canvas.height);
    }
}
//点击图片所在区域，进行资料反馈（视频选择）
canvas.onmousedown = function(e){
    //获取鼠标位置
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    if(loc.x<canvas.width/3&&loc.y>canvas.height/3)
        {
            switch(number)
                {
                    //河豚
                    case 1:
                        document.getElementById("pufferv").style.display="inline";//视频显示播放
                        pufferv.play();
                        break;
                    //抹香鲸
                    case 2:
                        document.getElementById("whalev").style.display="inline";
                        whalev.play();
                        break;
                    //章鱼
                    case 3:
                        document.getElementById('octopusv').style.display="inline";
                        octopusv.play();
                        break;
                    //绿藻
                    case 4:
                        document.getElementById('greenv').style.display="inline";
                        greenv.play();
                        break;
                }
        }
}


//进度条
function drawProgressBar(){
    context.clearRect(0, 0, canvas.width,canvas.height)
    //循环调用
    animateDrawPB = requestAnimationFrame(drawProgressBar);
    context.save();
    context.globalAlpha = 1;
    context.beginPath();
    context.strokeStyle = "pink";
    //绘制矩形
    context.rect(canvas.width / 3-50,canvas.height / 3,260,20);
    context.stroke();
    context.closePath();
    //进度条外框的绘制
    context.beginPath();
    context.rect(canvas.width / 3-50 ,canvas.height / 3,260 * progress,20);
    context.fillStyle = "pink";
    context.fill();
    context.closePath();
    //进度条填充的动画绘制
    context.textAlign = 'center';
    context.fillText(Math.round(100 * progress) + "%",canvas.width / 2,canvas.height / 2);
    context.restore();
    if(progress <= 1){
        progress += 0.0001;
    }else{
        cancelAnimationFrame(animateDrawPB);
    }
}

//当前帧的绘制,动画
function drawFrame(){
    fps = calculateFps();//调用函数fps的当前值计算
    ppf = pps / fps;//pps为定值
    if(loc_x <= 500){
        loc_x += ppf;
        context.clearRect(0, 0, canvas.width, canvas.height);//清空画布
        context.drawImage(image_runP,loc_x, 70,200,200);
        context.drawImage(image_runS,loc_x+80,120,150,150);
        aaa = requestAnimationFrame(drawFrame);//循环调用drawFrame，由浏览器自行决定帧速率
        //基于时间的滚动
        if(loc_x > canvas.width){
            loc_x = 0;
        }
    }
    else{
        cancelAnimationFrame(aaa);
    }
}
        
//计算在requestAnimationFrame方法下的帧率fps值
function calculateFps(){
    var now = new Date;
    fps = 1000 / (now - lastTime);
    fps = Math.round(fps);
    lastTime = now;
    return fps;
}
             

//循环调用switch redraw();
function animate(){
    if(1){
        redraw(count);
        animationFrame = requestAnimationFrame(animate);
    }
    else
        cancelAnimationFrame(animationFrame);
}



// ..................初始化...................
//画图初始化
image_getup.onload = function(e) {
    context.drawImage(image_getup, 0, 0, canvas.width, canvas.height);
}
animate();
