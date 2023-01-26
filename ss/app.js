import express from 'express'
import db from './config/config.js'
import userRoute from './router/api.js'
import CORS from 'cors'
const app = express()

db()
app.use(CORS)

app.use('/',userRoute)
app.listen(3001,()=>console.log(" Running"))