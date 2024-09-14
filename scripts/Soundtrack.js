class Soundtrack {

    constructor(gameState, path, startLoopTime, volume = 1) {
        this.gameState = gameState;
        this.path = path;
        this.startLoopTime = startLoopTime;

        this.audioSource = new Audio();
        this.audioSource.src = path;
        this.audioSource.volume = volume;
        this.audioSource.loop = true;
    }

    play() {
        this.audioSource.play();
    }

    update() {
        if(this.audioSource.currentTime >= this.audioSource.duration - 0.100000) {
            this.audioSource.currentTime = this.startLoopTime;
        }
    } 
}