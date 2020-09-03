const {User, Music} = require('../models')
const { isValid } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')

class UserController {
    static list (req,res,next){
        User.findAll()
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(err=>{
            next(err)
        })
    }
    static login(req,res,next){
        User.findOne({where:{email: req.body.email}})
        .then(user=>{
            if(user){
                let valid = isValid(req.body.password, user.password)
                if(valid){
                    let access_token = tokenGenerator(user)
                    let id = user.id
                    let email = user.password

                    res.status(200).json(id,email,access_token)
                }
            }else{
                res.status(400).json({message: 'Invalid Username or Password'})
            }
        })
        .catch(err=>{
            res.status(400).json({message: 'Invalid Username or Password'})
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
    static register(req,res,next){
        
    }
}

module.exports = UserController
