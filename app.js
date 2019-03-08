//Variables of Canvas and Ball
var can = document.getElementById("game");
var context = can.getContext("2d");
var x = can.width / 2;
var y = can.height - 30;
var dx = 2;
var dy = -2;
var radius = 15 ;

//Variables of the Plate
var plateWidth = 80;
var plateHeigth = 20;
var plateX = (can.width - plateWidth) / 2;
var plateY = can.height - plateHeigth;
var plateDx = 5; //Speed for Plate-Movement

//Variables for Movement
var pressRight;
var pressLeft;
var right = 39;
var left = 37;

//Variable for Target
var targetX;
var targetY = 10;
var targetWidth = plateWidth;
var targetHeight = plateHeigth;

//Draw the Ball
function drawBall() {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = "#eee";
    context.fill();
    context.closePath();
}

//Draw the Plate
function drawPlate(){
    context.beginPath();
    context.rect(plateX, plateY, plateWidth, plateHeigth);
    context.fillStyle = "#aaa";
    context.fill();
    context.closePath();
}

//Draw the Target-Plates
function drawTarget(){
    context.beginPath();
    context.rect(targetX, targetY, targetWidth, targetHeight);
    context.fillStyle = "#aaa";
    context.fill();
    context.closePath();
}

//Key-Handler
function keyPressedHandler(event){
    if(event.keyCode == right) {
       pressRight = true;
    }else if(event.keyCode == left) {
       pressLeft = true;
    }
}
function keyReleasedHandler(event){
    if(event.keyCode == right) {
       pressRight = false;
    }else if(event.keyCode == left) {
       pressLeft = false;
    }
}


document.addEventListener('keydown', keyPressedHandler, false);
document.addEventListener('keyup', keyReleasedHandler, false);


//Game Loop
function loop() {
    context.clearRect(0, 0, can.width, can.height);
    
    drawBall();
    drawPlate();
    
    for(var i = 0; i<5; i++){
        targetX = i*100+20;
        drawTarget();
    }
    
    if (x + dx > can.width - radius || x + dx < radius) {
        dx = -dx;
    }
    if (y + dy < radius) {
        dy = -dy;
    }
    
    
    //Movement Plate right
    if (plateX > can.width - plateWidth) {
        //do nothing
    } else if (pressRight) {
        plateX += plateDx;
    } 
    
    //Movement Plate left
    if (plateX < 0){
        //do nothing
    }else if(pressLeft){
        plateX -= plateDx;
    }
    
    x += dx;
    y += dy;
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);