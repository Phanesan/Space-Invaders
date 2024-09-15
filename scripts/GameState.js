class GameState {

    constructor(gameManager) {
        this.gameManager = gameManager;
        this.gameObjects = [];
        this.animations = [];
        this.gifs = [];
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

    destroyGameObject(ID) {
        this.gameObjects = this.gameObjects.filter(element => element.ID !== ID);
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

    addGif(gif) {
        this.gifs.push(gif);
    }

    destroyGif(gif) {
        this.gifs = this.gifs.filter(element => element !== gif);
    }

    onPause() {  
    }

    onResume() {
    }
}