
// Games constants and Variables
let inputDir = { x: 0, y: 0 };

const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const move = new Audio('music/move.mp3');
const music = new Audio('music/music.mp3');

let speed = 5;
let score=0;
let lastPaintTime = 0;

let snkArr = [{ x: 3, y: 5 }];
let food = { x: 10, y: 15 };

var highScore=localStorage.getItem("HighestScore");
if(highScore==null){
    highscoreid.innerHTML=`High Score: 0`

}else{
    highscoreid.innerHTML=`High Score: ${highScore}`
}



// Games functions

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(sArr) {
    // if you bump into yourself
    for (let j = 1; j < sArr.length; j++) {
        if(sArr[0].x==sArr[j].x&&sArr[0].y==sArr[j].y)
        {
            return true;
        }
        
    }

    


    // if you collide to wall
    if(sArr[0].x>18||sArr[0].x<=0||sArr[0].y>18||sArr[0].y<=0){
        return true;
    }


    return false;
}

function gameEngine() {
    // Part 1: Updating the Snake Array and Food
    if(isCollide(snkArr)){
        gameOverSound.play();
        inputDir={ x: 0, y: 0 };
        alert('Game over, press any key to play again')
        snkArr = [{ x: 3, y: 5 }];
        score=0;
        scoreid.innerHTML=`Your Score: ${score}`;
    }

    // If you have eaten the food , increment the score and regenerate the food
    if(snkArr[0].x==food.x&&snkArr[0].y==food.y){
        foodSound.play();
        snkArr.unshift({x:snkArr[0].x+inputDir.x,  y:snkArr[0].y+inputDir.y})

        score+=10;
        scoreid.innerHTML=`Your Score: ${score}`;

        // Updating High Score
        if(highScore==null||highScore<score)
        {
            highScore=score;
            localStorage.setItem("HighestScore", highScore);
        }
        highscoreid.innerHTML=`High Score: ${highScore}`

        // console.log(score);
        food={x:Math.round(2+15*Math.random()),y:Math.round(2+15*Math.random())}
    }

    //Moving the snake
    for (let i = snkArr.length-2; i >=0 ; i--) {
         snkArr[i+1]={...snkArr[i]};
        
    }
    snkArr[0].x+=inputDir.x;
    snkArr[0].y+=inputDir.y;



    // Part 2: Display the food and snake 
    // Display the snake
    board.innerHTML = '';
    snkArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}










// Main logic starts here
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }  // Start the game
    move.play();
    // console.log(e.key);

    switch (e.keyCode) {
        case 37:
            inputDir.x =-1;
            inputDir.y =0;
            break;
        case 38:
            inputDir.x =0;
            inputDir.y =-1;
            break;
        case 39:
            inputDir.x =1;
            inputDir.y =0;
            break;
        case 40:
            inputDir.x =0;
            inputDir.y =1;
            break;

        default:
            break;
    }


})
 
