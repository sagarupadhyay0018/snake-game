let board = document.querySelector(".board");
let restartbtn = document.querySelector(".btnrestart")
let modalrestart = document.querySelector(".modalreset")

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
let direaction = ""

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row}-${col}`] = block
    }
}


function render() {
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })
}

render()





// ⬇️ wrapped your interval code in a function so it can be called again on restart
function startGame() {

    endinterval = setInterval(() => {

        blocks[`${food.x}-${food.y}`].classList.add("food")


        // the direaction control 

        let head;

        if (direaction === "") return

        if (direaction === "left") {

            head = {
                x: snake[0].x,
                y: snake[0].y - 1
            }

        } else if (direaction === "right") {

            head = {
                x: snake[0].x,
                y: snake[0].y + 1
            }

        } else if (direaction === "down") {

            head = {
                x: snake[0].x + 1,
                y: snake[0].y
            }

        } else if (direaction === "up") {

            head = {
                x: snake[0].x - 1,
                y: snake[0].y
            }

        }



        if (head.x === food.x && head.y === food.y) {

            blocks[`${food.x}-${food.y}`].classList.remove("food")
            food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
            blocks[`${food.x}-${food.y}`].classList.add("food")
            snake.unshift(head)
        }

        // the fencing for the snake 

        if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
            clearInterval(endinterval)
            modalrestart.style.display = "block"
            return
        }



        snake.forEach(segment => {
            blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
        })
        snake.unshift(head)
        snake.pop()

        render()

    }, 300)

}

startGame()


// the direaction commands form the keyboard

addEventListener("keydown", (e) => {

    if (e.key === "ArrowUp") {
        direaction = "up"
    } else if (e.key === "ArrowDown") {
        direaction = "down"
    } else if (e.key === "ArrowLeft") {
        direaction = "left"
    } else if (e.key === "ArrowRight") {
        direaction = "right"
    }

})



let modal = document.querySelector(".modal")
let btn = document.querySelector(".btn")

btn.addEventListener("click", function (e) {
    modal.style.display = "none"
    direaction = "right"

})


restartbtn.addEventListener("click", restartfunction)



function restartfunction() {
    modalrestart.style.display = "none"

    // ⬇️ clear old snake/food visuals off the board
    Object.values(blocks).forEach(b => b.classList.remove("fill", "food"))

    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
    snake = [
        {
            x: 4,
            y: 13
        },
    ]

    // ⬇️ reset direction so it doesn't move instantly / uses last direction
    direaction = ""

    // ⬇️ draw the fresh snake and restart the loop
    render()
    startGame()

}