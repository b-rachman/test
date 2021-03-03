import mongoose from 'mongoose'

const shopSchema = mongoose.Schema(
{
    shopping:{
        shop_date:{
            type:String,
            required:true
        },
        shop_name:{
            type:String,
            required:true
        }
    },
    data :{
        createddate:{
            type:String,
            required:true
        },
        id:{
            type:String,
            required:true
        },
        data_name:{
            type:String,
            required:true
        }
    }

},
{
    timestamps: true,
})

const Shop = mongoose.model('Shop', shopSchema)

export default Shop