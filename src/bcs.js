import moment from "moment";

class EventResponse {
    constructor(obj) {
        this.response_type = obj.response_type;
        this.data = obj.data;
        this.message = obj.message;
    }

    isError() {
        return this.response_type == "Error"
    }
}

class BCS {
    constructor() {
        this.RTU_addresses = ["0.0.0.0"];
        this.sockets = {};
        this.app = {}
    }

    notify(msg, level) {
        this.app.$waveui.notify(msg, level);
    }

    buildFullAddr(IPv4Addr, route = "") {
        return "http://" + IPv4Addr + ":3012" + route;
    }

    on_websocket_disconnect(addr, event) {
        let rtu = this.app.RTUs.find((rtu) => rtu.ip_addr == addr);
        this.notify("WebSocket connection to " + rtu.name + " closed", "error");
        console.log(event);
    }

    on_websocket_error(event) {
        this.notify("WebSocket Error. See the console", "danger");
        console.log(event);
    }

    // Handle incoming messages from the websocket
    on_websocket_message(msg, app) {
        let event = new EventResponse(JSON.parse(msg.data));
        app.lastUpdate = moment().format('hh:mm:ss');
        switch (event.response_type) {

            case "RTUUpdateResult": {
                console.log("RTUUpdateResult returned");
                console.log(event);
                // Update the proper RTU
                let found_index = app.RTUs.findIndex((rtu) => rtu.id == event.data.RTU.id);
                if (found_index == -1) {
                    app.RTUs.push(event.data.RTU);
                } else {
                    app.RTUs[found_index] = event.data.RTU;
                }
                break;
            }

            case "DeviceUpdateResult": {
                // Update: API changed to return multiple devices.
                // There might be a more efficent want to do this.

                console.log("DeviceUpdateResult returned");
                console.log(event);
                // Happens when you manually request a device update
                // Update only a specific device
                let incoming_devices = event.data.devices;
                app.RTUs.forEach(rtu => {
                    incoming_devices.forEach(incoming_device => {
                        let found_index = rtu.devices.findIndex((dev) => dev.id == incoming_device.id);
                        if (found_index == -1) {
                            console.log("Error, couldn't find device with id: ", incoming_device.id);
                        } else {
                            rtu.devices[found_index] = incoming_device;
                        }
                    })
                });

                break;
            }

            case "DeviceEnactResult": {
                console.log("DeviceEnactResult returned");
                console.log(event);
                break;
            }

            case "Error": {
                console.error("Iris server returned an error: ", event.message);
                console.error(event);
                this.app.$waveui.notify("Iris server returned an error. Try again.", 'error', 8000);
                this.app.$waveui.notify(event.message, 'error', 8000);
                break;
            }

            default: {
                console.log("Unknown event response type: ", msg.response_type);
                break;
            }
        }
    }

    // Connect to a websocket and pass it to the callback
    register_websocket(addr, callback) {
        // Send a get request to 0.0.0.0:3012/register
        // It returns a websocket url
        let url = this.buildFullAddr(addr, "/register");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                // Get the response object
                let payload = JSON.parse(xmlHttp.responseText);
                // and create a new websocket with the returned url
                let websocket = new WebSocket(payload.url);
                // Call the callback on the websocket
                callback(websocket);
            }
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
        return;
    }

    // Connect to each websocket provided at RTU_addresses
    // Store the websockets in sockets, with the RTU address as the key
    // on_message is the callback that happens when an incoming message is sent
    init(app) {
        // Store a reference to the Vue app
        this.app = app;
        this.notify("Initializing");
        // For every device saved in RTU_addresses
        this.RTU_addresses.map((addr) => {
            // Connect to that websocket
            this.register_websocket(addr, (socket) => {
                socket.onclose = (event) => this.on_websocket_disconnect(addr, event);
                socket.onerror = (event) => this.on_websocket_error(event);
                socket.onmessage = (event) => this.on_websocket_message(event, this.app);
                this.sockets[addr] = socket;
                this.notify('Connection made to ' + addr, 'success');
            });
        })
    }

    // Searches all the RTUs for the proper device, then sends a message through that 
    // RTUs websocket to enact the device
    enactDevice(device_id) {
        // This is really dumb but javascript is dumber
        this.app.RTUs.forEach((rtu) => {
            let found_dev = rtu.devices.find((dev) => dev.id == device_id);
            if (found_dev != null) {
                let socket = this.sockets[rtu.ip_addr];
                socket.send(JSON.stringify({
                    event_type: "DeviceEnact",
                    devices: [found_dev]
                }))
            } else {
                console.log("Couldn't find device with id: ", device_id);
            }
        });
    }

    // Manually update a device
    // The BCS init method has the handler for the response method
    updateDevice(device_id) {
        this.app.RTUs.forEach((rtu) => {
            let found_dev = rtu.devices.find((dev) => dev.id == device_id);
            if (found_dev != null) {
                let socket = this.sockets[rtu.ip_addr];
                socket.send(JSON.stringify({
                    event_type: "DeviceUpdate",
                    devices: [found_dev]
                }))
            } else {
                console.log("Couldn't find device with id: ", device_id);
            }
        });
    }
}


export default new BCS();
