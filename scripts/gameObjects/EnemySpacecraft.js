class EnemySpacecraft extends GameObject {

    constructor(gameState, name, x, y, width, height, asset = null, health = 100) {
        super(gameState, name, x, y, width, height, asset);

        this.health = health;

        this.lastY = y;
        this.y = -100

        this.enemyAsset = null;
        this.cooldownShot = 0;

        if(this.name === "normal") {
            this.enemyAsset = new GifDrawer(this.gameState.gameManager, this.asset, this.x, this.y, this.width, this.height, 120, 2, 180);
            this.cooldownShot = 1800;
        } else if(this.name === "enemyCruiser") {
            this.enemyAsset = new GifDrawer(this.gameState.gameManager, this.asset, this.x, this.y, this.width, this.height, 100, 4, 180);
            this.cooldownShot = 1300;
        } else if(this.name === "enemyDestroyer") {
            this.enemyAsset = new GifDrawer(this.gameState.gameManager, this.asset, this.x, this.y, this.width, this.height, 130, 2, 0);
            this.cooldownShot = 1100;
        }
        this.gameState.addGif(this.enemyAsset);
        this.lastShotTime = Date.now()+300;
        
        this.acceleration = 2;
        this.initialVelocity = 0;
        this.accelerationTime = 2000;
        this.decelerationTime = 200;
        this.accelerationProgress = 0;
        this.velocity = 0;

        this.nextDistanceMove = this.acceleration;

        this.executedTask = false;
        this.executedTaskLanding = false;
        this.spawnLanding = true;

    }

    update() {
        if(this.spawnLanding && this.executedTaskLanding === false) {
            this.gameState.addAnimation(new GameAnimation("enemyLanding", this.gameState, Math.floor(Math.random() * (1100 - 300 + 1)) + 300, (data) => {
                this.y+=3
                this.enemyAsset.y = this.y;
                this.executedTaskLanding = true;
            }, undefined,
            () => {
                this.spawnLanding = false;
            }
            ));
        }

        if(this.spawnLanding === false) {
            this.movement();
            
            this.enemyAsset.x = this.x;
    
            // Cooldown de disparo del enemigo (dispara de forma automatica)
            if(this.cooldownShot <= 0 || Date.now() - this.lastShotTime >= this.cooldownShot) {
                this.lastShotTime = Date.now();
                playSound("./assets/audios/laser_shot.ogg", 0.1);
                if(this.name === "normal") {
                    this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 18, 18, "./assets/bullet_enemy.png", this.name, 10, 3, 90));
                } else if(this.name === "enemyCruiser") {
                    this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 18, 18, "./assets/bullet_enemy.png", this.name, 10, 3, 70, 20));
                    this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 18, 18, "./assets/bullet_enemy.png", this.name, 10, 3, 110, 340));
                } else if(this.name === "enemyDestroyer") {
                    this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 18, 18, "./assets/bullet_enemy.png", this.name, 10, 3, 90, 0));
                    this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 18, 18, "./assets/bullet_enemy.png", this.name, 10, 3, 100, 350));
                    this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 18, 18, "./assets/bullet_enemy.png", this.name, 10, 3, 110, 340));
                    this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 18, 18, "./assets/bullet_enemy.png", this.name, 10, 3, 80, 10));
                    this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 18, 18, "./assets/bullet_enemy.png", this.name, 10, 3, 70, 20));
                }
            }
    
            this.gameState.gameObjects.forEach((obj) => {
                if(obj !== this && this.intersects(obj)) {
                    this.collision(obj);
                }
            })
    
            if(this.health <= 0) {
                this.gameState.gameManager.eventManager.triggerEvent("onEnemyDestroyed", this);
                playSound("./assets/audios/spacecraft_destroyed.ogg", 0.4);
            }
        }
    }

    paint() {

    }

    collision(other) {
        console.log(`other: ${other.sourceEntity} | this: ${this.name}`);
        switch(other.name) {
            case "bulletFired":
                if(other.sourceEntity === "player") {
                    this.health -= other.damageBullet;
                    this.gameState.destroyGameObject(other.ID);
                    playSound("./assets/audios/hit_enemy.ogg", 0.7);
                    switch(this.name) {
                        case "normal":
                            this.gameState.score+=10;
                            break;
                        case "enemyCruiser":
                            this.gameState.score+=30;
                            break;
                        case "enemyDestroyer":
                            this.gameState.score+=50;
                            break;
                    }
                }
                break;
        }
    }

    movement() {
        this.x += this.nextDistanceMove;

        if(this.x > (this.gameState.gameManager.DOC.width - this.width) - 300 && !this.executedTask) {
            this.gameState.gameManager.executeCodeOnce(() => {
                this.gameState.addAnimation(new GameAnimation("RightMoveStoping",
                    this.gameState,
                    1000,
                    (data) => {
                        this.velocity = (this.initialVelocity - this.acceleration * data.progress) + this.acceleration;
                        this.nextDistanceMove = this.velocity
                    },
                    undefined,
                    new GameAnimation("RightMoveLeaving",
                        this.gameState,
                        1100,
                        (data) => {
                            this.velocity = (this.initialVelocity - this.acceleration * data.progress);
                            this.nextDistanceMove = this.velocity
                        },
                        undefined,
                        () => {
                            this.executedTask = false;
                        }
                    )
                ));
            })
            this.executedTask = true;
        } else if(this.x < 300 && !this.executedTask) {
            this.gameState.gameManager.executeCodeOnce(() => {
                this.gameState.addAnimation(new GameAnimation("LeftMoveStoping",
                    this.gameState,
                    1000,
                    (data) => {
                        this.velocity = (this.initialVelocity + this.acceleration * data.progress) - this.acceleration;
                        this.nextDistanceMove = this.velocity
                    },  
                    undefined,
                    new GameAnimation("LeftMoveLeaving",
                        this.gameState,
                        1300,
                        (data) => {
                            this.velocity = (this.initialVelocity + this.acceleration * data.progress);
                            this.nextDistanceMove = this.velocity
                        },
                        undefined,
                        () => {
                            this.executedTask = false;
                        }
                    )
                ));
            })
            this.executedTask = true;
        }
    }

}