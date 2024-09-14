class LevelState extends GameState {

    constructor(gameManager, level = 1) {
        super(gameManager);
        this.initEvents();
        this.level = level;

        if(this.level === 1) {
            this.soundtrack = new Soundtrack(this, "./assets/audios/level_1.ogg", 16.340, 0.2);
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

        this.addGameObject(new Player(this, "player", this.gameManager.DOC.width / 2, this.gameManager.DOC.height / 2 + 360, 60, 40, "./assets/spacecraft/"));

        this.gameManager.executeCodeOnce(() => {
            this.soundtrack.play();
        })
    }

    update() {
        this.soundtrack.update();

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

    UI() {}

    initEvents() {
        
    }

    onPause() {
        this.soundtrack.audioSource.pause();
    }

    onResume() {
        this.soundtrack.audioSource.play();
    }

}