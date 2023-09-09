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

export default {
    // TODO: eventually we want to either ask for a list of these, or have a hardcoded list 
    // if our network setup is actually static.
    RTU_addresses: ["0.0.0.0"],
    sockets: {},
    app: {},

    // "0.0.0.0" -> "https://0.0.0.0:3012/route"
    buildFullAddr(IPv4Addr, route = "") {
        return "http://" + IPv4Addr + ":3012" + route;
    },

    // Connect to each websocket provided at RTU_addresses
    // Store the websockets in sockets, with the RTU address as the key
    // on_message is the callback that happens when an incoming message is sent
    init(app) {
        this.app = app;
        // For every device saved in RTU_addresses
        this.RTU_addresses.map((addr) => {
            // Connect to that websocket
            this.connect_websocket(addr, (socket) => {
                // Log when we disconnect
                socket.onclose = (event) => {
                    let rtu = app.RTUs.find((rtu) => rtu.ip_addr == addr);
                    app.$waveui.notify("WebSocket connection to " + rtu.name + " closed", "error");
                    console.log("WebSocket closed for addr: ", addr);
                    console.log(event);
                }

                // Log errors
                socket.onerror = (error) => {
                    app.$waveui.notify("WebSocket Error. See the console", "danger");
                    console.log(error);
                }

                // Update RTUs when we get a message from the websocket
                socket.onmessage = (msg) => this.onMessage(msg, this.app);
                this.sockets[addr] = socket;
            });
        })
    },

    // Handle incoming messages from the websocket
    onMessage(msg, app) {
        let event = new EventResponse(JSON.parse(msg.data));
        app.lastUpdate = moment().format('hh:mm:ss');
        switch (event.response_type) {

            case "RTUUpdateResult": {
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
                break;
            }

            case "Error": {
                console.error("Iris server returned an error: ", event.message);
                console.error(event.data);
                break;
            }

            default: {
                console.log("Unknown event response type: ", msg.response_type);
                break;
            }
        }
    },

    // Connect to a websocket and pass it to the callback
    connect_websocket(addr, callback) {
        let url = this.buildFullAddr(addr, "/register");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                let payload = JSON.parse(xmlHttp.responseText);
                let websocket = new WebSocket(payload.url);
                callback(websocket);
            }
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
        return;
    },


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
    },

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
