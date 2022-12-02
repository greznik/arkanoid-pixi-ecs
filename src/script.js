import * as PIXI from 'pixi.js'
const app = new PIXI.Application({
  width: 800,
  height: 600,
  antialias: true,
  backgroundColor: '#FFFFFF',
})
document.body.appendChild(app.view)
const size = {
  width: app.view.width,
  height: app.view.height,
}
const container = new PIXI.Container()
const graphics = new PIXI.Graphics()
container.addChild(graphics)
app.stage.addChild(container)

let score = 0
const brickRowCount = 9
const brickColumnCount = 5

// Elements
const ball = {
  x: size.width / 2,
  y: size.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
}
const paddle = {
  x: size.width / 2 - 40,
  y: size.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
}

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
}

const bricks = []
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = []
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
    bricks[i][j] = { x, y, ...brickInfo }
  }
}

// Create Elements

function drawBall() {
  graphics.beginFill()
  graphics.drawCircle(ball.x, ball.y, ball.size, 0)
  graphics.endFill()
}

function drawPaddle() {
  graphics.beginFill()
  graphics.drawRect(paddle.x, paddle.y, paddle.w, paddle.h)
  graphics.endFill()
}

// function drawScore() {
//   const text = new PIXI.Text(`Score: ${score}`)
//   text.x = size.width - 100
//   text.y = 30
//   container.addChild(text)
// }

function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (!brick.visible) {
        graphics.beginFill('#000000', 0)
      } else {
        graphics.beginFill('#000000')
      }
      graphics.drawRect(brick.x, brick.y, brick.w, brick.h)
      graphics.endFill()
    })
  })
}

// Animate Elements
function movePaddle() {
  paddle.x += paddle.dx
  if (paddle.x + paddle.w > size.width) paddle.x = size.width - paddle.w
  if (paddle.x < 0) paddle.x = 0
}

function moveBall() {
  ball.x += ball.dx
  ball.y += ball.dy
  // wall collision
  if (ball.x + ball.size > size.width || ball.x - ball.size < 0) {
    // right and left
    ball.dx *= -1
  }
  if (ball.y + ball.size > size.height || ball.y - ball.size < 0) {
    // top and bottom
    ball.dy *= -1
  }
  // paddle
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed
  }
  // bricks
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1
          brick.visible = false
          increaseScore()
        }
      }
    })
  })

  // game over
  if (ball.y + ball.size > size.height) {
    showAllBricks()
    score = 0
  }
}

function increaseScore() {
  score++
  if (score % (brickRowCount * brickRowCount) === 0) {
    // no remainder
    showAllBricks()
  }
}

function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true))
  })
}

function mouseMoveHandler(e) {
  paddle.x = e.clientX - paddle.w
}

function draw() {
  // clear
  graphics.clear()
  // draw
  drawBall()
  drawPaddle()
  drawBricks()
  // drawScore()
}
function update() {
  // draw
  draw()
  // update
  movePaddle()
  moveBall()
  requestAnimationFrame(update)
}

document.addEventListener('mousemove', mouseMoveHandler, false)

update()
