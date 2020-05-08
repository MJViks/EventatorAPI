import DB from '../db'
import chResponse from '../db/chDbResponse'

export default class Product{
    #id;
    constructor(id, name, price, count, description, buy, productGroup_id){
        this.#id = id;
        this.name = name;
        this.price = price;
        this.count = count;
        this.description = description;
        this.buy = buy;
        this.productGroup_id = productGroup_id
    }
    get id(){
        return this.#id;
      }
}

export const createProduct = async(name, price, count, description, buy, ProductGroupid) =>{
        let data = await DB.insert('Product', ['name', 'price', 'count', 'description', 'buy', 'productGroup_id'], [name, price, count, description, buy, ProductGroupid])
        if(chResponse(data, 'Create product')){
            data = await DB.query(`SELECT ident_current('Product') as id`)
            if(chResponse(data, 'Create product')){        
                data = data.recordset[0].id
                return data
            }
        }
  }
  
  export const deleteProduct = async(id_Product) =>{
        let data = await DB.delete('Product', id_Product)        
        if(chResponse(data, 'Delete product'))
            return true
  }
  
  export const updateProduct = async(idProduct, name, price, count, description, buy, ProductGroupid) =>{
        let data =  await DB.update('Product', idProduct, ['name', 'price', 'count', 'description', 'buy', 'productGroup_id'], [name, price, count, description, buy, ProductGroupid])
        if(chResponse(data, 'Update product')){
            return new Product(idProduct, name, price, count, description, buy, ProductGroupid)
        }
  }

  export const getProductById = async(idProduct) =>{
    let data =  await DB.query(`select id_Product, name, price, count, description, buy, productGroup_id from product where id_Product = '${idProduct}' AND [Product].idDelete = '0'`)
    if(chResponse(data, 'Get product')){
        data = data.recordset[0]
        return new Product(data.id_Product, data.name, data.price, data.count, data.description, data.buy, data.productGroup_id)
    }
}

export const setProductBuy = async(idProduct, buy) =>{
    let data =  await DB.update('Product', idProduct, ['buy'], [buy])
    if(chResponse(data, 'Update product')){
        return await getProductById(idProduct)
    }
}