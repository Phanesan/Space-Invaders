class GameObject {
    static nextID() {
        return ID_COUNTER++;
    }

    constructor(gameState, name, x, y, width, height, asset = null) {
        this.ID = GameObject.nextID();
        this.gameState = gameState;
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.asset = asset;
    }

    update() {
        console.log("update");
    }

    paint() {
        console.log("paint");
    }

    collision(other) {
        console.log(`collision ${other.name}`);
    }

    intersects(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }
    
}