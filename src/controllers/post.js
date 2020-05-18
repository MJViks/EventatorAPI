// Data Add Functions

//Import database functions from models
import {createEvent} from '../models/Event' 
import {createEventInfo} from '../models/EventInfo' 
import {createUser, getUserByEventIdandName, getUserByIdandEventId} from '../models/User' 
import {createProduct} from '../models/Product' 
import {createProductGroup} from '../models/ProductGroup' 

import Log from './func/log'
import {auth} from './func/auth'
import crypto from 'crypto'

//Method for creating a new user in an event.
//name: string
export const createUserController = async({name},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {  
	try {
		//Input Validation
		if(typeof name != 'string')
			throw new Error('User create error. Invalid input name.')

		name = name.trim() 
		if(name.length == 0 || name.length > 30)
			throw new Error('User create error. Invalid input name.')
		//Get event and auth
		let event = await auth(0, nameHash, codeHash)
		//delete product
		if(await createUser(name, event.id)){
			let User = await getUserByEventIdandName(event.id, name)            
			//Add log
			await Log(User.id, 'Добавлен в событие')
			return({
				//Server response
				status: 200,
				sucses: 'ok',
				User: {
					id: User.id,
					name: User.name,
					eventId: User.event_id
				}
			})
		}
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//Random Code Generation Function
const getRabdomCode = () =>{
	let rand = 1000 - 0.5 + Math.random() * (9999 - 1000 + 1)
	return '#' + Math.round(rand)
}

//Method for creating a new event
//name,  description, userName: string;  limitations: float; date: string as __.__.____; adminPassHash, editPassHash; string(64)
export const createEventController = async({name,  description, limitations, date, userName},{['admin-pass-hash']: adminPassHash, ['edit-pass-hash']: editPassHash}) =>  { 
	try {  
		//Input Validation
		if(typeof userName !== 'string' || typeof name !== 'string')
			throw new Error('Event create error. Invalid input name or user name.')
		if(typeof adminPassHash !== 'string')
			throw new Error('Event create error. Invalid input admin-pass-hash.')

		if(editPassHash == undefined || editPassHash == 0 || editPassHash == '')
			editPassHash = null
		if(editPassHash != null && (typeof editPassHash !== 'string' || editPassHash.length !== 64))
			throw new Error('Event create error. Invalid input edit-pass-hash.')   

		name = name.trim()
		userName = userName.trim()
		adminPassHash = adminPassHash.trim()
   
		if(userName.length == 0 || userName.length > 30)
			throw new Error('Event create error. Invalid input user name.')
            
		if(adminPassHash.length !== 64)
			throw new Error('Event create error. Invalid input admin-pass-hash.')

		if(name.length == 0 || name.length > 50)
			throw new Error('Event create error. Invalid input name.')

		if(date == undefined || date == '0' || date == '')
			date = null
		if(date != null && date != undefined && date.search(/^\d{2}[.]\d{2}[.]\d{4}$/) !== 0)
			throw new Error('Event create error. Invalid input data. DATA = __.__.____')

		if(limitations == undefined || limitations == 0 || typeof limitations == 'string')
			limitations = null
		if(limitations != null && +limitations < 0)
			throw new Error('Event create error. limitations < 0.')
        
		if(description == undefined || description == '')
			description = null
		if (description != null && description.length > 300)
			throw new Error('Event create error. description > 300.')

		let nameHash = crypto.createHash('sha256').update(name).digest('hex')
		let code = getRabdomCode()
		let codeHash = crypto.createHash('sha256').update(code).digest('hex')

		let eventUnique = false
		try{eventUnique = await auth(0, nameHash, codeHash)}
		// eslint-disable-next-line no-empty
		catch(err){}

		if(eventUnique)
			throw new Error('Formation failed. Try it again.')
        
		let idEventInfo = await createEventInfo(name, nameHash, date, limitations, description)
		let idEvent = await createEvent(adminPassHash, idEventInfo, editPassHash, code, codeHash)
		let userResp = await createUserController({name: userName},{['name-hash']: nameHash, ['code-hash']: codeHash})
		let User = userResp.User
		return({
			//Server response
			status: 200,
			sucses: 'ok',
			EventInfo:{
				id: idEventInfo,
				name: name,
				nameHash: nameHash,
				date: date,
				limitations: limitations,
				description: description
			},
			Event:{
				id: idEvent,
				code: code
			},
			User
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//Method for creating a new product group
//description, name: string; userId: integer
export const createProductGroupController = async({name, description, userId},{['name-hash']: nameHash, ['code-hash']: codeHash, ['edit-pass-hash']: editPassHash}) =>  { 
	try {
		//Input Validation
		userId = +userId
        
		if(description == undefined || description == '')
			description = null
		if (description != null && description.length > 300)
			throw new Error('Product group create error. description > 300.')

		if(typeof name != 'string')
			throw new Error('Product group create error. Invalid input name.')
		name = name.trim() 
		if(name.length == 0 || name.length > 64)
			throw new Error('Product group create error. Invalid input name.')

		//Get event and auth
		let event = await auth(1, nameHash, codeHash, editPassHash)
		await getUserByIdandEventId(userId, event.id)
		//add product group
		let ProductGroupId = await createProductGroup(name, event.id, description)          
		//Add log
		await Log(userId, 'Создана группа ' + name)
            
		return({
			//Server response
			status: 200,
			sucses: 'ok',
			ProductGroup: {
				id: ProductGroupId,
				name: name,
				description: description,
				eventId: event.id,
			}
		})
          
          
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//New Product Creation Method
//name, description: string; price: float; count, productGroupId, userId: integer
export const createProductController = async({name, price, count, description, productGroupId, userId},
	{['name-hash']: nameHash, ['code-hash']: codeHash, ['edit-pass-hash']: editPassHash}) =>  {
	try {
		//Input Validation
		userId = +userId
		productGroupId = +productGroupId
		price = +price
		count = +count
        
		if(isNaN(userId) || isNaN(productGroupId) || isNaN(price) || isNaN(count))
			throw new Error('One of the numerical values ​​is not a number.')
		count = Math.ceil(count)

		if(description == undefined || description == '')
			description = null
		if (description != null && description.length > 300)
			throw new Error('Product create error. description > 300.')

		if(typeof name != 'string')
			throw new Error('Product create error. Invalid input name.')
		name = name.trim() 
		if(name.length == 0 || name.length > 64)
			throw new Error('Product create error. Invalid input name.')

		//Get event and auth
		let event = await auth(1, nameHash, codeHash, editPassHash)
		await getUserByIdandEventId(userId, event.id)
		//add product group
		let ProductId = await createProduct(name, price, count, description, '0', productGroupId)          
		//Add log
		await Log(userId, 'Создан товар ' + name)
            
		return({
			//Server response
			status: 200,
			sucses: 'ok',
			Product: {
				id: ProductId,
				name: name,
				price: price,
				const: count,
				buy: 0,
				description: description,
				productGroupId: productGroupId
			}
		})
          
          
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}