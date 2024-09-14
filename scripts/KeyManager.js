class KeyManager {
    constructor() {
        this.keys = new Set();
        document.addEventListener("keydown", event => {
            this.keys.add(event.code);
        });
        document.addEventListener("keyup", event => {
            this.keys.delete(event.code);
        });
        // Evento 0: Boton izquierdo
        // Evento 1: Boton medio
        // Evento 2: Boton derecho
        document.addEventListener("mousedown", (event) => {
            this.keys.add(event.button);
        });
        document.addEventListener("mouseup", (event) => {
            this.keys.delete(event.button);
        })
    }
}