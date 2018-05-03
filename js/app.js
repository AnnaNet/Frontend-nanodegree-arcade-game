// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -20;
  this.y = 65;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + 2;

  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player extends Enemy {};



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
player.sprite = 'images/char-boy.png';
player.x = 3;
player.y = 50;

//player.update;

function createEnemies() {
  for (let i = 0; i < 2; i++) {
    const enemy = new Enemy;
    enemy.y = 50 * i + 150;
    switch(i) {
      case 0 : enemy.x = -50;
        break;
      case 1 : enemy.x = 20;
        break;
    }
    allEnemies.push(enemy);
  }
};

createEnemies();

