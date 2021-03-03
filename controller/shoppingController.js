import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Shop from '../model/shopping.js'
import Conf from '../utils/config.js'
import bodyParser from 'body-parser'

const shopRouter = express.Router()
shopRouter.use(bodyParser.urlencoded({extended:false}))
shopRouter.use(bodyParser.json())

shopRouter.post('/create',async(req,res)=>{
    try {
        const{
            shoppingDate,
            shoppingName
        } = req.body

        var token = req.headers['x-access-token']
        if(!token)
            return res.status(401).send({ auth: false, message: 'TIdak ada token yang diberikan!' })
        jwt.verify(token,Conf.secret,async(err,decode)=>{
            if(err)
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token!'})
            const createddate = shoppingDate
            const name = shoppingName

            const createdShopping = new Shop({
                shopping:{
                    createddate,
                    name
                }
            })
            const savedShopping = await createdShopping.save()

            res.status(200).json({ data:{"createddate":createddate,"name":name} })
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

shopRouter.get('/',async(req,res)=>{
    try {
        var token = req.headers['x-access-token']
        if (!token)
            return res.status(401).send({ auth: false, message: 'Tidak ada token yang diberikan!' })
        jwt.verify(token, Config.secret,async(err,decode)=>{
            if(err)
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token!' })
            
            const shop = await Shop.find({})
            if(shop!=null){
                res.json(shop)
            } else {
                res.json({
                    message: "Belum ada daftar belanja"
                })
            }
        })
    } catch (error) {
        res.status(500).json({error:error})
    }
})

shopRouter.get('/:id',async(req,res)=>{
    try {
        var token = req.headers['x-access-token']
        if (!token)
            return res.status(401).send({ auth: false, message: 'Tidak ada token yang diberikan!' })
        jwt.verify(token, Config.secret,async(err,decode)=>{
            if(err)
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token!' })
            
            const shop = await Shop.findById(req.params.id)
            if(shop!=null){
                res.json(shop)
            } else {
                res.json({
                    message: "Belum ada daftar belanja"
                })
            }
        })
    } catch (error) {
        res.status(500).json({error:error})
    }
})

shopRouter.put('/:id',async(req,res)=>{
    try {
        var token = req.headers['x-access-token']
        if (!token)
            return res.status(401).send({ auth: false, message: 'Tidak ada token yang diberikan!' })
        jwt.verify(token, Config.secret,async(err,decode)=>{
            if(err)
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token!' })
            
            const shop = await Shop.findById(req.params.id)
            const {createddate,name}=req.body
            if(shop){
                shop.createddate = createddate
                shop.name = name
                const updateShop = await shop.save()
                res.status(200).send(updatedShop)
            } 
            res.status(404).json({
                message:"data tidak ditemukan"
            })
        })
    } catch (error) {
        res.status(500).json({error:error})
    }
})

shopRouter.delete('/:id',async(req,res)=>{
    try {
        var token = req.headers['x-access-token']
        if (!token)
            return res.status(401).send({ auth: false, message: 'Tidak ada token yang diberikan!' })
        jwt.verify(token, Config.secret,async(err,decode)=>{
            if(err)
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token!' })
            
            const shop = await Shop.findById(req.params.id)
            if(shop){
                await shop.remove()
                res.json({
                    message:"Daftar belanja terhapus"
                })
            } else{
                res.status(404).json({
                    message:"data tidak ditemukan"
                })
            }
        })
    } catch (error) {
        res.status(500).json({error:error})
    }
})

export default shopRouter
