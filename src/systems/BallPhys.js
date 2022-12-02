export class BallPhys {
  constructor(app) {
    this.app = app
  }

  loop(delta) {
    const { entities } = this.app.game
    const entity = entities[0]
    if (entity) {
      entity.x += entity.dx
      entity.y += entity.dy
      // wall collision
      if (entity.x + entity.size > entity.width || entity.x - entity.size < 0) {
        // right and left
        entity.dx *= -1
      }
      if (
        entity.y + entity.size > entity.height ||
        entity.y - entity.size < 0
      ) {
        // top and bottom
        entity.dy *= -1
      }
    }

    // for (let i = 0; i < entities.length; i++) {
    //   const entity = entities[i]
    //   const { dummy } = entity
    //   console.log(dummy)
    // if (dummy) {
    //   entity.x += dummy.vx * delta
    //   entity.y += dummy.vy * delta
    //   if (entity.x < 0) {
    //     entity.x = -entity.x
    //     dummy.vx = -dummy.vx
    //   }
    //   if (entity.x > 720) {
    //     entity.x = 720 * 2 - entity.x
    //     dummy.vx = -dummy.vx
    //   }
    //   if (entity.y < 0) {
    //     entity.y = -entity.y
    //     dummy.vy = -dummy.vy
    //   }
    //   if (entity.y > 1280) {
    //     entity.y = 1280 * 2 - entity.y
    //     dummy.vy = -dummy.vy
    //   }
    // }
    // }
  }

  entityAdded(entity) {}

  entityRemoved(entity) {}
}
