class BulletFired extends GameObject {

    constructor(gameState, name, x, y, width, height, asset = null) {
        super(gameState, name, x, y, width, height, asset);

        this.speed = 6;

        this.asset = new Image();
        this.asset.src = asset;

        this.x = this.x - (this.width / 2);
    }

    update() {
        this.y-= this.speed;

        if(this.y <= -50) {
            this.gameState.destroyGameObject(this);
        }
    }

    paint() {
        this.gameState.gameManager.ctx.drawImage(this.asset, this.x, this.y, this.width, this.height);
    }

    collision(other) {}

}