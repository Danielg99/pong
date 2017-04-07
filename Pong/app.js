const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const fps = 60;
let cWidth = canvas.width;
let cHeight = canvas.height;
let pDown;
let pUp;
let speed = 8;
let score = 0;

let ball = {
    x: cWidth/2,
    y: 50,
    r: 15
};
let paddle = {
    x: 10,
    y: 0,
    w: 15,
    h: cHeight/8
};
let paddleRight = {
    x: cWidth - 30,
    y: 0,
    w: 15,
    h: cHeight/8
};

document.addEventListener('keydown', function(e){
    pDown = e.keyCode;
    switch (e.keyCode) {
        case 40:
            paddle.y += 20;
            break;
        case 38:
            paddle.y-= 20;
            break;
    }
});

main();

function drawPaddle(x, y, w, h){
    ctx.fillStyle = 'blue';
    ctx.fillRect(x, y, w, h);
    
}

function drawBall(x, y, r){
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
}

function clear(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,cWidth, cHeight);
}

function main(){
    clear();
    paddleRight.y = ball.y - paddleRight.h/2;
    drawPaddle(paddle.x, paddle.y, paddle.w, paddle.h);
    drawPaddle(paddleRight.x, paddleRight.y, paddleRight.w, paddleRight.h);
    drawBall(ball.x, ball.y, ball.r);
    ball.x -= speed;
    ball.y++;
    if(RectCircleColliding(ball, paddle) || RectCircleColliding(ball, paddleRight))
    speed = -speed;
    
    if(RectCircleColliding(ball, paddle))
    score++
    console.log(score)

    if(ball.x <= 0 || ball.x >= cWidth){
        alert("Game Over...");
        window.location.reload();
    }

    if (c.height <= ball.y){

    }
    
    delay();
};

function delay(){
    setTimeout(main, 1000/fps);
}

function RectCircleColliding(circle, rect) {
    var distX = Math.abs(circle.x - rect.x - rect.w / 2);
    var distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > (rect.w / 2 + circle.r)) {
        return false;
    }
    if (distY > (rect.h / 2 + circle.r)) {
        return false;
    }

    if (distX <= (rect.w / 2)) {
        return true;
    }
    if (distY <= (rect.h / 2)) {
        return true;
    }

    var dx = distX - rect.w / 2;
    var dy = distY - rect.h / 2;
    return (dx * dx + dy * dy <= (circle.r * circle.r));
}

