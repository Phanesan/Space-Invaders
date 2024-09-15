class MenuState extends GameState {

    constructor(gameManager, level = 1) {
        super(gameManager);
        this.level = level;
        this.temp = 0;
        if(this.level === 1 || this.level === 2) {
            this.temp = 5800;
        } else if(this.level === 3) {
            this.temp = 6300;
        }

        this.executed = false;

        this.menu = new GifDrawer(this.gameManager, "./assets/wallpaper/menu/", 0, -100, this.gameManager.DOC.width, this.gameManager.DOC.height+200, 1000, 15);
        this.addGif(this.menu);

        this.initEvents();

        this.gameManager.executeCodeOnce(() => {
            this.gameManager.ctx.globalAlpha = 0;
            if(this.level === 1 || this.level === 2) {
                playSound("./assets/audios/starting_level.ogg",1);
            } else if(this.level === 3) {
                playSound("./assets/audios/starting_level_boss.ogg",1);
            }
        });

        this.addAnimation(new GameAnimation("bannerLevel", this, this.temp, (data) => {
            const startOpacity = 0;
            const endOpacity = 1;
            let opacity;

            const fadeIn = 350;
            const fadeOut = 350;
            
            if(data.elapsedTime > data.animationDuration-fadeOut) {
                opacity = startOpacity - (endOpacity - startOpacity) * (data.elapsedTime - data.animationDuration) / fadeOut;
            } else {
                opacity = startOpacity + (endOpacity - startOpacity) * (data.elapsedTime / fadeIn);
            }

            this.gameManager.ctx.globalAlpha = opacity;
        }, undefined, () => {
            this.gameManager.ctx.globalAlpha = 0;
            this.gameManager.changeGameState(new LevelState(this.gameManager, this.level));
        }))
    }

    update() {
        this.gameManager.keyManager.keys.forEach((key) => {
            console.log(key);
        });
    }

    paint() {
        // dibujar el UI
        this.UI();
    }

    UI() {
        this.menu.setWidth(this.gameManager.DOC.width);
        this.menu.setHeight(this.gameManager.DOC.height+200);
        
        this.animations.forEach((animation) => {
            animation.animate();
        });

        this.gifs.forEach((gif) => {
            gif.draw();
        });


        drawText(this.gameManager.ctx, 'SPACE INVADERS', this.gameManager.DOC.width / 2, 130, 150, 'space_invaders', '#F8FF93', 'center', 'middle', 0);
        drawText(this.gameManager.ctx, `Nivel ${1}`, this.gameManager.DOC.width / 2, this.gameManager.DOC.height / 2, 60, 'space_invaders_text', '#6EFF64', 'center', 'middle', 1, '#1FFF00');
    }

    initEvents() {}

    onPause() {
        this.gifs.forEach((gif) => {
            gif.pause();
        });
    }

    onResume() {
        this.gifs.forEach((gif) => {
            gif.resume();
        });
    }
}