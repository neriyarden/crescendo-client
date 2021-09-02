const servers = {
    NODE_SERVER: "http://localhost:3100/",
    FLASK_SERVER: "http://localhost:5000/"
}

export const currentServer = servers.NODE_SERVER

export const axios = require('axios').create({
    baseURL: currentServer,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": currentServer
    },
    withCredentials: true
})

export const httpRequest = async (path, method = 'GET', data = null) => {
        try {
            const response = await axios({
                method,
            url: '/api' + path,
            data
        })
        console.log('Http Response:', await response);
        return response.data
    }
    catch (err) {
        console.log('Http Error:', err.response?.data?.error); // ?
        return err.response.data
    }
}
