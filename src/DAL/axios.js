const axios = require('axios').create({
    baseURL: 'http://localhost:3100',
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3100"
    },
    withCredentials: true
})

const httpRequest = async (path, method = 'GET', data = null) => {
    try {
        const response = await axios({
            method,
            url: path,
            data
        })
        return await response.data
    }
    catch (err) {
        return err.response
    }
}

module.exports = httpRequest