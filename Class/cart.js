import {existsSync, promises, readFileSync, writeFileSync} from "fs";

class Cart{
    constructor() {
        this.path = "./carrito.json"

        if(!existsSync(this.path)){
            writeFileSync(this.path,JSON.stringify([]))
        }
        this.carritos = JSON.parse(readFileSync(this.path,'utf-8'))

        this.id = this.carritos.length !== 0 ? [...this.carritos].pop().id : 0
    }
    async addCart(){
        this.carritos.push({
            id: ++this.id,
            products: []
        })

        await promises.writeFile(this.path, JSON.stringify(this.carritos))
    }

    getCartProducts(cid){
        const cart = this.carritos.find(cart => cart.id === cid)

        return cart.products
    }

    async addProductToCart(cid,pid) {

        let targetCart = this.carritos.find(cart => cart.id === cid)

        if(!targetCart){
            throw Error('The cart was not found')
        }

        const cartIndex = this.carritos.indexOf(targetCart)
        let products = [...targetCart.products]
        const productIndex = products.findIndex(prod => prod.pid === pid)

        if(productIndex >= 0){
            products[productIndex].quantity++
        }else{
            products.push({
                "pid":pid,
                quantity:1
            })
        }

        this.carritos[cartIndex].products = products

        await promises.writeFile(this.path,JSON.stringify(this.carritos))
    }
}

export default Cart