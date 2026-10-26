//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

player = new GameObject({x:100, y:canvas.height/2-100});

platform0 = new GameObject();
platform0.width = 200;
platform0.x = platform0.width/2;
platform0.y = canvas.height - platform0.height/2;
platform0.color = "#66ff33";

platform2 = new GameObject();
platform2.width = 300;
platform2.x = 800;
platform2.color = "#66ff33";
platform2.y = platform0.y - 530;
platform2.color = "#66ff33";

platform1 = new GameObject();
platform1.width = 300;
platform1.x = 500;
platform1.color = "#66ff33";
platform1.height = 20;
platform1.y = 800;
platform1.color = "#66ff33";

goal = new GameObject({width:24, height:50, x:canvas.width-50, y:100, color:"#00ffff"});

var fX = .85;
var fY = .97;
var gravity = 1;

interval = 1000/60;
timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);

    if(w && player.canJump && player.vy ==0)
    {
        player.canJump = false;
        player.vy += player.jumpHeight;
    }

    if(a) player.vx += -player.ax * player.force;
    if(d) player.vx += player.ax * player.force;

    player.vx *= fX;
    player.vy *= fY;
    player.vy += gravity;
    player.x += Math.round(player.vx);
    player.y += Math.round(player.vy);

    while(platform0.hitTestPoint(player.bottom()) && player.vy >=0)
    {
        player.y--;
        player.vy = 0;
        player.canJump = true;
    }

    while(platform0.hitTestPoint(player.left()) && player.vx <=0)
    {
        player.x++;
        player.vx = 0;
    }

    while(platform0.hitTestPoint(player.right()) && player.vx >=0)
    {
        player.x--;
        player.vx = 0;
    }

    while(platform0.hitTestPoint(player.top()) && player.vy <=0)
    {
        player.y++;
        player.vy = 0;
    }

    if(platform1.hitTestPoint(player.bottom()) && player.vy >= 0)
    {
        player.y = platform1.y - platform1.height/2 - player.height/2;
        player.vy = 0;
        player.canJump = true;
    }

    if(player.hitTestObject(goal))
    {
        goal.y = 10000;
        context.textAlign = "center";
        context.fillText("You Win!!!", canvas.width/2, canvas.height/2);
    }

    platform1.y -= 2;

    while(platform1.hitTestPoint(player.left()) && player.vx >= 0)
    {
        platform1.x += player.vx;
        player.x++;
    }

    if(platform1.hitTestObject(player))
    {
        platform1.vx = -5;
    }

    platform0.drawRect();
    platform2.drawRect();
    platform1.drawRect();
    player.drawRect();

    //Show hit points
    player.drawRect();
    goal.drawCircle();
}