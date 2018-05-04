// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -100;
  this.y = 100;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x = this.x + 2;

  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x >= 550) {
    this.x = -50;
    this.y = (Math.floor(Math.random() * 7) + 2) * 30;
  };


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player extends Enemy {
  constructor(sprite, x, y) {
    super(sprite, x, y);
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 310;
  };
};

Player.prototype.update = function() {
  allEnemies.forEach(function(item, i, allEnemies) {
    const xMax = item.x + 70;
    const xMin = item.x - 70;
    const yMax = item.y + 50;
    const yMin = item.y - 50;

    if ((player.x <= xMax && player.x >= xMin) && (player.y <= yMax && player.y >= yMin)) {
      console.log ("Wrong!");
      setTimeout (function() {
        player.x = 202;
        player.y = 310;
      }, 100)
    }
  });
};

Player.prototype.handleInput = function(code) {
  switch(code) {
    case 'left' :
      if (this.x >= 50) {
        this.x = this.x - 100;
      };
      break;

    case 'up' :
      if (this.y >= 62) {
        this.y = this.y - 83;

      } else if (this.y = 61) {
        this.y = 310;
        this.x = 202;
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
  }
  //  check();
};


Enemy.prototype.changeX = function() {
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

let allEnemies = [];

const player = new Player;

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
  }
};

createEnemies()
