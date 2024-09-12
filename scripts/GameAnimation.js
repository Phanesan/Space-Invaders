class GameAnimation {

    constructor(name, gameState, animationDuration, callback, timeBeforeStart = undefined, executeAnimationAfterThis = undefined) {
        this.name = name;
        this.gameState = gameState;
        this.animationDuration = animationDuration;
        this.callback = callback;

        this.executeAnimationAfterThis = executeAnimationAfterThis;

        this.timeBeforeStart = timeBeforeStart;
        this.startAnimation = false;
        if(this.timeBeforeStart === undefined) {
            this.startAnimation = true;
        }

        this.currentTime = 0;
        this.elapsedTime = 0;
        this.progress = 0;

        this.elapsedSeconds = 0;

        this.startTime = Date.now();

        this.end = false;
    }

    animate() {
        if(this.startAnimation === false) {
            this.currentTime = Date.now();
            this.elapsedTime = this.currentTime - this.startTime;
            this.progress = this.elapsedTime / this.timeBeforeStart;
            if(this.progress >= 1) {
                this.startAnimation = true;
                this.startTime = Date.now();
            }
        } else {
            this.currentTime = Date.now();
            this.elapsedTime = this.currentTime - this.startTime;
            this.progress = this.elapsedTime / this.animationDuration;
            this.elapsedSeconds = this.elapsedTime / 1000;

            if (this.progress <= 1) {
                this.callback({
                    currentTime: this.currentTime,
                    elapsedTime: this.elapsedTime,
                    progress: this.progress,
                    end: this.end,
                    instance: this,
                    elapsedSeconds: this.elapsedSeconds,
                    animationDuration: this.animationDuration
                });
            } else {
                this.gameState.gameManager.eventManager.triggerEvent("endGameAnimationEvent", {
                    name: this.name
                });
                this.end = true;
                this.destroy();
            }
        }
    }

    destroy() {
        if(this.executeAnimationAfterThis !== undefined) {
            this.gameState.addAnimation(this.executeAnimationAfterThis);
        }

        this.gameState.destroyAnimation(this);
    }
}