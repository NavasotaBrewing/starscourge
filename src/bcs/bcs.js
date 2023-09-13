import moment from "moment";
import SocketManager from "@/bcs/socket.js";
import { Event, EventResponse } from "@/bcs/event.js";


class BCS {
    constructor(app) {
        this.app = app;
        this.socket_man = new SocketManager(this.app.$waveui.notify, this.on_message);
        this.socket_man.init();
    }

    notify(msg, level) {
        this.app.$waveui.notify(msg, level);
    }

    handleRTUUpdateResult(event) {
        // This is an entire RTU (including many devices).
        // This comes in every 25 seconds (due to change).
        let found_index = this.app.RTUs.findIndex((rtu) => rtu.id == event.data.RTU.id);
        if (found_index == -1) {
            this.app.RTUs.push(event.data.RTU);
        } else {
            this.app.RTUs[found_index] = event.data.RTU;
        }
    }

    handleDeviceUpdateResult(event) {
        // Happens when you manually request a device update
        // Update only a specific device
        let incoming_devices = event.data.devices;
        this.app.RTUs.forEach(rtu => {
            incoming_devices.forEach(incoming_device => {
                let found_index = rtu.devices.findIndex((dev) => dev.id == incoming_device.id);
                if (found_index == -1) {
                    console.log("Error, couldn't find device with id: ", incoming_device.id);
                } else {
                    rtu.devices[found_index] = incoming_device;
                }
            })
        });
    }

    on_message = (msg) => {
        let event = new EventResponse(msg);
        this.app.lastUpdate = moment().format('hh:mm:ss');

        switch (event.response_type) {
            case "RTUUpdateResult": {
                this.handleRTUUpdateResult(event);
                break;
            }
            case "DeviceUpdateResult": {
                this.handleDeviceUpdateResult(event);
                break;
            }
            case "Error": {
                this.notify("Iris server returned an error", 'error', 6000);
                this.notify(event.message, 'error', 8000);
                console.error(event);
                break;
            }
            // There are more event types, but we don't do anything with them now
            default: {
                // This shouldn't be reached
                break;
            }
        }
    }

    // Sends either a DeviceUpdate or DeviceEnact event, with the device
    // that has the given ID attached.
    sendDeviceEvent(eventType, deviceId) {
        this.app.RTUs.forEach((rtu) => {
            let found_dev = rtu.devices.find((dev) => dev.id == deviceId);
            if (found_dev != null) {
                let event = new Event(eventType, found_dev);
                this.socket_man.sendEventTo(event, rtu.ip_addr);
            } else {
                console.log("Couldn't find device with id: ", deviceId);
            }
        })
    }

    enactDevice(deviceId) {
        this.sendDeviceEvent("DeviceEnact", deviceId);
    }

    updateDevice(deviceId) {
        this.sendDeviceEvent("DeviceUpdate", deviceId);
    }
}


export default BCS;
