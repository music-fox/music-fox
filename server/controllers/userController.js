const { User, Music } = require('../models')
const mail = require('../helpers/mailgun')
const { isValid } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')

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
    static list (req,res,next){
        User.findAll()
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(err=>{
            next(err)
        })
    }
    static showById (req,res,next){
        User.findOne({
            include: [Music],
            where:{
                id:req.params.id
            }
        })
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = UserController