class StartingState extends GameState {
    constructor(gameManager) {
        super(gameManager); 

        this.initEvents();

        this.intro = false;

        this.addAnimation(new GameAnimation(this, 400, (data) => {
            this.gameManager.eventManager.triggerEvent("introEvent", {});

            const testImg = new Image();
            testImg.src = "./assets/test.png";

            const startOpacity = 0;
            const endOpacity = 1;

            const opacity = startOpacity + (endOpacity - startOpacity) * data.progress;

            this.gameManager.ctx.globalAlpha = opacity;
            this.gameManager.ctx.drawImage(testImg,this.gameManager.DOC.width / 2 - 100, this.gameManager.DOC.height / 2 - 130, 200, 200);

            drawText(this.gameManager.ctx, 'Yahir Emmanuel', this.gameManager.DOC.width / 2, this.gameManager.DOC.height / 2 + 100, 24, 'impact', '#E1EC36', 'center', 'middle');
            this.gameManager.ctx.globalAlpha = 1;
        },2000));
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

    initEvents() {

        this.gameManager.eventManager.registerEvent("introEvent", (eventData) => {

            console.log("INTRO");
    
            if(!this.intro) {
                playSound("./assets/audios/intro.ogg",1);
                this.intro = true;
            }
        });
    
    }

}