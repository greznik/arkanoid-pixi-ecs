import { Entity } from '../Entity'
import { Level } from './Level'

export class First extends Level {
  constructor(json) {
    super(json)
  }

  init(app) {
    const { game } = app

    const { width, height } = app.view
    const ball = new Entity({
      width: width,
      height: height,
      x: width / 2,
      y: height / 2,
      size: 1,
      speed: 4,
      dx: 4,
      dy: -4,
      spriteTex: app.pack.ballTex,
    })
    const brick = new Entity({
      width: width,
      height: height,
      x: width / 2,
      y: height / 2,
      size: 1,
      speed: 4,
      dx: 4,
      dy: -4,
      spriteTex: app.pack.ballTex,
    })
    game.add(ball)
  }
}
