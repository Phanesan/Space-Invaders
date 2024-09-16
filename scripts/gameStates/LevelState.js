class LevelState extends GameState {

    constructor(gameManager, level = 1) {
        super(gameManager);
        this.initEvents();
        this.level = level;
        this.enemyWaveSystem = new EnemyWaves(this);
        this.gameOver = false;
        this.score = 0;
        this.soundtrack = null;

        this.starUI = new GifDrawer(this.gameManager, "./assets/star/", 15, 18, 40, 40, 1400, 7);
        this.addGif(this.starUI);

        if(this.level === 1) {
            this.soundtrack = new Soundtrack(this, "./assets/audios/level_1.ogg", 16.340, 0.25);
        }

        // Fondo
        const stars = {
            0: { x: 221, y: 89 },
            1: { x: 125, y: 335 },
            2: { x: 404, y: 277 },
            3: { x: 289, y: 564 },
            4: { x: 622, y: 510 },
            5: { x: 264, y: 720 },
            6: { x: 599, y: 701 },
            7: { x: 1016, y: 732 },
            8: { x: 1337, y: 588 },
            9: { x: 849, y: 551 },
            10: { x: 1054, y: 353 },
            11: { x: 784, y: 256 },
            12: { x: 1159, y: 97 },
            13: { x: 1357, y: 275 },
            14: { x: 1085, y: 218 },
            15: { x: 610, y: 91 },
            16: { x: 848, y: 111 },
            17: { x: 688, y: 489 },
            18: { x: 895, y: 782 },
            19: { x: 480, y: 805 },
            20: { x: 1594, y: 80 },
            21: { x: 1742, y: 404 },
            22: { x: 1526, y: 435 },
            23: { x: 1705, y: 768 },
            24: { x: 1361, y: 787 },
            25: { x: 81, y: 771 },
            26: { x: 1103, y: 546 },
        }
        // Animacion del fondo
        this.addAnimation(new GameAnimation("background", this, 6000, (data) => {

            for(let i = 0; i <= 26; i++) {
                const star = stars[i];
                drawRect(this.gameManager.ctx, star.x, star.y, 6, 6, "#c8fff8", 0.3);
                star.y += 4;
                if(star.y > this.gameManager.DOC.height) {
                    star.y = 0;
                }
            }
        }, undefined, undefined, true));

        // Nave jugador
        this.player = new Player(this, "player", this.gameManager.DOC.width / 2, this.gameManager.DOC.height / 2 + 360, 60, 40, "./assets/spacecraft/");
        this.addGameObject(this.player);

        this.levelUpProgressBar = new HealthBar(this, "levelUpProgressBar", 20, 20, 200, 40, "yellow", this.player.levelUpProgress);

        this.gameManager.executeCodeOnce(() => {
            this.soundtrack.play();
        })

        this.currentTime = 0;
        this.startTime = Date.now();
        this.elapsedTime = 0;
    }

    update() {
        if(!this.gameOver && !this.enemyWaveSystem.win) {
            this.currentTime = Date.now();
            this.elapsedTime = (this.currentTime - this.startTime) / 1000;

            this.levelUpProgressBar.update(this.player.levelUpProgress, 70, 20, this.player.levelUpGoal);
    
            this.enemyWaveSystem.update();
        }
        this.soundtrack.update();
    
        //console.log(this.gameObjects);
        this.gameObjects.forEach((obj) => {
            obj.update();
        });
    }

    paint() {
        this.animations.forEach((animation) => {
            animation.animate();
        });

        this.gameObjects.forEach((obj) => {
            obj.paint();

            // mostrar colisiones
            if(this.gameManager.debug) {
                drawSquare(this.gameManager.ctx, obj.x, obj.y, obj.width, obj.height, "red");
            }
        });

        this.gifs.forEach((gif) => {
            gif.draw();
        });

        this.UI();
    }

    UI() {
        this.levelUpProgressBar.paint();

        drawText(this.gameManager.ctx, "Oleada: " + this.enemyWaveSystem.currentWave + "/" + this.enemyWaveSystem.totalWaves, 230, this.gameManager.DOC.height - 30, 40, "space_invaders_text", "white", "right");
    
        if(this.gameOver) {
            drawRect(this.gameManager.ctx, 0,0, this.gameManager.DOC.width, this.gameManager.DOC.height, "black", 0.4);
            drawText(this.gameManager.ctx, "GAME OVER", this.gameManager.DOC.width / 2, this.gameManager.DOC.height / 2 - 200, 60, "space_invaders", "white");
            drawText(this.gameManager.ctx, `Tiempo: ${Math.floor(this.elapsedTime)}`, this.gameManager.DOC.width / 2, this.gameManager.DOC.height / 2 - 130, 30, "space_invaders_text", "white", "center", "middle", 0, "transparent");
            drawText(this.gameManager.ctx, `Puntaje: ${this.score}`, this.gameManager.DOC.width / 2, this.gameManager.DOC.height / 2 - 80, 30, "space_invaders_text", "white", "center", "middle", 0, "transparent");
            drawText(this.gameManager.ctx, "Recargue la pagina para jugar denuevo", this.gameManager.DOC.width / 2, this.gameManager.DOC.height / 2, 30, "space_invaders_text", "white", "center", "middle", 0, "transparent");
        } else if(this.enemyWaveSystem.win) {
            drawRect(this.gameManager.ctx, 0,0, this.gameManager.DOC.width, this.gameManager.DOC.height, "black", 0.4);
            drawText(this.gameManager.ctx, "OLEADAS COMPLETADAS", this.gameManager.DOC.width / 2, this.gameManager.DOC.height / 2 - 200, 60, "space_invaders", "white");
            drawText(this.gameManager.ctx, `Tiempo: ${Math.floor(this.elapsedTime)}`, this.gameManager.DOC.width / 2, this.gameManager.DOC.height / 2 - 130, 30, "space_invaders_text", "white", "center", "middle", 0, "transparent");
            drawText(this.gameManager.ctx, `Puntaje: ${this.score}`, this.gameManager.DOC.width / 2, this.gameManager.DOC.height / 2 - 80, 30, "space_invaders_text", "white", "center", "middle", 0, "transparent");
            drawText(this.gameManager.ctx, "Recargue la pagina para jugar denuevo", this.gameManager.DOC.width / 2, this.gameManager.DOC.height / 2, 30, "space_invaders_text", "white", "center", "middle", 0, "transparent");
        }
    }

    initEvents() {}

    onPause() {
        this.soundtrack.audioSource.pause();
        this.gifs.forEach((gif) => {
            gif.pause();
        });
    }

    onResume() {
        this.soundtrack.audioSource.play();
        this.gifs.forEach((gif) => {
            gif.resume();
        });
    }

    spawnEnemy(type, x = Math.floor(Math.random()*((this.gameManager.DOC.width-380)-380+1)) + 320) {
        switch(type) {
            case "enemySpacecraft":
                this.addGameObject(new EnemySpacecraft(this, "normal", x, -120, 60, 55, "./assets/enemy_1/", 30));
                break;
            case "enemyCruiser":
                this.addGameObject(new EnemySpacecraft(this, "enemyCruiser", x, -120, 90, 85, "./assets/enemy_2/", 70));
                break;
            case "enemyDestroyer":
                this.addGameObject(new EnemySpacecraft(this, "enemyDestroyer", x, -120, 150, 140, "./assets/enemy_3/", 150));
                break;
            default:
                this.addGameObject(new EnemySpacecraft(this, "normal", x, -120, 60, 55, "./assets/enemy_1/", 40));
                break;
        }
    }

}