const game = document.querySelector("#game")
const gr = game.getContext("2d")
let birdX = 64
let birdY = 10
let bg = new Image()
bg.src = "img/bg.png"
let bird = new Image()
let pipes = []
pipes[0] = {x: game.width, y: 0}
bird.src = "img/bird.png"
let birdSpeed = 5
let fly = new Audio()
fly.src = "audio/fly.mp3"
let pipeUp = new Image ()
pipeUp.src = "img/pipeUp.png"
let pipeBottom = new Image ()
pipeBottom.src = "img/pipeBottom.png"
let fg = new Image()
fg.src = "img/fg.png"
let hole = 100

let scoreSound = new Audio()
scoreSound.src = "audio/score.mp3"

let timer

let scores = 0

function draw() {
    gr.drawImage(bg,0,0)
   
  
    for (let i = 0; i < pipes.length; i++){
        gr.drawImage(pipeUp,pipes[i].x,pipes[i].y)
        gr.drawImage(pipeBottom,pipes[i].x,pipes[i].y + pipeUp.height + hole )
        pipes[i].x -= 8
        if (pipes[i].x == 288){ 
            pipes.push({x: game.width,y: -Math.random() * 100 })
        }
        if (danger(birdX, birdY, birdX + bird.width, birdY + bird.height,
           pipes[i].x,
           pipes[i].y + pipeUp.height + hole,
           pipes[i].x + pipeUp.width,
           pipes[i].y + pipeUp.height + hole + pipeBottom.height)){
            clearInterval(timer)
           }

           if (danger(birdX, birdY, birdX + bird.width, birdY + bird.height,
            pipes[i].x,pipes[i].y,pipes[i].x + pipeUp.width,pipes[i].y + pipeUp.height )){
             clearInterval(timer)
            }
            if(pipes[i].x == 0) {
                scores++
                scoreSound.play()
            }
    } 
   

    gr.drawImage(fg, 0, game.height - fg.height)
    gr.drawImage(bird,birdX,birdY)
    if (birdY < 0){
        birdY = 0

        
       clearInterval(timer)
    }

    if (birdY + bird.height > game.height - fg.height){
        birdY = game.height - fg.height - bird.height
        clearInterval(timer)
    }


    birdY = birdY + birdSpeed
    birdSpeed++

    gr.font = "30px Arial"
    gr.fillText("Очки: " + scores,50,game.height - fg.height + fg.height / 2)
}

document.addEventListener("keydown",function(info){
if (info.key == " "){
    birdSpeed = -8
    fly.play()
}
})



bird.onload = function(){
    timer = setInterval(draw,100)
}

function danger (
    xBirdMin,yBirdMin,xBirdMax,yBirdMax,
    xPipeMin,yPipeMin,xPipeMax,yPipeMax
    ) {
      xMin = Math.max (xBirdMin,xPipeMin)
      yMin = Math.max (yBirdMin,yPipeMin)  
      xMax = Math.min (xBirdMax,xPipeMax)
      yMax = Math.min (yBirdMax,yPipeMax)
      let width = xMax - xMin
      let height = yMax - yMin
      if (width > 0 && height > 0) return true 
      else return false
    }