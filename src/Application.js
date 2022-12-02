import * as PIXI from 'pixi.js'
import { BallPhys } from './systems/BallPhys'
import { Game } from './systems/Game'
import { Pack } from './systems/Pack'
import { Visual } from './systems/Visual'

export class Application {
  constructor() {
    this.renderer = new PIXI.Renderer({
      width: 800,
      height: 600,
      backgroundColor: 0xffc0cb,
    })
    this.root = new PIXI.Container()

    this.ticker = new PIXI.Ticker()
    this.ticker.add(() => {
      this.render()
    }, -25)

    this.runners = {
      entityAdded: new PIXI.Runner('entityAdded'),
      entityRemoved: new PIXI.Runner('entityRemoved'),
      loop: new PIXI.Runner('loop'),
    }

    this.addSystem('game', Game)
    this.addSystem('pack', Pack)
    this.addSystem('visual', Visual)
    this.addSystem('ballPhys', BallPhys)
  }

  addSystem(name, classRef) {
    this[name] = new classRef(this)
    for (let key in this.runners) {
      this.runners[key].add(this[name])
    }
  }

  get view() {
    return this.renderer.view
  }

  start() {
    this.ticker.start()
    this.pack.start()
  }

  render() {
    this.renderer.render(this.root)
  }

  destroy() {
    this.ticker.destroy()
    this.renderer.destroy()
  }
}
