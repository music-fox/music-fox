const {Music} = require('../models')
const spotifySearch = require('../helpers/spotify')
const axios = require('axios')
const { response } = require('express')

class SpotifyController {
    static async add (req, res, next) {
        try {
            let {track, artist} = req.body
            let q = `${encodeURIComponent(`${track}` `${artist}`)}`

            let id = await spotifySearch(req.spotifyToken, q, 'track,artist')

            if (id.error) {
                throw id.error
            }

            let music = await Music.create({
                musicUrl: id
            })

            res.status(200).json(music)
        } catch (err) {
            next(err)
        }
    }

    static async delete (req, res, next) {
        try {
            let music = await Music.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!music) {
                throw {message: 'Music not found', statusCode: 404}
            }

            await Music.destroy({
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json(music)
        } catch (err) {
            next(err)
        }
    }

    static track(req, res, next) {
        const name = req.params.trackId
        const url = `https://api.musixmatch.com/ws/1.1/track.search?q_track=${name}&apikey=${process.env.API_MUSICXMATCH}&page_size=3&page=1&s_track_rating=desc`
        axios({
            method: 'get',
            url: url
        })
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(err => {
            return next(err)
        })

    }

    static lyric(req, res, next) {
        const id = req.params.lyricId
        const url = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.API_MUSICXMATCH}`
        axios({
            method: 'get',
            url: url
        })
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = SpotifyController