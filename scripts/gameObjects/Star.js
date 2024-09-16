class Star extends GameObject {
    constructor(gameState, name, x, y, width, height, asset = null) {
        super(gameState, name, x, y, width, height, asset);

        this.amountOfProgress = 10;

        this.asset = new GifDrawer(this.gameState.gameManager, this.asset, this.x, this.y, this.width, this.height, 1400, 7);
        this.gameState.addGif(this.asset);
    }

    update() {
        this.y+=1.3;
        this.asset.y = this.y;

        if(this.y >= this.gameState.gameManager.DOC.height+150) {
            this.gameState.destroyGif(this.asset);
            this.gameState.destroyGameObject(this.ID);
        }
    }

    paint() {}

    collision(other) {}

}