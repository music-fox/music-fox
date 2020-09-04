const {Music} = require('../models')
// const { getSpotifyAccessToken } = require('..//spotify')

class SpotifyController {
    static async search (req, res, next) {
        try {
            let {query, type} = req.body
            

            
        } catch (err) {
            res.send(err)
        }
    }
}

module.exports = SpotifyController