class EnemySpacecraft extends GameObject {

    constructor(gameState, name, x, y, width, height, asset = null, health = 100) {
        super(gameState, name, x, y, width, height, asset);

        this.health = health;
        this.lastX = x;
        this.lastY = y;

        this.enemyAsset = new GifDrawer(this.gameState, this.asset, this.x, this.y, this.width, this.height, 120, 2, 180);
        this.gameState.addGif(this.enemyAsset);

        this.cooldownShot = 1500;
        this.lastShotTime = 0;
    }

    update() {
        this.enemyAsset.setX(this.x);
        this.enemyAsset.setY(this.y);

        // Cooldown de disparo del enemigo (dispara de forma automatica)
        if(this.cooldownShot <= 0 || Date.now() - this.lastShotTime >= this.cooldownShot) {
            this.lastShotTime = Date.now();
            playSound("./assets/audios/laser_shot.ogg", 0.15);
            this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png", 10, 8));
        }

        this.gameState.gameObjects.forEach((obj) => {
            if(obj !== this && this.intersects(obj)) {
                this.collision(obj);
            }
        })

        if(this.health <= 0) {
            this.gameState.gameManager.eventManager.triggerEvent("onEnemyDestroyed", this);
        }
    }

    paint() {

    }

    collision(other) {
        switch(other.name) {
            case "bulletFired":
                this.health -= other.damageBullet;
                this.gameState.destroyGameObject(other.ID);
                break;
        }
    }

}