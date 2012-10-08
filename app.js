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
                circles[i].resolveCollision(circles[b]);
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
    this.r = 50;//+ Math.round(Math.random()*50);
    this.mass = this.r;
    
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
        var dist = Math.sqrt(Math.pow(this.x - other.x,2) + Math.pow(this.y - other.y,2));//calculate distance
        if(dist <= minDist){
            return true;    
        }else{
            return false;    
        }
    };
    
    this.resolveCollision = function(other){//when two circles colide each other
        //from : https://sites.google.com/site/t3hprogrammer/research/circle-circle-collision-tutorial
        //changed it so it would work in my code
        var d = Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));//distance betweeen circles
        var nx = (other.x - this.x) / d;
        var ny = (other.y - this.y) / d;
        var p = 2 * (this.moveX * nx + this.moveY * ny - other.moveX * nx - other.moveY * ny) / (this.mass + other.mass);
        this.moveX = this.moveX - p * this.mass * nx;
        this.moveY = this.moveY - p * this.mass * ny;
        other.moveX = other.moveX + p * other.mass * nx;
        other.moveY = other.moveY + p * other.mass * ny;
        //
        var midpointX = (this.x + other.x) / 2;
        var midpointY = (this.y + other.y) / 2;
        this.x = midpointX + this.r * (this.x - other.x) / d;
        this.y = midpointY + this.r * (this.y - other.y) / d;
        other.x = midpointX + this.r * (other.x - this.x) / d;
        other.y = midpointY + this.r * (other.y - this.y) / d;
        
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