//Import methods for creating logs and getting users at the database level
import {getUserById} from '../../models/User'
import {createLog} from '../../models/Log'
//Log Creation Function
//idUser: integer; action: string
export default async(idUser, action) =>  {
	//Input Validation
	idUser = +idUser
	if(typeof action === 'string' && action.length > 0){
		//User Existence Check
		let user = await getUserById(idUser)
		if(user)
		//Create a new log
			await createLog(action, user.id)
	}
	else
		throw new Error('Logging error. Invalid data') 
} 
