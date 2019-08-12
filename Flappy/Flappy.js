const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
const score = document.getElementById('score')
const tubes = [];

const Bird = {
  y: canvas.height / 2,
  x: (canvas.width / 2) - 150,
  velocity: 0,
  gValue: 0.2,
  defaultJumpForce: 3,
  jumpForce: this.defaultJumpForce,
  jumpState: false,
  draw() {
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, 32, 32);
  },
  gravity() {
    if (this.y <= canvas.height - 32 && !this.jumpState) {
      this.velocity += this.gValue;
      this.y += this.velocity;
    } else if (!this.jumpState) {
      this.velocity = 0;
    }
  },
  jump() {

    if (this.jumpForce > 0 && this.jumpForce < 30) {
      this.jumpForce = this.jumpForce - this.gValue;
      this.y -= this.jumpForce;
    } else {
      this.jumpState = false;
    }
  },
  controls(event) {
    if (event.keyCode == 32) {
      this.jumpForce = this.jumpForce + this.defaultJumpForce;
      this.velocity = 0;
      this.jumpState = true;
    }
  }
}

class Tube {

  constructor(x) {
    this.x = x;
    this.count = false;
    this.space = 150;
    this.randomSpace = Math.random() * (400 - 100) + 100;
  }

  draw() {

    if (this.x + 80 <= Bird.x && !this.count) {
      score.innerText = parseInt(score.innerText) + 1;
      this.count = true;
    }

    if (this.x > -250) {
      this.x -= 2;
    } else {
      this.regenerate();
    }

    context.fillStyle = 'black';
    context.fillRect(this.x, 0, 80, canvas.height - this.space - this.randomSpace);
    context.fillRect(this.x, canvas.height - this.randomSpace, 80, canvas.height);
  }

  regenerate() {
    this.x = 500;
    this.randomSpace = Math.random() * (400 - 100) + 100;
  }
}

const gameloop = () => {

  context.clearRect(0, 0, canvas.width, canvas.height);

  Bird.gravity();

  if (Bird.jumpState) Bird.jump();
  else Bird.jumpForce = Bird.defaultJumpForce;

  tubes.map(tube => {

    // Colisão dos Tubos
    if (
      ((Bird.x + 32) >= tube.x && Bird.x <= tube.x + 80) &&
      (Bird.y <= canvas.height - tube.space - tube.randomSpace || Bird.y + 32 >= canvas.height - tube.randomSpace)
    ) {
      window.location.reload();
    }

    tube.draw()
  });

  Bird.draw();
  window.requestAnimationFrame(gameloop);
}

const start = () => {
  tubes.push(new Tube(500))
  tubes.push(new Tube(750))
  tubes.push(new Tube(1000))
  window.addEventListener('keydown', (e) => Bird.controls(e));
  gameloop();
}

start();