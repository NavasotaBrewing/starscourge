// This is an interface with the BCS, specifically the bcs_network master station

import axios from "axios";

export default {
    RTU_addresses: ["0.0.0.0"],

    // "0.0.0.0" -> "https://0.0.0.0:3012/route"
    buildFullAddr(IPv4Addr, route = "") {
        return "http://" + IPv4Addr + ":3012" + route;
    },

    async findRTUAt(IPv4Addr) {
        return (
            await axios.get(this.buildFullAddr(IPv4Addr, "/generate"))
        ).data;
    },

    testConnection(IPv4Addr) {
        return axios.get(this.buildFullAddr(IPv4Addr, "/running"))
            .then((resp) => {
                return resp.data.running;
            })
            .catch(() => {
                return false;
            });
    }

    // update(model, mode = "Read") {
    //     // model.mode = mode;
    //     // let url = "http://" + model.masterAddr + "/model";
    //     // axios.post(url, model)
    //     //         .then(function (response) {
    //     //             console.log(response);
    //     //         })
    //     //         .catch(function (error) {
    //     //             console.log(error);
    //     //         });
    //     // model.mode = "Read";
    // }
}