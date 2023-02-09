import express from 'express'
import productsRouter from './Routers/productsRouter.js'

const app = express()
app.use('/products',productsRouter)

//Server Config
const PORT = 8080
app.listen(PORT,() => {
    console.info('Server listening on ports: ',PORT)
})

app.on('error', (err) => {
    console.error('error: ',err)
})