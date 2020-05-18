//The file contains all the functions of data acquisition methods

import {auth} from './func/auth'
import config from '../../appConfig.json'
//Import methods for obtaining data from a database from models
import {getEventInfoByEventId} from '../models/EventInfo'
import {getProductGroupsByEventId, getProductGroupById} from '../models/ProductGroup'
import {getProductByIdandEventId, getProductsByProductGroupId, getProductsByEventId} from '../models/Product'
import {getLogsByEventId, getLogsByUserId} from '../models/Log'
import {getUserByLogId, getUsersByEventId, getUserByIdandEventId} from '../models/User'

//A method of obtaining data about an event that is identified.
// Optional: Receiving receipt of product groups included in the event
//depth: bool
export const getEventInfoController = async({depth},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
	try {
		//Get event and auth
		let event = await auth(0, nameHash, codeHash)
		//Input Validation
		if(depth === 1 || depth === '1' || depth === 'true')    
			depth = true
		if(depth === 0 || depth === '0' || depth === 'false')    
			depth = false

		let EventInfo = await getEventInfoByEventId(event.id)
		EventInfo.nameHash = '***'
        
		if(depth){
			//Adding Nested Information
			EventInfo.ProdictGroups = await getProductGroupsByEventId(event.id, config.api.getConstreint)
			for (let ProductGroup in  EventInfo.ProdictGroups)
				EventInfo.ProdictGroups[ProductGroup]['products'] = 
                await getProductsByProductGroupId(EventInfo.ProdictGroups[ProductGroup].idProductGroup, config.api.getConstreint)
		}
            
		return({
			//Server response
			status: 200,
			sucses: 'ok',
			EventInfo
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}

//The function of obtaining information about product groups of an identified event. 
//Optional: receiving product information in a product group.
//count: integer; depth: bool
export const getProductGroupsController = async({count, depth},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
	try {
		//Input Validation
		count = +count
		if(isNaN(count) || count > config.api.getConstreint)
			throw new Error('invalid input data.')
		count = Math.floor(count)

		if(depth === 1 || depth === '1' || depth === 'true')    
			depth = true
		if(depth === 0 || depth === '0' || depth === 'false' || depth === undefined)    
			depth = false

		//Get event and auth
		let event = await auth(0, nameHash, codeHash)
		let ProductGroups = await getProductGroupsByEventId(event.id, count)
		if(depth)
		//Adding Nested Information
			for (let ProductGroup in  ProductGroups)
				ProductGroups[ProductGroup]['products'] = await getProductsByProductGroupId(ProductGroups[ProductGroup].idProductGroup, config.api.getConstreint)

		return({
			//Server response
			status: 200,
			sucses: 'ok',
			ProductGroups
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//The method of obtaining information about a specific group of products.
// Optional: Obtaining product information in product groups.
//id: integer; depth: bool
export const getProductGroupController = async({id, depth},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
	try {
		//Input Validation
		id = +id
		if(isNaN(id))
			throw new Error('invalid input data.')
		if(depth === 1 || depth === '1' || depth === 'true')    
			depth = true
		if(depth === 0 || depth === '0' || depth === 'false' || depth === undefined)    
			depth = false
		//Get event and auth
		await auth(0, nameHash, codeHash)
         
		let ProductGroup = await getProductGroupById(id)
		if(depth)
		//Adding Nested Information
			ProductGroup['products'] = await getProductsByProductGroupId(id, config.api.getConstreint)
		return({
			//Server response
			status: 200,
			sucses: 'ok',
			ProductGroup
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//The method of obtaining information about a specific product.
//id: integer
export const getProductController = async({id},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
	try {
		//Input Validation
		id = +id
        
		if(isNaN(id))
			throw new Error('invalid input data.')
		id = Math.floor(id)
        
		//Get event and auth
		let event = await auth(0, nameHash, codeHash)
       
		let Product = await getProductByIdandEventId(id, event.id)
		return({
			//Server response
			status: 200,
			sucses: 'ok',
			Product
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//The method of obtaining information about the products of an event.
//count: integer
export const getProductsController = async({count},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
	try {
		//Input Validation
		count = +count
        
		if(isNaN(count) || count > config.api.getConstreint)
			throw new Error('invalid input data.')
		count = Math.floor(count)
		//Get event and auth

		let event = await auth(0, nameHash, codeHash)
		let Products = await getProductsByEventId(event.id, count)

		return({
			//Server response
			status: 200,
			sucses: 'ok',
			Products
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//Method for obtaining information about event logs.
//Optional: Getting information about users in the logs.
//count: integer; depth: bool
export const getLogsController = async({count, depth},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
	try {
		//Input Validation
		count = +count

		if(depth === 1 || depth === '1' || depth === 'true')    
			depth = true
		if(depth === 0 || depth === '0' || depth === 'false' || depth === undefined)    
			depth = false

		if(isNaN(count) || count > config.api.getConstreint)
			throw new Error('invalid input data.')
		count = Math.floor(count)
		//Get event and auth

		let event = await auth(0, nameHash, codeHash)
		let Logs = await getLogsByEventId(event.id, count)
		if(depth)
		//Adding Nested Information
			for (let Log in Logs)
				Logs[Log]['User'] = await getUserByLogId(Logs[Log].idLog, config.api.getConstreint)


		return({
			//Server response
			status: 200,
			sucses: 'ok',
			Logs
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//The method of obtaining information about users in the event.
// Optional: Getting information about
//count: integer; depth: bool
export const getUsersController = async({count, depth},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
	try {
		//Input Validation
		count = +count

		if(depth === 1 || depth === '1' || depth === 'true')    
			depth = true
		if(depth === 0 || depth === '0' || depth === 'false' || depth === undefined)    
			depth = false

		if(isNaN(count) || count > config.api.getConstreint)
			throw new Error('invalid input data.')
		count = Math.floor(count)
		//Get event and auth

		let event = await auth(0, nameHash, codeHash)
		let Users = await getUsersByEventId(event.id, count)
		if(depth)
		//Adding Nested Information
			for (let User in Users)
				Users[User]['logs'] = await getLogsByUserId(Users[User].idUser, config.api.getConstreint)


		return({
			//Server response
			status: 200,
			sucses: 'ok',
			Users
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//A method of obtaining information from a specific user in an event.
// Optional: Getting information about
//id: integer; depth: bool
export const getUserController = async({id, depth},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
	try { 
		//Input Validation  
		id = +id
        
		if(isNaN(id))
			throw new Error('invalid input data.')
		id = Math.floor(id)
		if(depth > 1 || depth === '1' || depth === 'true')    
			depth = true
		if(depth === 0 || depth === '0' || depth === 'false' || depth === undefined)    
			depth = false

		//Get event and auth

		let event = await auth(0, nameHash, codeHash)
		let User = await getUserByIdandEventId(id, event.id)
		if(depth)
		//Adding Nested Information
			User['logs'] = await getLogsByUserId(User.id, config.api.getConstreint)
		return({
			//Server response
			status: 200,
			sucses: 'ok',
			User
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//Verification of event identification.
export const getAuth = async({['name-hash']: nameHash, ['code-hash']: codeHash, ['edit-pass-hash']: editPassHash, ['admin-pass-hash']: adminPassHash}) =>  {
	try {  
		//Input Validation 
		let event
		if(editPassHash != '' && editPassHash != undefined)
			event = await auth(1, nameHash, codeHash, editPassHash)
		if(adminPassHash != '' && adminPassHash != undefined)
			event = await auth(2, nameHash, codeHash, adminPassHash)
		if (!event)
			throw new Error('Invalid auth')
            
            
		return({
			//Server response
			status: 200,
			sucses: 'ok'
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}