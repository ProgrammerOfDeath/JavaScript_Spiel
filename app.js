//Variables of Canvas and Ball
var can = document.getElementById("game");
var context = can.getContext("2d");
var x = can.width / 2;
var y = can.height - 40;
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
var targetY;
var targetPedding = 15;
var targetWidth = plateWidth;
var targetHeight = plateHeigth;
var targetRow = 3;
var targetCol = 5;
var targets = [];

for(var i = 0; i<targetCol;i++){
    targets[i] = [];
    for(var j = 0; j<targetRow; j++){
        targets[i][j] = {x: 0, y: 0, status: 1};
    }
}

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
function drawTargets(){
    for(var i = 0; i<targets.length; i++){
        for(var j = 0; j<targets[i].length; j++){
            if(targets[i][j].status === 1){
                //Size of Targets
                targetX = (i*(targetWidth+targetPedding))+30;
                targetY = (j*(targetHeight+targetPedding))+30;
                targets[i][j].x = targetX;
                targets[i][j].y = targetY;
                //Draw Targets
                context.beginPath();
                context.rect(targets[i][j].x, targets[i][j].y, targetWidth, targetHeight);
                context.fillStyle = "#aaa";
                context.fill();
                context.closePath();
            }
        }
    }
}

//Proof for collision with Target
function collision(){
    for(var i = 0; i<targetCol; i++){
        for(var j = 0; j<targetRow; j++){
            var tar_help = targets[i][j];
            if(tar_help.status === 1 &&
               x > tar_help.x &&
               x < tar_help.x + targetWidth &&
               y > tar_help.y && 
               y < tar_help.y + targetHeight)
            {
                dy = -dy;
                targets[i][j].status = 0;
            }
        }
    }
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
    
    //Implements Functions
    drawBall();
    drawPlate();
    drawTargets();
    collision();
    
    context.font = "20px Helvetica"
    context.fontStyle = "aaa";
    context.fillText("Hallo", 10, 10);
    
	//Collision Detection Frame
    if (x + dx > can.width - radius || x + dx < radius) {
        dx = -dx;
    }
    if (y + dy < radius || (y + dy > can.height - plateHeigth - radius &&
						   x + dx > plateX &&
						   x + dx < plateX + plateWidth))
	{
	   dy = -dy;
	}else if(y + dy > can.height){
        alert('NEUSTART');
        document.location.reload();
    }
	
	
    
   
    //Movement Right
    if(pressRight && plateX < can.width - plateWidth){
       plateX += plateDx;
    }
    
    //Movement Left
    if(pressLeft && plateX > 0){
        plateX -= plateDx;
    }
    
    
	//Move the ball
    x += dx;
    y += dy;
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);