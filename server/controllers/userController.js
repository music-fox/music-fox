const { User } = require('../models')
const mail = require('../helpers/mailgun')

class UserController {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            const newUser = await User.create({username, email, password})
            mail(newUser.email)
            return res.status(201).json({
                id: newUser.id,
                email: newUser.email
            })
        } catch (err) {
            return next(err)
        }

    }

}

module.exports = UserController