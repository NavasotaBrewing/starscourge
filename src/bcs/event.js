
class Event {
    constructor(event_type) {
        this.event_type = event_type;
        this.devices = []
        this.RTU = null
    }

    setDevices(devices) {
        this.devices = Array.isArray(devices) ? devices : [devices];
    }

    setRTU(rtu) {
        this.RTU = rtu;
    }

    toString() {
        return JSON.stringify({
            event_type: this.event_type,
            devices: this.devices,
            RTU: this.RTU
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
