class StartingState extends GameState {
    constructor(gameManager) {
        super(gameManager); 

        this.initEvents();

        this.intro = false;

        this.addAnimation(new GameAnimation("logoIntro", this, 3000, (data) => {
            this.gameManager.eventManager.triggerEvent("introEvent", {});

            const testImg = new Image();
            testImg.src = "./assets/test.png";

            const startOpacity = 0;
            const endOpacity = 1;
            let opacity;

            if(data.elapsedTime >= data.animationDuration-350) {
                opacity = startOpacity - (endOpacity - startOpacity) * (data.elapsedTime - data.animationDuration) / 350;
            } else {
                opacity = startOpacity + (endOpacity - startOpacity) * (data.elapsedTime / 350);
            }

            this.gameManager.ctx.globalAlpha = opacity;
            this.gameManager.ctx.drawImage(testImg,this.gameManager.DOC.width / 2 - 100, this.gameManager.DOC.height / 2 - 130, 200, 200);

            drawText(this.gameManager.ctx, 'Yahir Emmanuel', this.gameManager.DOC.width / 2, this.gameManager.DOC.height / 2 + 100, 24, 'impact', '#E1EC36', 'center', 'middle', 0);
            this.gameManager.ctx.globalAlpha = 1;
        },1400,new GameAnimation("controlBanner", this, 3200, (data) => {
            const controlesBanner = new Image();
            controlesBanner.src = "./assets/controlesBanner.png";

            const startOpacity = 0;
            const endOpacity = 1;
            let opacity;

            if(data.elapsedTime >= data.animationDuration-350) {
                opacity = startOpacity - (endOpacity - startOpacity) * (data.elapsedTime - data.animationDuration) / 350;
            } else {
                opacity = startOpacity + (endOpacity - startOpacity) * (data.elapsedTime / 350);
            }

            this.gameManager.ctx.globalAlpha = opacity;
            this.gameManager.ctx.drawImage(controlesBanner,this.gameManager.DOC.width / 2 - 640, this.gameManager.DOC.height / 2 - 360, 1280, 720);
        },200)));
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
            if(!this.intro) {
                playSound("./assets/audios/intro.ogg",1);
                this.intro = true;
            }
        });
    
    }

    onPause() {
        this.animations.forEach((animation) => {
            animation.pause();
        });
    }

    onResume() {
        this.animations.forEach((animation) => {
            animation.resume();
        });
    }

}