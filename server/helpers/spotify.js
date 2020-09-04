const axios = require('axios')

const spotifySearch = (token, query, type) => {
    let url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=1`
    return axios({
        method: 'get',
        url: url,
        headers: {
            Authorization: `${token.token_type} ${token.access_token}`
        }
    }).then(response => {
        const found = response.data.tracks.items[0]

        if (!found) {
            throw {error: {message: 'track not found', statusCode: 404}}
        }

        return found.id
    }).catch(err => {
        return err
    })
}

module.exports = spotifySearch