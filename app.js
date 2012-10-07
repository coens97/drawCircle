var c;//canvas
var ctx;//canvas content to draw in
var width;//width of window and canvas
var height;//height of window and canvas

var circles = [];//contains circles

init();

function mouseDown(e){
    var x = e.pageX;
    var y = e.pageY;
    circles.push(new circle(x,y));
}

function loop(){//call 60 times per second
    for(var i = 0; i<circles.length; i++){
        circles[i].loop();    
    }
    
    //check collision
    for (var i = 0; i - 1 < circles.length - 1; i++) {
        for (var b = i + 1; b < circles.length; b++) {
            if(circles[i].collision(circles[b])){
                console.log("Collision");    
            }
        }
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
        
        //check collision with borders
        if(this.y + this.r> height){
            this.y = height - this.r;
            this.moveY = this.moveY * -1 + 2;    
        }
        if(this.x + this.r> width){
            this.x = width - this.r;
            this.moveX = this.moveX * -1;    
        }
        if(this.x - this.r < 0){
            this.x = this.r;
            this.moveX = this.moveX * -1;    
        }
    };
    
    this.draw = function(){//when circle draw
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.fill();
    };
    
    this.collision = function(other){//check if circles hit each other
        var minDist = this.r + other.r;
        var xDist = this.x - other.x;
        var yDist = this.y - other.y;
        var dist = Math.sqrt(xDist * xDist + yDist * yDist);
        if(dist <= minDist){
            return true;    
        }else{
            return false;    
        }
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