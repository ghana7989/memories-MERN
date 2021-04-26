import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'

import postRoutes from './routes/posts.js'

const app = express()

app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))

import dotenv from 'dotenv'
dotenv.config()

app.use(cors())

app.use('/posts', postRoutes)

// const CONNECTION_URL = process.env.MONGO_URI

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}
const PORT = process.env.PORT || 5000

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(PORT))
	.catch(error => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
