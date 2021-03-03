import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import userRouter from './controller/userController.js'
import shopRouter from './controller/shoppingController.js'

const app = express()
mongoose.connect('mongodb://localhost:27017/technical', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to MongoDB Successful!')
}).catch(err => {
    console.log('Failed to Connect Database')
    console.log(err)
})

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: "Success!" })
})

app.use('/api/users',userRouter)
app.use('api/shopping',shopRouter)

const port = 4000
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})