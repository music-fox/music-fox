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
    static login(req,res, next){
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user=>{
            if(user){
                let check = isValid(req.body.password,user.password)
                if(check){
                    let access_token = tokenGenerator(user)
                    res.status(200).json({access_token})
                }else{
                    throw {message: "Invalid Email or Password", statusCode: 400}
                }
            }else{
                throw {message: "Invalid Email or Password", statusCode: 400}
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = UserController