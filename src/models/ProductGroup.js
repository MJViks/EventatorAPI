import DB from '../db'
import chResponse from '../db/chDbResponse'

export default class ProductGroup{
	constructor(id, name, description, eventId){
		this.id = id
		this.name = name
		this.eventId = eventId
		this.description = description
	}
}
//name, description: string; eventId: integer 
export const createProductGroup = async(name, eventId, description) =>{
	let data = await DB.insert('ProductGroup', ['name', 'eventId', 'description'], [name, eventId, description])
	if(chResponse(data, 'Create product group')){
		data = await DB.query('SELECT ident_current(\'ProductGroup\') as id')
		if(chResponse(data, 'Create product group')){        
			data = data.recordset[0].id
			return data
		}
	}
}
  
//idProductGroup: integer
export const deleteProductGroup = async(idProductGroup) =>{
	let data = await DB.delete('ProductGroup', idProductGroup)
	if(chResponse(data, 'Delete product group'))
		return true
}
  
//idProductGroup, eventId: integer; name,  description: string
export const updateProductGroup = async(idProductGroup, name, eventId, description) =>{
	let data = await DB.update('ProductGroup', idProductGroup, ['name', 'eventId', 'description'], [name, eventId, description])
	if(chResponse(data, 'Update product group')){          
		return new ProductGroup(idProductGroup, name, eventId, description)
	}

}
//Getting Product Group by ID
//idProductGroup: integer
export const getProductGroupById = async(idProductGroup) =>{
	let data = await DB.query(`select idProductGroup, name, description, eventId from productGroup where idProductGroup = '${idProductGroup}' AND [ProductGroup].isDelete = '0'`)
	if(chResponse(data, 'Get productGroup')){
		data = data.recordset[0]
		return new ProductGroup(data.idProductGroup, data.name, data.description, data.eventId)
	}
}

//Getting multiple product groups
//eventId, count: integer
export const getProductGroupsByEventId = async(eventId, count) =>{
	let data = await DB.query(`select TOP ${count} idProductGroup, name, description, eventId from productGroup where eventId = '${eventId}' AND [ProductGroup].isDelete = '0'`)
	if(chResponse(data, 'Get product groups')){
		let answer = {}
        
		data.recordset.forEach((element, i) => {
			answer[i] = element
            
		})
		return answer
	}
}