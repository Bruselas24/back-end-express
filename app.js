import ProductManager from "./productManager.js";
import express from 'express'

const app = express()
const pm = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Server routes
app.get('/products', (req,res) =>{
    if(!req.query){
        res.send(pm.getProducts())
    }
    const {limit} = req.query
    res.send(pm.getProducts().slice(0,limit))
})

app.get('/products/:id', (req,res) => {
    res.send(pm.getProductById(parseInt(req.params.id)))
})

//Server Config
const PORT = 8080
app.listen(PORT,() => {
    console.log('Server listening on ports: ',PORT)
})