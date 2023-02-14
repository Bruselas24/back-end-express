import express from "express";
import Cart from "../Class/cart.js";

const carrito = new Cart()
const cartRouter = express.Router()

cartRouter.use(express.json())
cartRouter.use(express.urlencoded({extended:true}))

cartRouter.post('/', async(req,res) =>{
    await carrito.addCart()

    res.send("Cart was generated successfully")
})

cartRouter.get('/:cid',(req,res) => {

    const products = carrito.getCartProducts(parseInt(req.params.cid))

    res.send(products)
})

cartRouter.post('/:cid/product/:pid', async(req,res) => {




    try{
        await carrito.addProductToCart(parseInt(req.params.cid),parseInt(req.params.pid))
        res.send('The product was successfully added to the cart')
    }catch (e) {
        res.send({
            status:"error",
            error: e.message
        })
    }

})
export default cartRouter