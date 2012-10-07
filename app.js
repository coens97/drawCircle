var c;//canvas
var ctx;//canvas content to draw in
var width;//width of window and canvas
var height;//height of window and canvas

var circles = [];//contains circles

init();
circles.push(new circle(100,100));

function mouseDown(e){
    var x = e.pageX;
    var y = e.pageY;
    circles.push(new circle(x,y));
}

function loop(){//call 60 times per second
    for(var i = 0; i<circles.length; i++){
        circles[i].loop();    
    }
    draw();
}

function draw(){
    ctx.clearRect(0, 0, width, height);//clear screen
    for(var i = 0; i<circles.length; i++){
        circles[i].draw();    
    }
}
/********************************
 * The circle object
 ******************************/
function circle(x,y){//this is an object
    this.color = randomColor();
    this.x = x;
    this.y = y;
    this.moveX = 0;
    this.moveY = 0;
    this.r = 50;
    
    this.loop = function(){
        this.moveY += 0.8;//gravity
        this.y += this.moveY;//move the circle
        this.x += this.moveX;//move the circle
        
        if(this.y + this.r> height){
            this.y = height - this.r;
            this.moveY = this.moveY * -1 + 2;    
        }
    };
    
    this.draw = function(){//when circle draw
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.fill();
    };
}

/************************
 * The basic
 ********************/
function init(){
    width = window.innerWidth;
    height = window.innerHeight;
    document.write( '<canvas id="myCanvas" width="' + width + '" height="' + height + '"></canvas>');
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    
    self.setInterval(function(){loop();},16);//create loop
    
    if ('ontouchstart' in document.documentElement) {
        c.addEventListener("touchstart", mouseDown, false);
    }
    else {
        c.addEventListener("click", mouseDown, false);
    }
}

function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}