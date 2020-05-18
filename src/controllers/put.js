//Data Change Functions

//Import methods for changing database data from models
import {setProductBuy} from '../models/Product' 
import {updateEventInfo} from '../models/EventInfo' 
import {getUserByIdandEventId} from '../models/User' 
import {updateEditPassEvent, updateAdminPassEvent} from '../models/Event'
import {updateProductGroup} from '../models/ProductGroup' 

import Log from './func/log'
import {auth} from './func/auth'
import crypto from 'crypto'
//Product Group Information Update Method
//id, userId: integer; name, description: string
export const updateProductGroupController = async({id, name, description, userId},
	{['name-hash']: nameHash, ['code-hash']: codeHash, ['edit-pass-hash']: editPassHash}) =>  {
	try {
		//Input Validation
		userId = +userId
		id = +id
		if(isNaN(userId) || isNaN(id))
			throw new Error('One of the id ​​is not a number.')

		if(description == undefined || description == '')
			description = null
		if (description != null && description.length > 300)
			throw new Error('Product group update error. description > 300.')

		if(typeof name != 'string')
			throw new Error('Product group update error. Invalid input name.')
		name = name.trim() 
		if(name.length == 0 || name.length > 64)
			throw new Error('Product group update error. Invalid input name.')

		//Get event and auth
		let event = await auth(1, nameHash, codeHash, editPassHash)
		await getUserByIdandEventId(userId, event.id)
		//edit product group
         
		let ProductGroup = await updateProductGroup(id, name, event.id, description)   
               
       
		//Add log
		await Log(userId, 'Обнавлена группа товаров ' + ProductGroup.name)
            
		return({
			//Server response
			status: 200,
			success: 'ok',
			ProductGroup
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//Method for changing product purchase status
//id: integer; buy: bool
export const setProductBuyController = async({id, buy},
	{['name-hash']: nameHash, ['code-hash']: codeHash, ['edit-pass-hash']: editPassHash}) =>  {
	try {
		//Input Validation
		id = +id
		if(isNaN(id) || buy === undefined)
			throw new Error('Id ​​is not a number.')
            
		if(buy === 1 || buy === '1' || buy === true)    
			buy = 'true'
		if(buy === 0 || buy === '0' || buy === false)    
			buy = 'false'
		//Get event and auth
		await auth(1, nameHash, codeHash, editPassHash)
             
		let Product = await setProductBuy(id, buy)   
                
		return({
			//Server response
			status: 200,
			success: 'ok',
			Product
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//Method for changing identifiable event information
//name, description: string; date: string as __.__.____; limitations: float; userId: integer
export const updateEventInfoController = async({name, date, limitations, description, userId},
	{['name-hash']: nameHash, ['code-hash']: codeHash, ['admin-pass-hash']: adminPassHash}) =>  {
	try {
		//Input Validation
		userId = +userId
		if(description == undefined || description == '')
			description = null
		if (description != null && description.length > 300)
			throw new Error('Product group update error. description > 300.')
    
		if(typeof name != 'string')
			throw new Error('Product group update error. Invalid input name.')
		name = name.trim() 
		if(name.length == 0 || name.length > 64)
			throw new Error('Product group update error. Invalid input name.')
    
		if(date == undefined || date == '0' || date == '')
			date = null
		if(date != null && date != undefined && date.search(/^\d{2}[.]\d{2}[.]\d{4}$/) !== 0)
			throw new Error('Event create error. Invalid input data. DATA = __.__.____')
		if(limitations == undefined || limitations == 0 || typeof limitations == 'string')
			limitations = null
		if(limitations != null && +limitations < 0)
			throw new Error('Event create error. limitations < 0.')
		//Get event and auth
		let event = await auth(2, nameHash, codeHash, adminPassHash)
		await getUserByIdandEventId(userId, event.id)
		//edit Event info
		nameHash = crypto.createHash('sha256').update(name).digest('hex')
		let EventInfo = await updateEventInfo(event.id, name, nameHash, date, limitations, description)   
		//Add log
                
		await Log(userId, 'Обнавлена информация о событии')
            
		EventInfo.nameHash = '***'
		return({
			//Server response
			status: 200,
			success: 'ok',
			EventInfo
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//Change the edit password for an event
//newEditPassHash: string(64)
export const updateEditPassController = async({newEditPassHash},
	{['name-hash']: nameHash, ['code-hash']: codeHash, ['admin-pass-hash']: adminPassHash}) =>  {
	try {
		//Input Validation
		if(typeof newEditPassHash != 'string' || newEditPassHash.length !== 64)
			throw new Error('Invalid data')
		newEditPassHash.trim()
		//Get event and auth
		let event = await auth(2, nameHash, codeHash, adminPassHash)
		//edit editPassHash
             
		await updateEditPassEvent(event.id, newEditPassHash)   
                
		return({
			//Server response
			status: 200,
			success: 'ok',
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//Change the administration password for an event
//newAdminPassHash: string(64)
export const updateAdminPassController = async({newAdminPassHash},
	{['name-hash']: nameHash, ['code-hash']: codeHash, ['admin-pass-hash']: adminPassHash}) =>  {
	try {
		//Input Validation
		if(typeof newAdminPassHash != 'string' || newAdminPassHash.length !== 64)
			throw new Error('Invalid data')
		newAdminPassHash.trim()
		//Get event and auth
              
		let event = await auth(2, nameHash, codeHash, adminPassHash)
             
		await updateAdminPassEvent(event.id, newAdminPassHash)   
                
		return({
			//Server response
			status: 200,
			success: 'ok',
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
