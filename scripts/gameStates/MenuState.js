class MenuState extends GameState {

    constructor(gameManager) {
        super(gameManager);

        this.selectedOption = 0;

        this.menu = new GifDrawer(this.gameManager.ctx, "./assets/wallpaper/menu/", 0, -100, this.gameManager.DOC.width, this.gameManager.DOC.height+200, 1000, 15);

        this.gifs.push(this.menu);

        this.initEvents();
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

        this.gifs.forEach((gif) => {
            gif.draw();
        });

        this.animations.forEach((animation) => {
            animation.animate();
        });
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