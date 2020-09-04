class IndexController {
    static home (req,res,next){
        res.send('Hello World!')
    }
}

module.exports =IndexController