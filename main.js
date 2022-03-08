var gameState = true;   // Game State ()
var speedOfObs = 800; // Speed of Obstacles
gap = speedOfObs;
var myObstacles = [];
var enemytypes = ["blue", "green", "black","corona"];
var gamescore = 0;
//inserting images
var standimage = new Image();
standimage.src = "man.png";

var img1 = new Image();
img1.src = "frame-1.png";

var img2 = new Image();
img2.src = "frame-2.png";

var img3 = new Image();
img3.src = "frame-3.png";
                                 
var img4 = new Image(); 
img4.src = "virus.png";


function startGame() {
    gamearea.start();
}



function everyinterval(n) {
    if (gamearea.frame !=0 && (gamearea.frame % n == 0)) return true;
    return false;
}
function jump() {
    player.speedY = -2;

}


var scoreText = {
    x: 220,
    y: 200,
    update: function (text) {
        gamearea.context.fillStyle = "#334443";
        gamearea.context.font = "30px Consolas";
        gamearea.context.fillText(text, 220, 200);
    }
}
var player = {
    x: 30,
    y: 520,
    speedY: 0,
    update: function () {
        if (this.y < 520) { 
            gamearea.context.drawImage(standimage, this.x, this.y - 40, 60, 60);
        }
        else {
            gamearea.context.drawImage(standimage, this.x, this.y - 40, 50, 60);
        }
    },
    newPos: function () {
        if (this.y < 320) {
            this.speedY = 2;

        }
        this.y = this.y + this.speedY;
        if (this.speedY == 2 && this.y == 520) {
            this.speedY = 0;
        }

    },
    crashWith: function (obs) {
        if (this.x + 30 > obs.x && this.x < obs.x + obs.width && this.y + 30> obs.y) {
            return true;
        }
        return false;
    }
}
function obstacle() {
    this.height = Math.floor(50 + Math.random() * (50 - 20 + 1));
    this.width = Math.floor(50 + Math.random() * (20 - 10 + 1));
    this.x = 1000;
    this.y = gamearea.canvas.height - this.height;
    this.index = Math.floor(Math.random() * enemytypes.length);
    this.enemytype = enemytypes[this.index];
    this.draw = function () {
        if (this.enemytype == "blue") {
            gamearea.context.drawImage(img1, this.x, this.y - 72, 40, this.height + 5);
        }
        else if (this.enemytype == "green") {
            gamearea.context.drawImage(img2, this.x, this.y - 72, 40, this.height + 5);
        }
        else if (this.enemytype == "black") {
            gamearea.context.drawImage(img3, this.x, this.y - 72, 40, this.height + 5);
        }
        else {
            gamearea.context.drawImage(img4, this.x, this.y - 110, 60, this.height + 10);
        }
    }
}

var mySong;
var song = "";
var random = Math.floor(Math.random() * 2);  

// if(random==0)
// {
//   song = "mySong2"; //mySong1
// }
// else
// {
//   song = "mySong2";
// }
song="mySong2";

var gamearea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.height = 600;
        this.canvas.width = 800;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.context = this.canvas.getContext("2d");
        this.frame = 0;
        this.score = 0;
        scoreText.update("Score: 0");
        this.interval = setInterval(this.updateGameArea, 5);
        window.addEventListener("click",function()
          {
            //var audiomacha = new Audio('macha.mp3');
            if(gameState == true && player.y == 520)
            {
              jump();
              mySong = document.getElementById(song);
              mySong.play();
              //audiomacha.play();
            }
          });
    },
    updateGameArea: function () {
        for (i = 0; i < myObstacles.length; i++) {
            if (player.crashWith(myObstacles[i])) {
                mySong.pause();
                gamearea.stop();
                gameState = false;
                var audio = new Audio('Gameover.mp3');
                audio.play();
                return;
            }
        }
        gamearea.clear();
        if (everyinterval(gap)) {
            myObstacles.push(new obstacle());
            gap = speedOfObs;
            gamearea.frame = 0;
        }
        for (i = 0; i < myObstacles.length; i++) {
            myObstacles[i].x -= 1.25;
            myObstacles[i].draw();
        }
        player.newPos();
        player.update();
        gamearea.frame += 2;
        gamearea.score += 0.01;
        gamescore = Math.floor(gamearea.score);
        if(gamescore>1 && gamescore%40 ==0)
        {
            speedOfObs -=2;
        }
        scoreText.update("Score: " + gamescore);

    },
    clear: function () {
        gamearea.context.clearRect(0, 0, this.canvas.width, this.canvas.width);
    },
    stop: function () {
        clearInterval(this.interval);
        gamearea.context.fillStyle = "#334443";
        gamearea.context.font = "25px Consolas";
        gamearea.context.fillText("GAME OVER!!!", 200, 250);
    },
}