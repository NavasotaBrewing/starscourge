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


    getScenes() {
        return this.execute('get', '/scenes')
    },
    getScene(id) {
        return this.execute('get', `/scene/${id}`);
    },
    createScene(data) {
        return this.execute('post', '/scenes', data);
    },
    updateScene(id, data) {
        return this.execute('put', `/scene/${id}`, data);
    },
    deleteScene(id) {
        return this.execute('delete', `/scene/${id}`);
    },
}
