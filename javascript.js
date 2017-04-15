//Called de movement en de ballmovement method elke 15 milliseconden
setInterval(movement, 15);
setInterval(ballMovement, 15);

var array = {};
var moveSpeed = 7;
var speed = 6

var touchedLeft;
var touchedTop;
var pointsPlay1;
var pointsPlay2;
var scorePlayer1Int = 0;
var scorePlayer2Int = 0;
var angleNumber = Math.floor(Math.random() * 9) - 4.5;


//Functions voor smooth movement van StackOverflow
$(document).keydown(function(e) {
    array[e.keyCode] = true;
});
$(document).keyup(function(e) {
    delete array[e.keyCode];
});

//Player Movement en collision met boven/onderkant
function movement() {
var CollisionPoint = $("#PlayerField").offset().top;
var player1 = $("#player1");
var player2 = $("#player2");
var Play1Pos = player1.offset().top;
var Play2Pos = player2.offset().top;
var Play1BotPos = player1.offset().top + player1.outerHeight(true);
var Play2BotPos = player2.offset().top + player2.outerHeight(true);
var CollisionPointBot = CollisionPoint + $("#PlayerField").outerHeight(true);

    for (var direction in array) {
        if (direction == 87){
            player1.animate({top: "-=" + moveSpeed}, 0);
            if(Play1Pos -3 < CollisionPoint){
              player1.css({top: 0});
            }
        }

        if (direction == 83) {
            player1.animate({top: "+=" + moveSpeed}, 0);
if(Play1BotPos +2 > CollisionPointBot){
    player1.css({top: CollisionPointBot - player1.outerHeight(true) -8});
}
        }
        if (direction == 38){
            player2.animate({top: "-=" + moveSpeed}, 0);
            if(Play2Pos -3 < CollisionPoint){
              player2.css({top: 0});
            }
        }
        if (direction == 40) {
            player2.animate({top: "+=" + moveSpeed}, 0);
            if(Play2BotPos +2 > CollisionPointBot){
                player2.css({top: CollisionPointBot - player1.outerHeight(true) -8});
            }
    }
}}

//Ball Movement + Collision
function ballMovement(){
var ball = $("#ball");
var player1 = $("#player1");
var player2 = $("#player2");
var playerField = $("#PlayerField");


if(collision(ball, player1)){
touchedLeft = true;
}

else if(collision(ball, player2)){
touchedLeft = false;
}

//Checkt collision voor top
if(ball.offset().top < playerField.offset().top){
  touchedTop = true;
  angleNumber = angleNumber - (angleNumber*2);
}

//Checkt collision voor onderkant
else if(ball.offset().top + ball.outerHeight(true) > playerField.offset().top + playerField.outerHeight(true)){
  touchedTop = false;
  angleNumber = angleNumber - (angleNumber*2);
}

//Checkt collision voor links en geeft een speler een punt
if(ball.offset().left < playerField.offset().left){
scorePlayer1Int +=1;
angleNumber = angleNumber - (angleNumber*2);
document.getElementById("scorePlayer1").innerHTML = scorePlayer1Int;
touchedLeft = true;
angleNumber =  Math.floor(Math.random() * 12) - 6;
ball.css({left: 700, top:350});
}

//Checkt collision voor rechts en geeft een speler een punt
if(ball.offset().left + ball.width() > playerField.offset().left + playerField.width()){
  scorePlayer2Int +=1;
  document.getElementById("scorePlayer2").innerHTML = scorePlayer2Int;
  angleNumber = angleNumber - (angleNumber*2);
  touchedLeft = false;
  angleNumber = Math.floor(Math.random() * 9) - 4.5;
  ball.css({left: 700, top:350});
}

if(touchedLeft || (touchedLeft && !touchedTop)){
    ball.stop();
    ball.animate({
    left: "+=" + speed,
    top: '+=' + angleNumber
    },0);
  }

  if(!touchedLeft || (!touchedLeft && touchedTop)){
     ball.stop();
    ball.animate({
      left: "-=" + speed,
      top: '+=' + angleNumber
    },0);
  }
}

//Collision algorithme van internet.
function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
}
