window.onload=function(){
			function Ball(radius, color) {
                this.x = 0;
                this.y = 0;
                this.vx = 0;
                this.vy = 0;
                if (radius === undefined) {
                    radius = 20
                }
                this.radius = radius;
                if (color === undefined) {
                    color = "#f8f2e1"
                }
                this.color = color;
                this.mass=1;
            }

            Ball.prototype.draw = function (context) {
                context.save();
                context.translate(this.x, this.y); 
                context.fillStyle = this.color;
                context.beginPath();
                context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();
                context.stroke();
                context.restore();
            }
            var can = document.getElementById("mycanvas");
            var right=document.getElementsByClassName("right")[0];
            var rightW=right.offsetWidth;
            var rightH=right.offsetHeight; 
            can.width=rightW;
            can.height=rightH;

            window.onresize=function(){
                rightW=right.offsetWidth;
                rightH=right.offsetHeight; 
                can.width=rightW;
                can.height=rightH;
                console.log(can.width,can.height)
            }
            var cxt = can.getContext("2d");

            var particles=[];
            var particleNum=30;
            for(var size,particle,i=0;i<particleNum;i++){
                size=Math.random()*5+3;
                particle=new Ball(size,"#f6f6f6");
                particle.x=Math.random()*can.width;
                particle.y=Math.random()*can.height;
                particle.vx=Math.random()*4-2;
                particle.vy=Math.random()*4-2;
                particle.mass=size;
                particles.push(particle);
            }
            function move(partA,i){
                partA.x+=partA.vx;
                partA.y+=partA.vy;
                if(partA.x>can.width){
                    partA.x=0;
                }else if(partA.x<0){
                    partA.x=can.width;
                }
                if(partA.y>can.height){
                    partA.y=0;
                }else if(partA.y<0){
                    partA.y=can.height;
                }
                for(var partB, j=i+1;j<particleNum;j++){
                    partB=particles[j];
                    spring(partA,partB);
                }
            }
            var minDist=100;
            var spingAmount=0.00005;
            function spring(partA,partB){
                var dx=partB.x-partA.x;
                var dy=partB.y-partA.y;
                var dist=Math.sqrt(dx*dx+dy*dy);
                if(dist<minDist){
                    cxt.strokeStyle="#f6f6f6";
                    cxt.beginPath();
                    cxt.moveTo(partA.x,partA.y);
                    cxt.lineTo(partB.x,partB.y);
                    cxt.closePath();
                    cxt.stroke();
                    var ax=dx*spingAmount;
                    var ay=dy*spingAmount;
                    partA.vx+=ax/partA.mass;
                    partA.vy+=ay/partA.mass;
                    partB.vx-=ax/partB.mass;
                    partB.vy-=ay/partB.mass;
                }
            }
 
            function drawParticle(particle){
                particle.draw(cxt);
            } 
            (function drawFrame(){
            	window.requestAnimationFrame(drawFrame,can);
            	cxt.clearRect(0,0,can.width,can.height);

                 particles.forEach(drawParticle);
                 particles.forEach(move);
               
            }()) 

}

