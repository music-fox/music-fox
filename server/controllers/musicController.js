const {Music} = require('../models')
const { spotifySearch, musxmatSearch } = require('../helpers/music')

class SpotifyController {
    static async add (req, res, next) {
        try {
            let {track, artist} = req.body

            let spotifyQuery = `${track} ${artist}`
            let spotifyId = await spotifySearch(req.spotifyToken, spotifyQuery)

            if (spotifyId.error) {
                throw spotifyId.error
            }

            let musxmatId = await musxmatSearch(track, artist)

            let music = await Music.create({
                spotifyId, musxmatId
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