class MenuState extends GameState {

    constructor(gameManager) {
        super(gameManager);

        this.menu = new GifDrawer(this.gameManager.ctx, "./assets/wallpaper/menu/", 0, -100, this.gameManager.DOC.width, this.gameManager.DOC.height+200, 1000, 15);
        this.gifs.push(this.menu);

        this.initEvents();

        this.addAnimation(new GameAnimation("bannerLevel", this, 3500, (data) => {
            const startOpacity = 0;
            const endOpacity = 1;
            let opacity;

            const fadeIn = 350;
            const fadeOut = 350;

            if(data.elapsedTime >= data.animationDuration-fadeOut) {
                opacity = startOpacity - (endOpacity - startOpacity) * (data.elapsedTime - data.animationDuration) / fadeOut;
            } else {
                opacity = startOpacity + (endOpacity - startOpacity) * (data.elapsedTime / fadeIn);
            }

            this.gameManager.ctx.globalAlpha = opacity;
        }, 0, () => {
            console.log("termino");
            //this.gameManager.changeGameState();
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