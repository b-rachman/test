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
            shoppingName,
            dataDate,
            dataId,
            dataName
        } = req.body

        var token = req.headers['x-access-token']
        if(!token)
            return res.status(401).send({ auth: false, message: 'TIdak ada token yang diberikan!' })
        jwt.verify(token,Conf.secret,async(err,decode)=>{
            if(err)
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token!'})
            const shop_date = shoppingDate
            const shop_name = shoppingName
            const createddate = dataDate
            const id = dataId
            const data_name = dataName

            const createdShopping = new Shop({
                shopping:{
                    shop_date,
                    shop_name
                },
                data:{
                    createddate,
                    id,
                    data_name
                }
            })

            const savedShopping = await createdShopping.save()

            res.status(200).json({ message: 'Berhasil membuat daftar belanja!' })
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
            const {shop_date}=req.body
            if(shop){
                shop.shop_date = shop_date
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