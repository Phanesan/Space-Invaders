class GifDrawer {
    constructor(ctx, Path, x, y, width, height, animationDuration, numImages) {
        this.ctx = ctx;
        this.Path = Path;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.numImages = numImages;
        this.currentImage = 0;
        this.animationDuration = animationDuration;

        this.currentTime = 0;
        this.elapsedTime = 0;
        this.progress = 0;
        this.startTime = Date.now();

        this.timeBeforeSwitch = this.animationDuration / this.numImages;
        this.temp = this.timeBeforeSwitch;

        this.images = [];
        for(let i = 0; i <= this.numImages; i++) {
            let img = new Image();
            img.src = `${this.Path}${i}.png`;
            this.images.push(img);
        }
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }
    
    draw() {
        this.currentTime = Date.now();
        this.elapsedTime = this.currentTime - this.startTime;
        this.progress = this.elapsedTime / this.animationDuration;

        this.ctx.drawImage(this.images[this.currentImage], this.x, this.y, this.width, this.height);
        //console.log(this.elapsedTime)
        if(this.elapsedTime >= this.temp) {
            //console.log(this.currentImage);
            this.temp += this.timeBeforeSwitch;
            this.currentImage++;

            if(this.currentImage > this.numImages) {
                //console.log("END");
                this.currentImage = 0;
            }
        }
    }

    pause() {
        this.startTime = this.currentTime;
    }

    resume() {
        this.temp = this.timeBeforeSwitch;
        this.startTime = Date.now();
    }
}