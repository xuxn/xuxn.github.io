window.onload=function(){

    // 处理背景 
    var can,ctx,cw,ch;
    can = document.getElementById("canvas"); 
    cxt = can.getContext("2d");
    cw = (canvas.width = window.innerWidth);
    ch = (canvas.height = window.innerHeight); 

	function starBall(radius, color) {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        if (radius === undefined) {
            radius = 10
        }
        this.radius = radius;
        if (color === undefined) {
            color = "#f8f2e1"
        }
        this.color = color; 
    } 
    starBall.prototype.draw = function (context) {
        context.save();
        context.translate(this.x, this.y);   
        var grd=context.createRadialGradient(this.x,this.y,0.5,this.x,this.y,this.radius);
        grd.addColorStop(0,'rgba(255,255,255,1)');
        grd.addColorStop(0.2,'rgba(0,162,255,1)'); 
        grd.addColorStop(1,'rgba(0,162,255,0)'); 
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,2*Math.PI); 
        context.fillStyle=grd;
        context.fill(); 
        context.closePath();
        context.restore(); 
    } 
    var starsNumber =1000;
    var stars = []; 
    for(var star, i=0;i<starsNumber;i++){ 
        star=new starBall();
        star.x=Math.random()*cw;
        star.y=Math.random()*ch;
        star.vx=Math.random()*0.08-0.01;
        star.vy=Math.random()*0.08-0.01; 
        star.radius=Math.random()*3+0.5;
        stars.push(star);
    } 
    function drawStar(star){  
         star.draw(cxt);
    }   
    function move(star){
        star.x+=star.vx;
        star.y+=star.vy; 
        if(star.x>cw){
            star.x=0;
        }else if(star.x<0){
            star.x=cw;
        }
        if(star.y>ch){
            star.y=0;
        }else if(star.y<0){
            star.y=ch;
        }  
      
    } 
    // (function drawFrame(){
    //     window.requestAnimationFrame(drawFrame,can);
    //     cxt.clearRect(0,0,cw,ch);
    //     stars.forEach(drawStar); 
    //     stars.forEach(move); 
    // }()) 


    //一个飞机的路径动画
    var player,player2;
 
    var timing1 = {
        duration: 1000,
        iterations: 1,
        fill: 'forwards',
        easing: 'cubic-bezier(0.96, 0.03, 0.5, 1)' 
    }; 
 
    function planeFly(plane,path){
        plane.style.opacity = "1";
        var ds=100-plane.getBoundingClientRect().width;   //getBBox() 获得的为元素在当前SVG坐标中的数据，而 getBoundingClientRect 则是获取了了浏览器坐标中的数据(因为SVG标签中的ViewBox属性影响，实际渲染在浏览器中的大小及位置是经过偏移和缩放的)。
        player=plane.animate([
            {offsetDistance: 0},
            {offsetDistance: ds+"%"}
        ], timing1); 

        var l=path.getTotalLength();
        path.style.opacity = "1";
        path.style.strokeDasharray = l + ' ' + l;
        player2=path.animate([
            {strokeDashoffset:l},
            {strokeDashoffset: 0}
        ],timing1)

    } 


   
    //点击触发飞机移动
    var isClick=true; 

    function clickPp(people){ 
        people.addEventListener("click",function(e){ 
            if(isClick){
                var planeId=this.getAttribute("plane-name"); 
                var plane=document.getElementById(planeId);
                
                var pathId=this.getAttribute("path-name"); 
                var path=document.getElementById(pathId); 
                planeFly(plane,path);

                //降低透明度
                var otherPath=siblings(path); 
                for(var i=0;i<otherPath.length;i++){
                    otherPath[i].style.opacity=0.3;
                }

                //显示收件者的信息
                var destinationId=this.getAttribute("destination-name");
                var destination=document.getElementById(destinationId);
                var shi=destination.querySelector(".destination-shi");
                shi.style.opacity=1;
                console.log("2");

                //页面上所有可点击的people都不可点击
                isClick=false; 
             }
              event.stopPropagation();  
        })  
       
    }


    document.documentElement.addEventListener("click",function(e){ 
        isClick=true;
         
        var allshi=document.querySelectorAll(".destination-shi");
        for(var i=0;i<allshi.length;i++){
            allshi[i].style.opacity=0;
        }

    });


    var peoples=document.querySelectorAll(".people"); 
    peoples.forEach(clickPp);
 
    //其他元素
    function siblings(elem){  
        var nodes=[];  
        var previ=elem.previousSibling; 
        while(previ){  
            if(previ.nodeType===1){ 
                nodes.push(previ); 
            } 
            previ=previ.previousSibling; 
        } 
        nodes.reverse(); 
        var nexts=elem.nextSibling;  
        while(nexts){ 
            if(nexts.nodeType===1){ 
                nodes.push(nexts); 
            } 
            nexts=nexts.nextSibling; 
        } 
        return nodes; 
    } 


}

