
class Event {
    constructor(event_type, devices) {
        this.event_type = event_type;
        this.devices = Array.isArray(devices) ? devices : [devices];
    }

    toString() {
        return JSON.stringify({
            event_type: this.event_type,
            devices: this.devices
        })
    }
}

class EventResponse {
    constructor(msg) {
        let obj = JSON.parse(msg.data);
        this.response_type = obj.response_type;
        this.data = obj.data;
        this.message = obj.message;
    }

    isError() {
        return this.response_type == "Error"
    }
}

export { Event, EventResponse };
