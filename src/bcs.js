// This is an interface with the BCS, specifically the bcs_network master station

import axios from "axios";

export default {
    RTU_addresses: ["0.0.0.0"],

    // "0.0.0.0" -> "https://0.0.0.0:3012/route"
    buildFullAddr(IPv4Addr, route = "") {
        return "http://" + IPv4Addr + ":3012" + route;
    },

    async findRTUAt(IPv4Addr) {
        return axios.get(this.buildFullAddr(IPv4Addr, "/generate"))
    },

    async testConnection(IPv4Addr) {
        return axios.get(this.buildFullAddr(IPv4Addr, "/running"))
            .then((resp) => {
                return resp.data.running;
            })
            .catch(() => {
                return false;
            });
    },

    async update(rtu, mode, callback) {
        // console.log(rtu);
        let url = this.buildFullAddr(
            rtu.ip_addr,
            mode == "Write" ? "/enact" : "/update"
        );

        axios.post(url, rtu, {
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(callback)
            .catch((resp) => {
                console.log(resp);
            });
        
        return;
    }
}