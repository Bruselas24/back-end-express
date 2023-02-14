import express from 'express'
import productsRouter from './Routers/productsRouter.js'
import cartRouter from "./Routers/cartRouter.js";

const app = express()
app.use('/products',productsRouter)
app.use('/cart',cartRouter)

//Server Config
const PORT = 8080
app.listen(PORT,() => {
    console.info('Server listening on ports: ',PORT)
})

app.on('error', (err) => {
    console.error('error: ',err)
})