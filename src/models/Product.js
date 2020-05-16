import DB from '../db'
import chResponse from '../db/chDbResponse'

//Product class
export default class Product{
	constructor(id, name, price, count, description, buy, productGroupId){
		this.id = id
		this.name = name
		this.price = price
		this.count = count
		this.description = description
		this.buy = buy
		this.productGroupId = productGroupId
	}
}
//description, name: string; price: float; productGroupId, count: integer; buy: bool
export const createProduct = async(name, price, count, description, buy, productGroupId) =>{
	let data = await DB.insert('Product', ['name', 'price', 'count', 'description', 'buy', 'productGroupId'], [name, price, count, description, buy, productGroupId])
	if(chResponse(data, 'Create product')){
		data = await DB.query('SELECT ident_current(\'Product\') as id')
		if(chResponse(data, 'Create product')){        
			data = data.recordset[0].id
			return data
		}
	}
}
//idProduct: integer
export const deleteProduct = async(idProduct) =>{
	let data = await DB.delete('Product', idProduct)     
           
	if(chResponse(data, 'Delete product'))
		return true
}
  
//count, idProduct, productGroupId: integer; description, name: string; price: float; buy: bool 
export const updateProduct = async(idProduct, name, price, count, description, buy, productGroupId) =>{
	let data =  await DB.update('Product', idProduct, ['name', 'price', 'count', 'description', 'buy', 'productGroupId'], [name, price, count, description, buy, productGroupId])
	if(chResponse(data, 'Update product')){
		return new Product(idProduct, name, price, count, description, buy, productGroupId)
	}
}
//idProduct: integer
export const getProductById = async(idProduct) =>{
	let data =  await DB.query(`select idProduct, name, price, count, description, buy, productGroupId from product where idProduct = '${idProduct}' AND [Product].isDelete = '0'`)
	if(chResponse(data, 'Get product')){
		data = data.recordset[0]
		if(data)
			return new Product(data.idProduct, data.name, data.price, data.count, data.description, data.buy, data.productGroupId)
	}
}
//idProduct: integer; buy: bool
export const setProductBuy = async(idProduct, buy) =>{
	let data =  await DB.update('Product', idProduct, ['buy'], [buy])
	if(chResponse(data, 'Update product')){
		return await getProductById(idProduct)
	}
}

//Getting the product by event ID and ID
//idProduct, eventId: integer
export const getProductByIdandEventId = async(idProduct, eventId) =>{
	let data =  await DB.query(`select idProduct, [Product].name, price, count, [Product].description, buy, productGroupId 
    from product join ProductGroup on idProductGroup = ProductGroupId where idProduct = '${idProduct}' AND eventId = ${eventId} AND [Product].isDelete = '0'`)
	if(chResponse(data, 'Get product')){
        
		data = data.recordset[0]
		return new Product(data.idProduct, data.name, data.price, data.count, data.description, data.buy, data.productGroupId)
	}
}
//Getting Products from a Product Group
//productGroupId, count: integer
export const getProductsByProductGroupId = async(productGroupId, count) =>{    
	let data =  await DB.query(`select TOP ${count} idProduct, [Product].name, price, count, [Product].description, buy 
    from product where ProductGroupId = '${productGroupId}' AND [Product].isDelete = '0'`)
	if(chResponse(data, 'Get product')){   
        
		let answer = {}
		data.recordset.forEach((element, i) => {
			answer[i] = element
            
		})
		return answer
	}
}
//Receiving all event products
//eventId, count: integer
export const getProductsByEventId = async(eventId, count) =>{
	let data = await DB.query(`select TOP ${count} idProduct, [Product].name, price, count, [Product].description, buy, productGroupId from product
    join productGroup on productGroupId = idProductGroup
     where eventId = '${eventId}' AND [Product].isDelete = '0'`)
	if(chResponse(data, 'Get products')){
		let answer = {}
        
		data.recordset.forEach((element, i) => {
			answer[i] = element
            
		})
		return answer
	}
}