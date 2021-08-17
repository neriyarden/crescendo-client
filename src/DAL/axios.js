const servers = {
    NODE_SERVER: "http://localhost:3100/",
    FLASK_SERVER: "http://localhost:5000/"
}

export const currentServer = servers.NODE_SERVER

const axios = require('axios').create({
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
            url: path,
            data
        })
        console.log('response.data:', await response.data);
        return await response.data
    }
    catch (err) {
        console.log('response.error:', err.response?.data?.error);
        return err.response
    }
}
