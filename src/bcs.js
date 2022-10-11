// This is an interface with the BCS, specifically the bcs_network master station

import axios from "axios";

export default {
    RTU_addresses: ["http://0.0.0.0:3012"],
    async find_rtu_at(IPv4Addr) {
        return (
            await axios.get(IPv4Addr + "/generate")
        ).data;
    },

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