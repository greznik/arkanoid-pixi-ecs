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
  }

  entityAdded(entity) {}

  entityRemoved(entity) {}
}
