import {existsSync, promises, readFileSync, writeFileSync} from "fs";

class ProductManager{
    constructor() {
        this.path = './productos.json'

        if(!existsSync(this.path)){
            writeFileSync(this.path,JSON.stringify([]))
        }
        this.products = JSON.parse(readFileSync(this.path,'utf-8'))

        this.id = [...this.products].pop().id
    }

    async addProduct(newProduct){

        const {title,description,code,price,status,stock,category} = newProduct

        if(!(title && description && code && price && typeof status == "boolean" && stock && category)){
            throw Error('Incomplete data')
        }

        this.products.forEach(prod => {
            if(prod.code === newProduct.code){
                throw Error('Repeated product code')
            }
        })

        if(!(newProduct.status === true || newProduct.status === false)){
            newProduct.status = true
        }

        newProduct.id = ++this.id
        this.products.push(newProduct)
        await promises.writeFile(this.path,JSON.stringify(this.products))
    }

    async getProducts(){
        return JSON.parse(await promises.readFile(this.path,'utf-8'))
    }

    getProductById(pid){
        return this.products.find((product => product.id === pid))
    }

    async updateProduct(pid,field,newValue){

        if(field === 'id') throw Error('the ID can´t be modified')

        this.getProductById(pid)[field] = newValue
        await promises.writeFile(this.path,JSON.stringify(this.products))
    }

    async deleteProduct(pid){

        const productIndex = this.products.indexOf(this.getProductById(pid))

        if(!(productIndex > -1)) throw Error('Product does not exist')

        this.products.splice(productIndex,1)
        await promises.writeFile(this.path, JSON.stringify(this.products))
    }
}

export default ProductManager