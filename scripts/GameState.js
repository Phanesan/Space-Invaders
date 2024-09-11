class GameState {

    constructor(gameManager) {
        this.gameManager = gameManager;
        this.gameObjects = [];
        this.animations = [];
    }

    update() {
        console.log("update");
    }

    paint() {
        console.log("paint");
    }

    UI() {
        console.log("UI");
    }

    addGameObject(obj) {
        this.gameObjects.push(obj);
    }

    getGameObject(name) {
        return this.gameObjects.find(element => element.name === name);
    }

    addAnimation(animation) {
        this.animations.push(animation);
    }

    destroyAnimation(animation) {
        this.animations = this.animations.filter(element => element !== animation);
    }

    initEvents() {
    }
}