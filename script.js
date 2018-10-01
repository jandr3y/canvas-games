      const canvas = document.getElementById("screen")
      const ctx = canvas.getContext('2d')


      let controlls = {
        up : false,
        down : false,
        left : false,
        right : false
      }

      // inicializa o placar
      scoreboard.draw()

      let map = {
        initX: 900,
        obsHeight :Math.floor(Math.random() * (80 - 40)) + 40,
        obsVelocity: 0.5,
        obsMaxVelocity: 80,
        obsWidth: 30,
        groundHeight: 190,
        ground : function(){
          ctx.fillStyle = 'black'
          ctx.fillRect(0, (canvas.height - this.groundHeight), canvas.width, this.groundHeight);
        },
        obs : function(x){
          ctx.fillStyle = 'black'
          ctx.fillRect(x, ((canvas.height - this.groundHeight) - this.obsHeight), this.obsWidth, this.obsHeight)
        },
        init : function(){
          /*
          * Reseta a possição X do obstaculo e gera uma nova altura, incrementando 1 ponto e velocidade.
          */
          if(this.initX < -20) {
            scoreboard.update()
            this.initX = 900
            this.obsHeight = Math.floor(Math.random() * 70 + 50)
            if(this.obsVelocity < this.obsMaxVelocity) this.obsVelocity += 0.2
          }

          this.ground()
          this.obs(this.initX)
          this.initX -= this.obsVelocity
        }
      }

      let player = {
        x: 50,
        y: canvas.height - map.groundHeight - 25,
        radius: 25,
        velocity: 0.8,
        init: function(){

          this.movement()

          if(this.jump.state)
            this.jump.exec()
          else 
            this.jump.jumpForce = 2.5

          ctx.fillStyle = 'red'
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius,0,2*Math.PI);
          ctx.fill();
          ctx.stroke();
        },
        movement : function(){
          if(controlls.up) this.jump.state = true
          if(controlls.left) {
            if(this.x > 0 + this.radius) this.x -= this.velocity
          }
          if(controlls.right){
            if(this.x < 700 - this.radius) this.x += this.velocity
          }
        },
        jump : {
          state : false,
          jumpForce : 2.5,
          exec : function(){
            if(this.jumpForce > 0.1){
              this.jumpForce = this.jumpForce - world.gravityValue
              player.y -= this.jumpForce
            }else{
              player.y = (canvas.height - map.groundHeight - player.radius)
              this.state = false
            }
          }
        }
      }

      let world = {
        gravityValue: 0.010,
        gravitySpeed: 0,
        gravity: function(){
          this.gravitySpeed += this.gravityValue
          player.y += this.gravitySpeed
        } 
      }

      function gameloop(){
        // colisão do objeto 
        if (player.x + player.radius >= map.initX && 
            player.x - player.radius <= map.initX + map.obsWidth) {
          if (player.y >= ((canvas.height - map.groundHeight) - map.obsHeight - player.radius )) {
            scoreboard.updateRecord()
            location.reload(); 
          }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if(player.y < (canvas.height - map.groundHeight - player.radius)) 
        world.gravity()
        else 
        world.gravitySpeed = 0
        
        map.init()
        player.init()

      }

      window.addEventListener("keydown", function(e){
        if(e.keyCode === 37) controlls.left = true;
        if(e.keyCode === 38) controlls.up = true;
        if(e.keyCode === 39) controlls.right = true;
        if(e.keyCode === 40) controlls.down = true;
      })

      window.addEventListener("keyup", function(e){
        if(e.keyCode === 37) controlls.left = false;
        if(e.keyCode === 38) controlls.up = false;
        if(e.keyCode === 39) controlls.right = false;
        if(e.keyCode === 40) controlls.down = false;
      })

      setInterval(gameloop, 1)
