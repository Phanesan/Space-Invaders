class KeyManager {
    constructor() {
        this.keys = new Set();
        document.addEventListener("keydown", event => {
            this.keys.add(event.code);
        });
        document.addEventListener("keyup", event => {
            this.keys.delete(event.code);
        });
    }
}