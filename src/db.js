import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:8081/',
    json: true
})


export default {
    async execute(method, resource, data) {
        // inject the accessToken for each request
        // let accessToken = await Vue.prototype.$auth.getAccessToken()
        return client({
            method,
            url: resource,
            data,
            // headers: {
            //   Authorization: `Bearer ${accessToken}`
            // }
        }).then(req => {
            return req.data
        })
    },

    // Models
    getModels() {
        return this.execute('get', '/model');
    },
    getModel(id) {
        return this.execute('get', `/model/${id}`);
    },
    createModel(data) {
        return this.execute('post', '/model', data);
    },
    updateModel(id, data) {
        return this.execute('put', `/model/${id}`, data);
    },
    deleteModel(id) {
        return this.execute('delete', `/model/${id}`);
    },

}
