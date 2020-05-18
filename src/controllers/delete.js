//The file contains all the functions of the removal methods

import {auth} from './func/auth'
import Log from './func/log'
//Import database methods from models
import {deleteProduct, getProductById} from '../models/Product'
import {getUserByIdandEventId} from '../models/User'
import {deleteEvent} from '../models/Event'
import {getProductGroupById, deleteProductGroup} from '../models/ProductGroup'

//The controller checks for the presence of the product, checks for the presence of
// the user in the event, deletes the product, and writes this to the action log
//id: integer; userId: integer
export const deleteProductController = async({id, userId},{['name-hash']: nameHash, ['code-hash']: codeHash, ['edit-pass-hash']: editPassHash}) =>  {  
	try {  
		//Validation of input parameters
		userId = +userId
		id = +id 
		if(id !== 0 && userId !== 0){  
			//Get event and auth
			let event = await auth(1, nameHash, codeHash, editPassHash)
			//Check User in event
			await getUserByIdandEventId(userId, event.id)
			let product = await getProductById(id)
          
			//delete product
			if(await deleteProduct(product.id)){
				//Add log
				await Log(userId, 'Удалена группа ' + product.name)
				return({
					//Server response
					status: 200,
					success: 'ok'
				})
			}
		}
		else
			throw new Error('Product delete error. Invalid input data.')
          
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//The controller allows you to check the existence of the event and delete the event
export const deleteEventController = async({['name-hash']: nameHash, ['code-hash']: codeHash, ['admin-pass-hash']: adminPassHash}) =>  {
	try {  
		//Get event and auth
		let event = await auth(2, nameHash, codeHash, adminPassHash)
		//delete event
		await deleteEvent(event.id)
		return({
			//Server response
			status: 200,
			success: 'ok'
		})
      
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
//The controller checks for the presence of the product group, checks
// for the presence of the user in the event, deletes the product group and writes it to the action log
//id: integer; userId: integer
export const deleteProductGroupController = async({id, userId}, 
	{['name-hash']: nameHash, ['code-hash']: codeHash, ['edit-pass-hash']: editPassHash}) =>  {
	try {  
		//Validation of input parameters
		userId = +userId
		id = +id
		//Checking data
		if(id !== 0 && userId !== 0){  
			//Get event and auth
			let event = await auth(1, nameHash, codeHash, editPassHash)
			//Check User in event
			await getUserByIdandEventId(userId, event.id)
			//Get productGroup
			let productGroup = await getProductGroupById(id)
			//delete productGroup
			if(await deleteProductGroup(id)){
				//Add log
				await Log(userId, 'Удален ' + productGroup.name)
				return({
					//Server response
					status: 200,
					success: 'ok'
				})
			}
		}
		else
			throw new Error('Product group delete error. Invalid input data.')
      
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}
   
