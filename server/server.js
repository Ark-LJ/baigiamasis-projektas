import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import user from './models/user' //atkreipt demesi ir pakeist jeigu modelio name is didziosios raides ar ne
import jwt from 'jsonwebtoken'

dotenv.config()

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// speju cia front-endas tures isimest situos poto kur ir kada reikes?
// also, ar cia gali but jie ar atskiram faile kelt check ir auth?
const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'secret', async(err, decodedToken) =>{
            if(err){
                res.locals.user = null
                next()
            } else {
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
            
        })
    } else {
        res.locals.user = null
        next()
    }
}

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'secret', (err, decodedToken) =>{
            if(err){
                console.log(err.message)
                res.redirect('/')
            } else {
                next()
            }
            })
            } else {
            res.redirect('/')
    }
}

//testing if it works
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app!'})
})

// db connect
mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((err) => console.log(err))


