/*TODO: add variables and arrays*/
let wins = 0;
let allEnemies = [];


$('body').css('background-image', 'url(images/fon.jpg)');
$('body').css('background-size', 'cover');


/*@description If change hero, then reseted counter of wins*/
function newHero() {
  wins = 0;
  $('.win').text(`${wins}`);
};


/*@description add listeners on click on pictures*/
/*@returns adress of picture*/
function heroes() {

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
class Enemy {
  constructor() {
    this.x = -100;
    this.y = 100;
    this.sprite = 'images/enemy-bug.png';
  }

  /*@description update the enemy's position, required method for game*/
  /*@param dt, a time delta between ticks*/
  update(dt) {
    this.x = this.x + 100 * dt;

    if (this.x >= 550) {
      this.x = -50;
      this.y = (Math.floor(Math.random() * 7) + 2) * 30;
    };
  };

  /*@description draw the enemy on the screen, required method for game*/
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};


/*@constructor create class Player*/
class Player extends Enemy {
  constructor(sprite, x, y) {
    super(sprite, x, y);

    this.sprite = heroes();
    this.x = 202;
    this.y = 320;
  };

  /*@description check at collision and update the player's position*/
  update() {
    allEnemies.forEach(function(item, i, allEnemies) {
      const xMax = item.x + 70;
      const xMin = item.x - 71;
      const yMax = item.y + 75;
      const yMin = item.y - 65;

      if ((player.x <= xMax && player.x >= xMin) && (player.y <= yMax && player.y >= yMin)) {
        setTimeout (function() {
          soundBump();
          player.x = 202;
          player.y = 320;
        }, 100);
      };
    });
  };

  /*@description is returning player on beginning position*/
  begin() {
    this.y = 320;
    this.x = 202;
  };
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

        if (this.y <= -10) {
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
