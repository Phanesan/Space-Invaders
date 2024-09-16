class Player extends GameObject {

    constructor(gameState, name, x, y, width, height, asset = null) {
        super(gameState, name, x, y, width, height, asset);
        
        this.lastTime = Date.now();
        this.deltaTime = 0;

        this.speedX = 430;
        this.speedY = 390;
        this.health = 100;
        this.maxHealth = this.health;
        this.damageByShot = 10;

        this.lastX = x;
        this.lastY = y;

        this.playerAsset = new GifDrawer(this.gameState.gameManager, this.asset, this.x, this.y, this.width, this.height, 100, 1)
        this.gameState.addGif(this.playerAsset);

        this.cooldownShot = 600;
        this.lastShotTime = 0;
        this.levelSpacecraft = 0; // Nivel 0,1,2,3,4
        this.levelUpProgress = 0;
        this.levelUpGoal = 40;

        this.cooldownDmgTaken = 1200;
        this.lastDmgTaken = 0;

        this.healthBar = new HealthBar(this.gameState, "healthBar", this.x - 10, this.y - 15, 80, 8, "green", this.health);
    }

    update() {
        const currentTime = Date.now();
        this.deltaTime = (currentTime - this.lastTime)/1000;
        this.lastTime = currentTime;

        this.healthBar.update(this.health, this.x-10, this.y-15, this.maxHealth);
        
        if(this.levelUpProgress >= this.levelUpGoal) {
            if(this.levelSpacecraft < 5) {
                this.levelSpacecraft++;
                switch(this.levelSpacecraft) {
                    case 1: {
                        this.levelUpGoal = 60;
                        this.levelUpProgress = 0;
                        break;
                    }
                    case 2: {
                        this.levelUpGoal = 100
                        this.levelUpProgress = 0;
                        break;
                    }
                    case 3: {
                        this.levelUpGoal = 150
                        this.levelUpProgress = 0;
                        break;
                    }
                    case 4: {
                        this.levelUpGoal = 200
                        this.levelUpProgress = 200;
                        break;
                    }
                }
            }
        }

        this.gameState.gameManager.keyManager.keys.forEach((key) => {
            if(!this.gameState.enemyWaveSystem.win) {
                console.log(this.speedX * this.deltaTime)
                if(key === "KeyD") {
                    if(this.x + this.width <= this.gameState.gameManager.DOC.width) {
                        this.x += this.speedX * this.deltaTime;
                    }
                } else if(key === "KeyA") {
                    if(this.x > 0) {
                        this.x -= this.speedX * this.deltaTime;
                    }
                } else if(key === "KeyW") {
                    if(this.y > 0) {
                        this.y -= this.speedY * this.deltaTime;
                    }
                } else if(key === "KeyS") {
                    if(this.y + this.height <= this.gameState.gameManager.DOC.height) {
                        this.y += this.speedY * this.deltaTime;
                    }
                } else if(key === 0) {
                    // Cooldown de disparo
                    if(this.cooldownShot <= 0 || Date.now() - this.lastShotTime >= this.cooldownShot) {
                        this.lastShotTime = Date.now();
                        playSound("./assets/audios/laser_shot.ogg", 0.3);
                        if(this.levelSpacecraft === 0) {
                            this.cooldownShot = 600;
                            this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png", this.name, this.damageByShot, 6, 270, 0));
                        } else if(this.levelSpacecraft === 1) {
                            this.cooldownShot = 400;
                            this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png", this.name, this.damageByShot, 6, 270, 0));
                        } else if(this.levelSpacecraft === 2) {
                            this.cooldownShot = 360;
                            this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 3), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png", this.name, this.damageByShot, 6, 270, 0));
                            this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 3) + (this.width / 3), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png", this.name, this.damageByShot, 6, 270, 0));
                        } else if(this.levelSpacecraft === 3) {
                            this.cooldownShot = 250;
                            this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png", this.name, this.damageByShot, 6, 270, 0));
                            this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png", this.name, this.damageByShot, 6, 260, 350));
                            this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png", this.name, this.damageByShot, 6, 280, 10));
                        } else if(this.levelSpacecraft >= 4) {
                            this.cooldownShot = 150;
                            this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png", this.name, this.damageByShot, 6, 270, 0));
                            this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png", this.name, this.damageByShot, 6, 260, 350));
                            this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png", this.name, this.damageByShot, 6, 280, 10));
                            this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png", this.name, this.damageByShot, 6, 250, 340));
                            this.gameState.addGameObject(new BulletFired(this.gameState, "bulletFired", this.x + (this.width / 2), this.y + (this.height / 2) - 30, 8, 36, "./assets/bullet.png", this.name, this.damageByShot, 6, 290, 20));
                        }
                    }
                }
            }
        });
        this.playerAsset.setX(this.x);
        this.playerAsset.setY(this.y);

        this.gameState.gameObjects.forEach((obj) => {
            if(obj !== this && this.intersects(obj)) {
                this.collision(obj);
            }
        })

        if(this.health <= 0) {
            this.gameState.gameManager.eventManager.triggerEvent("onPlayerDestroyed", this);
            playSound("./assets/audios/death.ogg");
        }
    }

    paint() {
        this.healthBar.paint();
    }

    collision(other) {
        switch(other.name) {
            case "bulletFired":
                if(other.sourceEntity !== this.name) {
                    if(this.cooldownDmgTaken <= 0 || Date.now() - this.lastDmgTaken >= this.cooldownDmgTaken) {
                        this.lastDmgTaken = Date.now();
                        this.health -= other.damageBullet;
                        this.gameState.destroyGameObject(other.ID);
                        playSound("./assets/audios/hit.ogg");
                        if(this.levelSpacecraft > 0) {
                            this.levelSpacecraft -= 1;
                            //console.log(`level: ${this.levelSpacecraft}, progress: ${this.levelUpProgress}, goal: ${this.levelUpGoal}`);

                            switch(this.levelSpacecraft) {
                                case 0: {
                                    this.levelUpGoal = 40;
                                    this.levelUpProgress = 0;
                                    break;
                                }
                                case 1: {
                                    this.levelUpGoal = 60;
                                    this.levelUpProgress = 0;
                                    break;
                                }
                                case 2: {
                                    this.levelUpGoal = 100
                                    this.levelUpProgress = 0;
                                    break;
                                }
                                case 3: {
                                    this.levelUpGoal = 150
                                    this.levelUpProgress = 0;
                                    break;
                                }
                                case 4: {
                                    this.levelUpGoal = 200
                                    this.levelUpProgress = 0;
                                    break;
                                }
                            }
                        }
                    }
                }
                break;
            case "enemyDestroyer":
            case "enemyCruiser":
            case "normal":
                if(this.cooldownDmgTaken <= 0 || Date.now() - this.lastDmgTaken >= this.cooldownDmgTaken) {
                    this.lastDmgTaken = Date.now();
                    this.health -= 20;
                    playSound("./assets/audios/hit.ogg");
                }
                break;
            case "star":
                if(this.levelSpacecraft < 5) {
                    this.levelUpProgress+=other.amountOfProgress;
                }
                this.gameState.destroyGameObject(other.ID);
                this.gameState.destroyGif(other.asset);
                break;
        }
    }
}