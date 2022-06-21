// This is an interface with the BCS, specifically the bcs_network master station

import axios from "axios";

export default {
    update(model, mode = "Read") {
        model.mode = mode;
        let url = "http://" + model.masterAddr + "/model";
        axios.post(url, model)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        model.mode = "Read";
    }
}