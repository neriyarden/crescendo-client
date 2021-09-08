export const currentServer = process.env.REACT_APP_DEV_SERVER
console.log('currentServer', currentServer);
const storedData = JSON.parse(localStorage.getItem('userData'))
const token = storedData?.token

export const axios = require('axios').create({
    baseURL: currentServer,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": currentServer,
        "Authorization": token ? `Bearer ${token}` : "" 
    },
    withCredentials: true,
})

export const httpRequest = async (path, method = 'GET', data = null) => {
    console.log('data:', data);

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
