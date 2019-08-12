const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
const score = document.getElementById("score");

const Snake = {
  headPosition: [0, 40],
  direction: 'D',
  body: [
    [0, 20],
    [0, 0]
  ],
  draw() {

    context.fillStyle = 'red';
    context.fillRect(this.headPosition[0], this.headPosition[1], 20, 20);

    this.body.forEach(position => {
      context.fillStyle = 'black';
      context.fillRect(position[0], position[1], 20, 20);
    });

  },
  movement() {
    this.body = [
      [...this.headPosition], ...this.body
    ];
    this.body.pop();

    switch (this.direction) {
      case 'L':
        this.headPosition[0] = this.headPosition[0] - 20;
        break;
      case 'R':
        this.headPosition[0] = this.headPosition[0] + 20;
        break;
      case 'U':
        this.headPosition[1] = this.headPosition[1] - 20;
        break;
      case 'D':
        this.headPosition[1] = this.headPosition[1] + 20;
        break;
    }
  },
  colision() {
    if (this.headPosition[0] < 0 || this.headPosition[1] < 0) {
      return true;
    }

    if (this.headPosition[0] > 480 || this.headPosition[1] > 480) {
      return true;
    }

    let inter = false;
    this.body.map(position => {
      if (this.headPosition[0] == position[0] && this.headPosition[1] == position[1]) {
        inter = true;
      }
    })

    return inter;
  },
  setDirection(event) {
    switch (event.keyCode) {
      case 37:
        if (this.direction != 'R') {
          this.direction = 'L';
        }
        break;
      case 39:
        if (this.direction != 'L') {
          this.direction = 'R';
        }
        break;
      case 40:
        if (this.direction != 'U') {
          this.direction = 'D';
        }
        break;
      case 38:
        if (this.direction != 'D') {
          this.direction = 'U';
        }
        break;
    }
    this.movement();
  }
}

const Screen = {
  clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

const Food = {
  position: [40, 40],
  generate() {
    this.position[0] = Math.floor((Math.random() * 24) + 1) * 20;
    this.position[1] = Math.floor((Math.random() * 24) + 1) * 20;

    this.draw();
  },
  draw() {
    context.fillStyle = 'green';
    context.fillRect(this.position[0], this.position[1], 20, 20);
  }
}

const gameloop = () => {

  Screen.clear();

  Food.draw();
  if (Snake.colision()) {
    window.location.reload();

  }

  if (Snake.headPosition[0] === Food.position[0] && Snake.headPosition[1] === Food.position[1]) {
    Food.generate();
    score.innerText = parseInt(score.innerText) + 1;
    Snake.body = [...Snake.body, [Snake.body[Snake.body.length - 1][0], Snake.body[Snake.body.length - 1][1]]];

  }

  Snake.draw();
  window.requestAnimationFrame(gameloop);
}

const start = () => {
  Food.generate();
  setInterval(() => Snake.movement(), 200);
  gameloop();
  window.addEventListener('keydown', (e) => Snake.setDirection(e));
}

start();