//snaks gameiton

//we need init ,draw and update function

function init(){
    
    //console.log("init");
    canvas=document.getElementById('mycanvas');
    pen=canvas.getContext('2d');
    W=canvas.width;
    H=canvas.height;
    gameover=false;
    
    food=getRandomFood();
    score=5;
    snake={
        init_lenght:5,
        color:"yellow",
        cells:[],
        direction:"right",
        createSnake:function(){
            for(var i=this.init_lenght;i>=0;i--)
                {
                    this.cells.push({x:i,y:0});
                }
        },
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++)
                {
                    pen.fillStyle=this.color;
                    pen.strokeStyle="black";
                    pen.lineWidth=5;
                    pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
                    pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
                }
        },
        updateSnake:function(){
        var headX=this.cells[0].x;
        var headY=this.cells[0].y;
        
        
       // nextHeadX=headX+1;
       
       /// this.cells.unshift({x:nextHeadX,y:headY});
            
            if(headX==food.x && headY==food.y){
                food=getRandomFood();
                score++;
            }
            else
                {
                  this.cells.pop();  
                }
            
            if(this.direction=="right"){
                nextX=headX+1;
                nextY=headY;
            }
            else if(this.direction=="left"){
nextX=headX-1;
            nextY=headY;}
            else if(this.direction=="down"){
nextX=headX;
            nextY=headY+1;}
            else{
                nextX=headX;
                nextY=headY-1;
            }
            
            this.cells.unshift({x:nextX,y:nextY});
            
            var last_x=Math.round(W/10);
            var last_y=Math.round(H/10);
            
            if(this.cells[0].y<0 || this.cells[0].x<0||this.cells[0].x>last_x||this.cells[0].y>y){
                alert("Gameover");
                gameover=true;
                
            }
    }
    };
    
    snake.createSnake();
    
    function keyPressed(e){
        console.log("you pressed a key");
        console.log(e);
        
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        else{
            snake.direction="up";
        }
    }
    document.addEventListener('keydown',keyPressed);
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    //console.log("draw");
    
    
    pen.fillStyle=food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);
    
    pen.fillStyle="white";
    pen.font="14px Roboto";
    pen.fillText("Score : "+score,10,10);
}


function update(){
    
   snake.updateSnake(); 
    
}

function gameLoop(){
    
    draw();
    update();
    if(gameover==true)
        {
            clearInterval(f);
        }
}

function getRandomFood(){
    var foodX=Math.round(Math.random()*(W-10)/20);
    var foodY=Math.round(Math.random()*(H-10)/10);
    
    foodColours=["red","green","aqua","orchid"];
    var i=Math.round(Math.random()*foodColours.length);
    var food={
        x:foodX,
        y:foodY,
        color: foodColours[i]
        
        
    };
    return food;
}

init();
//call game loop after t time
var f=setInterval(gameLoop,100);