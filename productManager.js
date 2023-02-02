import {existsSync, readFileSync, writeFileSync} from "fs";

class ProductManager{
    constructor() {
        this.path = './productManager.txt'
        this.id = 0

        if(!(existsSync(this.path))){
            writeFileSync(this.path,JSON.stringify([]))
        }

        this.products = JSON.parse(readFileSync(this.path,'utf-8'))
    }

    addProduct(newProduct){

        this.products.forEach(prod => {
            if(prod.code === newProduct.code){
                throw Error('Repeated product code')
            }
        })
        newProduct.id = this.id++
        this.products.push(newProduct)
       writeFileSync(this.path,JSON.stringify(this.products))
    }

    getProducts(){
        return JSON.parse(readFileSync(this.path,'utf-8'))
    }

    getProductById(pid){
        return this.products[pid]
    }

    updateProduct(pid,field,newValue){

        if(field === 'id') throw Error('the ID can´t be modified')

        this.products[pid][field] = newValue
        writeFileSync(this.path,JSON.stringify(this.products))
    }

    deleteProduct(pid){

        if(!this.products[pid]) throw Error('Product does not exist')

        this.products.splice(pid,1)
        writeFileSync(this.path, JSON.stringify(this.products))
    }
}

export default ProductManager