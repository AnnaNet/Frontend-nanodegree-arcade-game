/*TODO: add array for enemies*/
let allEnemies = [];


/*@description create sound for win*/
function soundWin() {
  let sound = new Audio();
  sound.src = 'sounds/wins.wav';
  sound.autoplay = true;
}


/*@description create sound for collision*/
function soundBump() {
  let sound = new Audio();
  sound.src = 'sounds/bump.wav';
  sound.autoplay = true;
}


/*@constructor create class Enemy*/
class Enemy {
  constructor() {
    this.x = -100;
    this.y = 100;
    this.sprite = 'images/enemy-bug.png';
    this.velocity = (Math.floor(Math.random() * 7) + 2) * 50;
  }

  /*@description set beginning position*/
  beginPosition(p) {
    switch(p) {
      case 0 : this.x = -150;
        break;
      case 1 : this.x = 20;
        break;
      case 2 : this.x = -200;
        break;
      case 3 : this.x = -400;
        break;
    }
  }

   /*@description set velocity*/
   speed() {
    this.velocity = (Math.floor(Math.random() * 5) + 3) * 40;
  }

  /*@description update the enemy's position, required method for game*/
  /*@param dt, a time delta between ticks*/
  update(dt) {
    this.x = this.x + this.velocity * dt;

    if (this.x >= 550) {
      this.x = -50;
      this.y = (Math.floor(Math.random() * 7) + 2) * 30;
      this.speed();
    }
  }

  /*@description draw the enemy on the screen, required method for game*/
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}


/*@constructor create class Player*/
class Player extends Enemy {
  constructor(sprite, x, y) {
    super(sprite, x, y);
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 320;
    this.wins = 0;
  }

  /*@description check at collision and update the player's position*/
  update() {
    allEnemies.forEach(function(item, i, allEnemies) {
      const xMax = item.x + 70;
      const xMin = item.x - 71;
      const yMax = item.y + 70;
      const yMin = item.y - 57;

      if ((player.x <= xMax && player.x >= xMin) && (player.y <= yMax && player.y >= yMin)) {
        setTimeout (function() {
          soundBump();
          player.x = 202;
          player.y = 320;
        }, 100);
      }
    });
  }

  /*@description is returning player on beginning position*/
  begin() {
    this.y = 320;
    this.x = 202;
  }

  /*@description update the player's position*/
  handleInput(code) {
    switch(code) {
      case 'left' :
        if (this.x >= 50) {
          this.x = this.x - 100;
        }
        break;

      case 'up' :
        if (this.y >= 0) {
          this.y = this.y - 83;

          if (this.y <= -10) {
            soundWin();
            setTimeout(() => this.begin(), 500);
            this.wins = this.wins + 1;
            $('.win').text(`${this.wins}`);
          }
        }
        break;

      case 'right' :
        if (this.x <= 350) {
          this.x = this.x + 100;
        }
        break;

      case 'down' :
        if (this.y <= 350) {
          this.y = this.y + 83;
        }
        break;
    }
  }

  /*@description If change hero, then reseted counter of wins*/
  newHero() {
    this.wins = 0;
    $('.win').text(`${this.wins}`);
  }

  /*@description add listeners on click on pictures*/
  heroes() {
    $('img:eq(0)').click(() => {
      player.sprite = 'images/char-boy.png';
      this.newHero();
    });

    $('img:eq(1)').click(() => {
      player.sprite =  'images/char-cat-girl.png';
      this.newHero();
    });

    $('img:eq(2)').click(() => {
      player.sprite = 'images/char-horn-girl.png';
      this.newHero();
    });

    $('img:eq(3)').click(() =>  {
      player.sprite = 'images/char-pink-girl.png';
      this.newHero();
    });

    $('img:eq(4)').click(() => {
      player.sprite = 'images/char-princess-girl.png';
      this.newHero();
    });
  }

  /*@description listens for key presses and sends the keys to your*/
  addListener() {
    document.addEventListener('keyup', (e) => {
      const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
      };

      this.handleInput(allowedKeys[e.keyCode]);
    });
  }
}


/*@description create array of objects Enemy*/
function createEnemies() {
  for (let i = 0; i <= 4; i++) {
    const enemy = new Enemy();
    enemy.y = (Math.floor(Math.random() * 6) + 1) * 20;
    enemy.beginPosition(i);
    allEnemies.push(enemy);
  }
}


/*TODO: create array of objects Enemy*/
createEnemies();


/*TODO: create object of class Player and run his methods*/
const player = new Player();
player.heroes();
player.addListener();


/*TODO: when press 'n', restart game*/
$('html').keydown(function(eventObject) {
  if (event.keyCode === 78) {
    location.reload();
  }
});
