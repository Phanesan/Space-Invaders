let ID_COUNTER = 1000;

class GameManager {

    constructor() {
        this.gameState = null;
        this.DOC = document.getElementById("canvas");
        this.ctx = this.DOC.getContext("2d");
        this.debug = false;

        this.keyManager = new KeyManager();
        this.eventManager = new EventManager();
        this.CodeBlocksOfASingleEjecution = [];
        this.pause = false;

        // iniciar eventos
        this.initEvents();

        // iniciar el juego
        this.changeGameState(new LevelState(this));
    }

    update() {
        if(this.pause === false) {
            this.DOC.width = document.body.clientWidth;
            this.DOC.height = document.body.clientHeight;

            if(this.gameState !== null) {
                this.CodeBlocksOfASingleEjecution.forEach((code) => {
                    code();
                });
                this.CodeBlocksOfASingleEjecution = [];

                this.gameState.update();
                this.paint();
            } else {
                this.ctx.font = '40px Arial';
                this.ctx.fillStyle = 'red';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('NO EXISTEN ESTADOS POR MOSTRAR', this.DOC.width / 2, this.DOC.height / 2);
            }
            requestAnimationFrame(this.update.bind(this));
        }
    }

    paint() {
        // limpiar el canvas
        this.ctx.clearRect(0,0,this.DOC.width,this.DOC.height);

        this.gameState.paint();
    }

    changeGameState(newState) {
        this.gameState = newState;
        this.eventManager.triggerEvent("changeEvent", {gameState: this.gameState});
    }

    start() {
        this.id = requestAnimationFrame(this.update.bind(this));
    }

    initEvents() {

        window.addEventListener("focus", () => {
            this.pause = false;
            this.gameState.onResume();
            this.start();
        })
        
        window.addEventListener("blur", () => {
            this.pause = true;
            this.gameState.onPause();
        })

        this.eventManager.registerEvent("changeEvent", (eventData) => {
            console.log(`Cambio de estado: ${eventData.gameState.constructor.name}`);
    
        });

        this.eventManager.registerEvent("endGameAnimationEvent", (eventData) => {
            if(eventData.name === "controlBanner") {
                this.changeGameState(new MenuState(this));
            }
        });

        this.eventManager.registerEvent("onEnemyDestroyed", (eventData) => {
            this.gameState.destroyGif(eventData.enemyAsset);
            this.gameState.destroyGameObject(eventData.ID);
            if(this.gameState instanceof LevelState) {
                this.gameState.enemyWaveSystem.enemiesCleared++;
                this.gameState.enemyWaveSystem.livingEnemies--;
            }
            if(probability(1)) {
                this.gameState.addGameObject(new Star(this.gameState, "star", eventData.x, eventData.y, 50, 50, "./assets/star/"));
            }
        });

        this.eventManager.registerEvent("onPlayerDestroyed", (eventData) => {
            // TODO: mostrar pantalla de game over
            this.gameState.destroyGif(eventData.playerAsset);
            this.gameState.destroyGameObject(eventData.ID);
        });
    
    }

    executeCodeOnce(functionCode) {
        this.CodeBlocksOfASingleEjecution.push(functionCode);
    }
}