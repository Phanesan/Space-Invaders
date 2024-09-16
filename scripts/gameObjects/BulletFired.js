class BulletFired extends GameObject {

    constructor(gameState, name, x, y, width, height, asset = null, sourceEntity, damageBullet, speed, angleShot = 0, angleDraw = 0) {
        super(gameState, name, x, y, width, height, asset);
        this.sourceEntity = sourceEntity;

        this.angleShot = (angleShot) * Math.PI / 180;
        this.angleDraw = angleDraw;
        this.speed = speed;

        this.asset = new Image();
        this.asset.src = asset;
        this.damageBullet = damageBullet;

        this.x = this.x - (this.width / 2);

        this.dx = 0;
        this.dy = 0;
    }

    update() {
        this.dx = this.speed * Math.cos(this.angleShot);
        this.dy = this.speed * Math.sin(this.angleShot);
        this.x += this.dx;
        this.y += this.dy;

        this.rotationAngle = Math.atan2(this.dy, this.dx);
        
        this.gameState.gameObjects.forEach((obj) => {
            if(obj !== this && this.intersects(obj)) {
                this.collision(obj);
            }
        })

        if(this.y <= -50 || this.y >= this.gameState.gameManager.DOC.height+50) {
            this.gameState.destroyGameObject(this.ID);
        }

    }

    paint() {
        //this.gameState.gameManager.ctx.drawImage(this.asset, this.x, this.y, this.width, this.height);
        drawImage(this.gameState.gameManager.ctx, this.asset, this.x, this.y, this.width, this.height,this.angleDraw);
    }

    collision(other) {}

}