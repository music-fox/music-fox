const axios = require('axios')

const spotifySearch = (token, query) => {
    let url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,artist&limit=1`
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

const musxmatSearch = (track, artist) => {
    let url = `https://api.musixmatch.com/ws/1.1/track.search?apikey=${process.env.API_MUSICXMATCH}&q_track=${encodeURIComponent(track)}&q_artist=${encodeURIComponent(artist)}`
    return axios ({
        method: 'get',
        url: url
    }).then(response => {
        return response.data.message.body.track_list[0].track.track_id
    }).catch(err => {
        return err
    })
}

const mxmLyrics = (trackId) => {
    let url = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${process.env.API_MUSICXMATCH}&track_id=${trackId}`
    return axios ({
        method: 'get',
        url: url
    }).then(response => {
        console.log(response.data.message.body.lyrics.lyrics_body);
        return response.data.message.body.lyrics.lyrics_body
    }).catch(err => {
        return err
    })
}

module.exports = {
    spotifySearch,
    musxmatSearch,
    mxmLyrics
}