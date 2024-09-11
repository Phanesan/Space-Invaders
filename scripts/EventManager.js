class EventManager {
    constructor() {
        this.events = new Map();
    }

    registerEvent(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push((eventData) => {
            callback({event, ...eventData});
        });
    }

    triggerEvent(event, eventData) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(callback => {
                callback(eventData);
            });
        }
    }
}