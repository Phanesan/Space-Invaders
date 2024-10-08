class HealthBar {

    constructor(gameState, name, x, y, width, height, color, maxHealth) {
        this.gameState = gameState;
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
    }

    paint() {
        drawRect(this.gameState.gameManager.ctx, this.x, this.y, this.width * (this.health / this.maxHealth), this.height, this.color, 1, 1);
        drawSquare(this.gameState.gameManager.ctx, this.x, this.y, this.width, this.height, "red", 1, 1);
    }

    update(health, x, y, maxHealth) {
        this.maxHealth = maxHealth;
        this.health = health;
        this.x = x;
        this.y = y;
    }

}