class SocketManager {
    constructor(
        notification_callback,
        on_message = console.log,
        on_error = console.error,
        on_close = console.log
    ) {
        this.RTU_addresses = ["0.0.0.0"];
        this.sockets = {};
        this.notify = (msg, level) => notification_callback(msg, level);
        this.on_message = on_message;
        this.on_error = on_error;
        this.on_close = on_close;
    }

    buildFullAddr(IPv4Addr, route = "") {
        return "http://" + IPv4Addr + ":3012" + route;
    }

    // Connect to a websocket and pass it to the callback
    register_websocket(addr) {
        this.notify("Initializing " + addr);

        // Send a get request to 0.0.0.0:3012/register
        // It returns a websocket url
        let url = this.buildFullAddr(addr, "/register");
        var xmlHttp = new XMLHttpRequest();

        // When it comes back
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                // Get the response object
                let payload = JSON.parse(xmlHttp.responseText);
                // and create a new websocket with the returned url
                let websocket = new WebSocket(payload.url);
                // Attach the handlers
                // We pass the incoming event and also the addr
                // addr is just for notifications, so the user can
                // tell which RTU is reporting what.
                // TODO: change this to the RTU ID instead of the IP
                // We'll have to include it in the original register payload
                websocket.onerror = (event) => this.on_error(event, addr);
                websocket.onmessage = (event) => this.on_message(event, addr);
                websocket.onclose = (event) => this.on_close(event, addr);
                // And keep track of the sockets
                this.sockets[addr] = websocket;
                this.notify('Connection made to ' + addr, 'success');
            }
        }

        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
        return;
    }

    sendEventTo(event, addr) {
        console.log(event);
        let socket = this.sockets[addr];
        socket.send(event.toString());
    }

    init() {
        // Connect to each websocket in the address list
        this.RTU_addresses.map((addr) => { this.register_websocket(addr) })
    }
}

export default SocketManager;
