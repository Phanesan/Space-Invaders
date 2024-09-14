class Player extends GameObject {

    constructor(gameState, name, x, y, width, height, asset = null) {
        super(gameState, name, x, y, width, height, asset);

        this.speedX = 3;
        this.speedY = 2.5;
        this.health = 100;

        this.lastX = x;
        this.lastY = y;

        this.playerAsset = new GifDrawer(this.gameState.gameManager.ctx, this.asset, this.x, this.y, this.width, this.height, 100, 1)
        this.gameState.addGif(this.playerAsset);

        this.cooldownShot = 600;
        this.lastShotTime = 0;

        this.healthBar = new HealthBar(this.gameState, "healthBar", this.x - 10, this.y - 15, 80, 8, "green", this.health);
    }

    update() {

        this.healthBar.update(this.health, this.x-10, this.y-15);

        this.gameState.gameManager.keyManager.keys.forEach((key) => {
            if(key === "KeyD") {
                if(this.x + this.width <= this.gameState.gameManager.DOC.width) {
                    this.x += this.speedX;
                }
            } else if(key === "KeyA") {
                if(this.x > 0) {
                    this.x -= this.speedX;
                }
            } else if(key === "KeyW") {
                if(this.y > 0) {
                    this.y -= this.speedY;
                }
            } else if(key === "KeyS") {
                if(this.y + this.height <= this.gameState.gameManager.DOC.height) {
                    this.y += this.speedY;
                }
            } else if(key === 0) {
                // Cooldown de disparo
                if(this.cooldownShot <= 0 || Date.now() - this.lastShotTime >= this.cooldownShot) {
                    this.lastShotTime = Date.now();
                    this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png"));
                }
            }
        });
        this.playerAsset.setX(this.x);
        this.playerAsset.setY(this.y);
    }

    paint() {
        this.healthBar.paint();
    }

    collision(other) {}
}