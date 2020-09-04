const {Music} = require('../models')
const spotifySearch = require('../helpers/spotify')

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
}

module.exports = SpotifyController