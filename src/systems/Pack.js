import * as PIXI from 'pixi.js'
import { First } from '../levels/First'

export class Pack {
  constructor(app) {
    this.app = app
    this.loader = new PIXI.Loader()
  }

  afterLoad() {
    this.ballTex = this.loader.resources.ball.texture
  }

  start() {
    const { app } = this
    const { game } = app

    this.loader.add('ball', 'ball.png').load(() => {
      this.afterLoad()
      game.initLevel(new First())
    })
  }
}
