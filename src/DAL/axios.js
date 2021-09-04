

export const currentServer = process.env.REACT_APP_DEV_SERVER
console.log('currentServer', currentServer);
export const axios = require('axios').create({
    baseURL: currentServer,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": currentServer,
        'access-control-expose-headers': 'Set-Cookie'
    },
    withCredentials: true,
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
