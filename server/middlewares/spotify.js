const axios = require('axios')

const getSpotifyAccessToken = (req, res, next) => {
    let authCode = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization: `Basic ${Buffer.from(authCode).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'grant_type=client_credentials'
    }).then(response => {
        req.spotifyToken = response.data
        next()
    }).catch(err => {
        next(err)
    })
}

module.exports = {
    getSpotifyAccessToken
}