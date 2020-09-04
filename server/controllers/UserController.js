const { User, Music } = require('../models')
const mail = require('../helpers/mailgun')
const { isValid } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

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
    static googleLogin (req,res,next){
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const {google_access_token} = req.headers
        let email_google
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            return ticket.getPayload()
        })
        .then(payload => {
            email_google = payload.email
            return User.findOne({where:{email:payload.email}})
        })
        .then(user=>{
            if(!user){
                return User.create({
                    email: email_google,
                    password: 'password'
                })
            }else{
                return user
            }
        })
        .then(user=>{
            const payload = {email:user.email, id: user.id}
            const access_token = tokenGenerator(payload)

            return res.status(200).json({access_token})
        })
        .catch(err=>{
            next(err)
            console.log(err)
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
