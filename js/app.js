/*TODO: add variables and arrays*/
let wins = 0;
let allEnemies = [];


/*TODO: Add counter of wins, instructions and background*/
$('body').append(`<div style="font-size: 2.5em; margin-top: 1em;">
  <span class="win" style="color: #b5ff0f">${wins}</span>
  <span style="color: #c70000">W</span>
  <span style="color: #0e0ea2">I</span>
  <span style="color: #1ac19d">N</span>
  <span style="color: #128e0b">S</span>
  </div>`
);

$('body').append(`<div style="color:lightgray">*for changing Hero click picture of Hero<br>*press "n" for restart game</div>`);

$('body').css('background-image', 'url(images/fon.jpg)');
$('body').css('background-size', 'cover');


/*@description If change hero, then reseted counter of wins*/
function newHero() {
  wins = 0;
  $('.win').text(`${wins}`);
};


/*@description Add pictures of heroes in DOM and listeners on click on pictures*/
/*@returns adress of picture*/
function heroes() {

  $('body').append(`<div class="hero" style="margin-bottom: -4em">
  <img src="images/char-boy.png" alt="picture">
  <img src="images/char-cat-girl.png" alt="picture">
  <img src="images/char-horn-girl.png" alt="picture">
  <img src="images/char-pink-girl.png" alt="picture">
  <img src="images/char-princess-girl.png" alt="picture">
  <div>`);

  $('img:eq(0)').click(function() {
    player.sprite = 'images/char-boy.png';
    newHero();
  });

  $('img:eq(1)').click(function() {
    player.sprite =  'images/char-cat-girl.png';
    newHero();
  });

  $('img:eq(2)').click(function() {
    player.sprite = 'images/char-horn-girl.png';
    newHero();
  });

  $('img:eq(3)').click(function() {
    player.sprite = 'images/char-pink-girl.png';
    newHero();
  });

  $('img:eq(4)').click(function() {
    player.sprite = 'images/char-princess-girl.png';
    newHero();
  });

  return ('images/char-boy.png');
};


/*@description create sound for win*/
function soundWin() {
  let sound = new Audio();
  sound.src = 'sounds/wins.wav';
  sound.autoplay = true;
};


/*@description create sound for collision*/
function soundBump() {
  let sound = new Audio();
  sound.src = 'sounds/bump.wav';
  sound.autoplay = true;
};


/*@constructor create class Enemy*/
let Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.x = -100;
  this.y = 100;
};


/*@description update the enemy's position, required method for game*/
/*@param dt, a time delta between ticks*/
Enemy.prototype.update = function(dt) {
  this.x = this.x + 2;
  if (this.x >= 550) {
    this.x = -50;
    this.y = (Math.floor(Math.random() * 7) + 2) * 30;
  };
};


/*@description draw the enemy on the screen, required method for game*/
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*@constructor create class Player*/
class Player extends Enemy {
  constructor(sprite, x, y) {
    super(sprite, x, y);

    this.sprite = heroes();
    this.x = 202;
    this.y = 310;
  };
};


/*@description check at collision and update the player's position*/
Player.prototype.update = function() {
  allEnemies.forEach(function(item, i, allEnemies) {
    const xMax = item.x + 60;
    const xMin = item.x - 60;
    const yMax = item.y + 40;
    const yMin = item.y - 40;

    if ((player.x <= xMax && player.x >= xMin) && (player.y <= yMax && player.y >= yMin)) {
      setTimeout (function() {
        soundBump();
        player.x = 202;
        player.y = 310;
      }, 100);
    };
  });
};


/*@description is returning player on beginning position*/
Player.prototype.begin = function() {
  this.y = 310;
  this.x = 202;
};


/*@description update the player's position*/
Player.prototype.handleInput = function(code) {
  switch(code) {
    case 'left' :
      if (this.x >= 50) {
        this.x = this.x - 100;
      };
      break;

    case 'up' :
      if (this.y >= 0) {
        this.y = this.y - 83;

        if (this.y === -22) {
          soundWin();
          setTimeout(() => this.begin(), 500);
          wins = wins + 1;
          $('.win').text(`${wins}`);
        };
      };
      break;

    case 'right' :
      if (this.x <= 350) {
        this.x = this.x + 100;
      };
      break;

    case 'down' :
      if (this.y <= 350) {
        this.y = this.y + 83;
      };
      break;
  };
};


/*@description listens for key presses and sends the keys to your*/
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});


/*@description create array of objects Enemy*/
function createEnemies() {
  for (let i = 0; i <= 4; i++) {
    const enemy = new Enemy;
    enemy.y = (Math.floor(Math.random() * 6) + 1) * 20;

    switch(i) {
      case 0 : enemy.x = -150;
        break;
      case 1 : enemy.x = 20;
        break;
      case 2 : enemy.x = -200;
        break;
      case 3 : enemy.x = -400;
        break;
    };

    allEnemies.push(enemy);
  };
};


/*TODO: create array of objects Enemy*/
createEnemies();


/*TODO: create object of class Player*/
const player = new Player;


/*TODO: when press 'n', restart game*/
$('html').keydown(function(eventObject) {
  if (event.keyCode === 78) {
    location.reload();
  };
});
