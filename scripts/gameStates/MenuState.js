class MenuState extends GameState {

    constructor(gameManager) {
        super(gameManager);

        // Logica del juego

        this.initEvents();
    }

    update() {
        // actualizar los objetos
        this.gameObjects.forEach((obj) => {
            obj.update();
        });
    }

    paint() {
        this.gameObjects.forEach((obj) => {
            obj.paint();
        });

        // dibujar el UI
        this.UI();
    }

    UI() {
        this.animations.forEach((animation) => {
            animation.animate();
        });
    }

    initEvents() {}
}