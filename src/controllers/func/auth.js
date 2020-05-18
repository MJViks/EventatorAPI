//We import identification methods at the database level from models
import {getEventAuthAdmin, getEventAuthEdit, getEventAuth} from '../../models/Event'
//Event identification function.
//mode: integer; nameHash, codeHash, PassHash: string(64)
export const auth = async(mode, nameHash, codeHash, PassHash) =>  {
	//input validation
	mode = +mode
	if(typeof nameHash != 'string')
		throw new Error('Invalid auth data')
	if(typeof codeHash != 'string')
		throw new Error('Invalid auth data')
	if(PassHash != undefined && typeof PassHash != 'string')
		throw new Error('Invalid auth data')
            
	switch (mode) {
	//Identification by name and code
	case 0:
		if(nameHash.length === 64 && codeHash.length === 64){
			//Receive event
			let event = await getEventAuth(nameHash, codeHash)
			if(event.id > 0)
				return event
		}
		else
			throw new Error('Invalid data.') 
		break
	case 1:
		//Identification by name, code and edit password
		if(nameHash.length === 64 && codeHash.length === 64 && PassHash.length === 64){
			//Receive event
			let event = await getEventAuthEdit(nameHash, codeHash, PassHash)
			if(event.id > 0)
				return event
		}
		else
			throw new Error('Invalid data.') 
		break
	case 2:
		//Identification by name, code and "administrator password"
		if(nameHash.length === 64 && codeHash.length === 64 && PassHash.length === 64){
			//Receive event
			let event = await getEventAuthAdmin(nameHash, codeHash, PassHash)
			if(event.id > 0)
				return event
		} 
		else
			throw new Error('Invalid data') 
		break
         
	default:
		throw new Error('Non existing identification method')
	}
} 

