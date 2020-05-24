//The controller works with statistics

import {auth} from './func/auth'
import {getStatsByUsers, getStatsByEvent, getStatsByProductGroup} from '../models/Stats'

export const getStatsByUsersController = async({userCount},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
	try {
		//Input Validation
		userCount = +userCount
		if(isNaN(userCount))
			throw new Error('invalid input data.')
		userCount = Math.floor(userCount)
		if(userCount < 1)
			throw new Error('invalid input data.')
		//Get event and auth
		let event = await auth(0, nameHash, codeHash)
        
		let Stats = await getStatsByUsers(userCount, event.id)
		return({
			//Server response
			status: 200,
			sucses: 'ok',
			Stats
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}

export const getStatsByEventController = async({['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
	try {
		//Get event and auth
		let event = await auth(0, nameHash, codeHash)
        
		let Stats = await getStatsByEvent(event.id)
		return({
			//Server response
			status: 200,
			sucses: 'ok',
			Stats
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}

export const getStatsByProductGroupController = async({idProductGroup},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
	try {
		idProductGroup = +idProductGroup
		if(isNaN(idProductGroup))
			throw new Error('invalid input data.')
		//Get event and auth
		let event = await auth(0, nameHash, codeHash)
        
		let Stats = await getStatsByProductGroup(idProductGroup, event.id)
		return({
			//Server response
			status: 200,
			sucses: 'ok',
			Stats
		})
	} catch (err) {
		//Error return
		throw new Error(err)
	}
}