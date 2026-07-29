let board = document.querySelector(".board");
let modal = document.querySelector(".modal")
let stbtn = document.querySelector(".btn")

let restartmodal = document.querySelector(".modalreset")
let rebtn = document.querySelector(".btnrestart")


let scoreele = document.querySelector("#score")
let highscoreele = document.querySelector("#highscore")
let timeele = document.querySelector("#time")

let timeend = null
let time = 0

score = 0
highscore = 0
highscore = localStorage.getItem("highscore") || 0
highscoreele.textContent = highscore

let blockw = 50;
let blockh = 50;

let cols = Math.floor(board.clientWidth / blockw);
let rows = Math.floor(board.clientHeight / blockh);

let endinterval = null;
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
let blocks = {}
let snake = [
    {
        x: 4,
        y: 13
    },
]


for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let block = document.createElement("div")
        block.classList.add("block")
        board.appendChild(block)
        // assigning the value to blocks
        blocks[`${row}-${col}`] = block
    }

}

//main render function to show snake by the condinates
function render() {
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })


}


function startTimer() {

    clearInterval(timeend);

    time = 0;
    timeele.textContent = time;

    timeend = setInterval(() => {
        time++;
        timeele.textContent = time;
    }, 1000);

}
render()

let direction = ""

function startgame() {

    endinterval = setInterval(() => {
        let head;

        // random food appear by the blocks condinates

        let onSnake = false
        snake.forEach(segment => {
            if (segment.x === food.x && segment.y === food.y) {
                onSnake = true
            }
        })


        if (onSnake === false) {
            blocks[`${food.x}-${food.y}`].classList.add("food")

        }



        if (direction === "") return
        if (direction === "left") {

            head = {
                x: snake[0].x,
                y: snake[0].y - 1
            }

        } else if (direction === "right") {

            head = {
                x: snake[0].x,
                y: snake[0].y + 1
            }

        } else if (direction === "down") {

            head = {
                x: snake[0].x + 1,
                y: snake[0].y
            }

        } else if (direction === "up") {

            head = {
                x: snake[0].x - 1,
                y: snake[0].y
            }

        }



        // the fencing area if the snake get out of the board so gamme will restart

        if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
            restartmodal.style.display = "block"
            clearInterval(endinterval)
            clearInterval(timeend)
        }


        // if the snake head has hit any body part
        snake.forEach(segment => {
            if (segment.x === head.x && segment.y == head.y) {
                restartmodal.style.display = "block"
                clearInterval(endinterval)
                clearInterval(timeend)
            }

        })




        // snake ate and get bigger and food accure again on random place

        if (head.x === food.x && head.y === food.y) {
            blocks[`${food.x}-${food.y}`].classList.remove("food") // for  food remove
            food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) } // for fod reaccureance
            snake.unshift(head) // for add the head to snake each time 

            score += 10
            scoreele.textContent = score

            if (score > highscore) {
                highscore = score
                localStorage.setItem("highscore", highscore.toString())
            }

        }




        snake.forEach(segment => {
            blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
        })
        snake.unshift(head)
        snake.pop()
        render();

    }, 300)

}




rebtn.addEventListener("click", () => {

    clearInterval(timeend)

    // this is for removing the snake and food
    Object.values(blocks).forEach(b => b.classList.remove("fill", "food"))

    restartmodal.style.display = "none"

    // regetting the food and snake
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
    snake = [
        {
            x: 4,
            y: 13
        },
    ]


    score = 0
    scoreele.textContent = score
    highscoreele.textContent = highscore
    timeele.textContent = time;

    startTimer()



    direction = "right"
    // again start the interval/game
    startgame()
    // render again the snake
    render()

})



// the starter interface 
stbtn.addEventListener("click", () => {
    modal.style.display = "none";
    direction = "right";
    startgame()

    startTimer()
});

// here we are giving the direation with commands so direation can give direation to head and snake head cna move
addEventListener("keydown", (e) => {


    if (e.key === "ArrowLeft" && direction !== "right") {
        direction = "left"

    } else if (e.key === "ArrowRight" && direction !== "left") {
        direction = "right"
    } else if (e.key === "ArrowUp" && direction !== "down") {
        direction = "up"
    } else if (e.key === "ArrowDown" && direction !== "up") {
        direction = "down"
    }


})