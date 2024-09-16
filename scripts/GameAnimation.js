class GameAnimation {
    static nextID() {
        return ID_COUNTER++;
    }

    constructor(name, gameState, animationDuration, callback, timeBeforeStart = undefined, executeAnimationAfterThis = undefined, loop = false) {
        this.ID = GameAnimation.nextID();
        this.name = name;
        this.gameState = gameState;
        this.animationDuration = animationDuration;
        this.callback = callback;
        this.loop = loop;

        this.executeAnimationAfterThis = executeAnimationAfterThis;

        this.timeBeforeStart = timeBeforeStart;
        this.startAnimation = false;
        if(this.timeBeforeStart === undefined) {
            this.startAnimation = true;
        }

        this.currentTime = 0;
        this.elapsedTime = 0;
        this.progress = 0;

        this.animationTime = 0;

        this.elapsedSeconds = 0;

        this.startTime = Date.now();

        this.executed = false;
    }

    animate() {

        if(this.executed === false) {
            this.executed = true;
            this.startTime = Date.now();
        }

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
            this.animationTime = this.elapsedTime;
            this.progress = this.elapsedTime / this.animationDuration;
            this.elapsedSeconds = this.elapsedTime / 1000;
            //console.log(this.elapsedTime)
            if (this.progress < 1) {
                this.callback({
                    currentTime: this.currentTime,
                    elapsedTime: this.elapsedTime,
                    progress: this.progress,
                    instance: this,
                    elapsedSeconds: this.elapsedSeconds,
                    animationDuration: this.animationDuration
                });
            } else if(this.loop === false) {
                this.gameState.gameManager.eventManager.triggerEvent("endGameAnimationEvent", {
                    name: this.name
                });
                this.destroy();
            } else {
                this.startTime = Date.now();
                this.progress = 0;
                this.callback({
                    currentTime: this.currentTime,
                    elapsedTime: this.elapsedTime,
                    progress: this.progress,
                    instance: this,
                    elapsedSeconds: this.elapsedSeconds,
                    animationDuration: this.animationDuration
                });
            }
        }
    }

    destroy() {
        if(this.executeAnimationAfterThis !== undefined) {
            if(this.executeAnimationAfterThis instanceof GameAnimation) {
                this.gameState.addAnimation(this.executeAnimationAfterThis);
            } else {
                this.executeAnimationAfterThis();
            }
        }

        this.gameState.destroyAnimation(this.ID);
    }

    pause() {
        this.startTime = this.currentTime;
    }

    resume() {
        this.startTime = Date.now()-this.animationTime;
    }
}