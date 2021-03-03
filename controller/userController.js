import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../model/user.js'
import Conf from '../utils/config.js'

const userRouter = express.Router()
userRouter.use(express.json())

userRouter.post ('/signup', async (req, res) => {
    try {
       const { username, email,encrypted_password,phone,address,city,country,name,postcode } = req.body
       const findUser = await User.findOne({ username })
        
       if(findUser){
          res.status(201).json({ message: 'Username sudah ada!' })
       } else {
          var saltRounds = 5
          const hashedPassword = await bcrypt.hash(encrypted_password, saltRounds)
                            
          const createdUser = new User({
             "username": username,
             "email":email,
             "encrypted_password": hashedPassword,
             "phone":phone,
             "address":address,
             "city":city,
             "country":country,
             "name":name,
             "postcode":postcode
          })
 
          const savedUser = await createdUser.save()
          res.status(201).json(savedUser)
       }
    } catch (error) {
       res.status(500).json({ error: error })
    }
 })

 userRouter.post('/signin', async(req, res) => {
    try {
       const { email, encrypted_password } = req.body
 
       const currentUser = await new Promise((resolve, reject) => {
          User.find({ 'email': email }, (err, user) => {
             if(err) reject(err);
             resolve(user);
          })
       })
 
       if(currentUser[0]){
          bcrypt.compare(encrypted_password, currentUser[0].encrypted_password).then((result, err) => {
             if(result) {
                if (err) return res.status(500).send('Terdapat masalah ketika login')
                const user = currentUser[0]
                var token = jwt.sign({ user }, Conf.secret, {
                   expiresIn: 1800
                })
                
                res.status(200).send({ email:email, token: token})
             } else {
                res.status(201).json({ 'status': 'Password salah!' })
             }
          })
       } else {
          res.status(201).json({ 'status': 'email not found!' })
       }
    } catch (error) {
       res.status(500).json({ success: false, error: error});
    }
 })

 userRouter.get('/',async(req,res)=>{
    try {
        var token = req.headers['x-access-token']
        if (!token)
            return res.status(401).send({ auth: false, message: 'Tidak ada token yang diberikan!' })
        jwt.verify(token, Config.secret,async(err,decode)=>{
            if(err)
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token!' })
            const users = await User.find({})
            if(users!=null){
                res.json(users)
            } else {
                res.json({
                    message: "User masih kosong"
                })
            }
        })
    } catch (error) {
        res.status(500).json({error:error})
    }
     
 })
 
 
 export default userRouter