class GameAnimation {

    constructor(gameState, animationDuration, callback, timeBeforeStart = undefined) {
        this.gameState = gameState;
        this.animationDuration = animationDuration;
        this.callback = callback;

        this.timeBeforeStart = timeBeforeStart;
        this.startAnimation = false;
        if(this.timeBeforeStart === undefined) {
            this.startAnimation = true;
        }

        this.currentTime = 0;
        this.elapsedTime = 0;
        this.progress = 0;

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

            if (this.progress <= 1) {
                this.callback({
                    currentTime: this.currentTime,
                    elapsedTime: this.elapsedTime,
                    progress: this.progress,
                    end: this.end,
                    instance: this
                });
            } else {
                this.end = true;
                this.callback({
                    currentTime: this.currentTime,
                    elapsedTime: this.elapsedTime,
                    progress: this.progress,
                    end: this.end,
                    instance: this
                });
            }
        }
    }

    destroy() {
        this.gameState.destroyAnimation(this);
    }
}