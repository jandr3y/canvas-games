
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
const score = document.getElementById("score");

const Player = {
    position: [20, 20],
    direction: 'D',
    draw(){

        context.fillStyle = 'red';
        context.fillRect( this.position[0], this.position[1], 20, 20 );

    },
    movement(){
        if( this.colision() ){
            switch( this.direction ) {
                case 'L':
                    this.position[0] = this.position[0] - 5;
                    break;
                case 'R':
                    this.position[0] = this.position[0] + 5;
                    break;
                case 'U':
                    this.position[1] = this.position[1] - 5;
                    break;
                case 'D':
                    this.position[1] = this.position[1] + 5;
                    break;
            }
        }
    },
    colision(){

        switch( this.direction ) {
            case 'L':
                if ( Map.mapArray[parseInt((this.position[1] - 1) / 20)][parseInt(this.position[0] / 20)] == 0 ){
                    return true;
                }
                break;
            case 'R':
                if ( Map.mapArray[parseInt((this.position[1] + 1) / 20)][parseInt(this.position[0] / 20)] == 0 ) {
                    return true;
                }
                break;
            case 'U':
                if ( Map.mapArray[parseInt(this.position[1] / 20)][parseInt((this.position[0] - 1) / 20)] == 0 ) {
                    return true;
                }
                break;
            case 'D':
                if ( Map.mapArray[parseInt(this.position[1] / 20)][parseInt((this.position[0] + 1) / 20)] == 0 ) {
                    return true;
                }
                break;
        }
        return false;
    },
    setDirection( event ){
        switch ( event.keyCode ) {
            case 37:
                if ( this.direction != 'R' ){
                    this.direction = 'L';
                }
                break;
            case 39:
                if ( this.direction != 'L' ) {
                    this.direction = 'R';
                }
                break;
            case 40:
                if ( this.direction != 'U' ) {
                    this.direction = 'D';
                }
                break;
            case 38:
                if ( this.direction != 'D' ) {
                    this.direction = 'U';
                }
                break;
        }
        this.movement();
    }
}

const Screen = {
    clear(){
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

const Map = {
    backgroundImage: new Image(),
    drawEnabled: false,
    mapArray: [],
    load(){

        return new Promise((resolve, reject) => {

            this.backgroundImage.onload = () => {
                this.drawEnabled = true;
                this.draw();
                resolve(true);

            }

            this.backgroundImage.src = 'lab1.png';
        });
    },
    draw(){
        if( this.drawEnabled ){
            context.drawImage(this.backgroundImage, 0, 0, 500, 500);
        }
    },
    redraw(){
        for(let i = 0; i < 500; i++){
            let mappedX = parseInt( i / 20 );
            console.log(i);
            console.log(mappedX)
            for(let j = 0; j < 500; j++){
                let mappedY = parseInt( j / 20 );
                switch(this.mapArray[mappedX][mappedY]){
                    case 1:
                        context.fillStyle = 'white';
                        context.fillRect(i, j, 1, 1);
                        break;
                    case 0:
                        context.fillStyle = 'black';
                        context.fillRect(i, j, 1, 1);
                        break;
                }
            }
        }
    },
    read: function () {

        let mapArray = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];


        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 25; j++) {
                let data =  context.getImageData(j, i, 1, 1).data;

                if ( data[0] == 255 && data[1] == 255 && data[2] == 255){
                    mapArray[i].push(1);
                }else{
                    mapArray[i].push(0);
                }

            }
        }


        this.mapArray = mapArray;
    }
}


const gameloop = () => {
    // Screen.clear();
    Player.movement();
    Player.draw();
    window.requestAnimationFrame(gameloop);
}

const start = () => {

    Map.load()
        .then( r => {
            Map.read();
            Map.redraw();
            // gameloop();
        });

    window.addEventListener('keydown', (e) => Player.setDirection(e));
}

start();