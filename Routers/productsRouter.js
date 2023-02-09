import ProductManager from "../Class/productManager.js";
import express from 'express'

const pm = new ProductManager()
const productsRouter = express.Router()

productsRouter.use(express.json())
productsRouter.use(express.urlencoded({extended:true}))

//Server routes
productsRouter.get('/', async(req,res) =>{
    const products = await pm.getProducts()

    if(!req.query){
        res.send(products)
    }
    const {limit} = req.query
    res.send(products.slice(0,limit))
})

productsRouter.get('/:id', async(req,res) => {

    const product = await pm.getProductById(parseInt(req.params.id))

    if(!product){
        res.status(404).send({
            status:"error",
            error:"Product not found"
        })
    }

    res.send(product)
})

productsRouter.post('/',async (req,res) => {
    let message

    try{
        await pm.addProduct(req.body)

        message = {
            status:"success",
            info:"The product was added successfully"
        }
        res.status(201)

    }catch (e){

        message = {
            status: "error",
            error: e.message,
        }
        res.status(418)

    }finally {
        res.send(message)
    }
})

productsRouter.put('/',async (req,res) => {

    const {pid,field,newValue} = req.body
    let message

    try{
        await pm.updateProduct(pid,field,newValue)

        message = {
            status:"success",
            info:"The product was modified successfully"
        }
        res.status(201)

    }catch (e){
        message = {
            status: "error",
            error: e.message,
        }
        res.status(418)

    }finally {
        res.send(message)
    }
})

productsRouter.delete('/:id', async (req,res) => {

    let message

    try{
        await pm.deleteProduct(parseInt(req.params.id))

        message = {
            status:"success",
            info:"The product was deleted successfully"
        }
        res.status(200)

    }catch (e){

        message = {
            status:"error",
            error: e.message
        }
        res.status(200)

    }

    res.send(message)
})

export default productsRouter