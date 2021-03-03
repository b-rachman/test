import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
{
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    encrypted_password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    postcode: {
        type: String,
        required: true,
    }


},
{
    timestamps: true,
})

const User = mongoose.model('User', userSchema)

export default User