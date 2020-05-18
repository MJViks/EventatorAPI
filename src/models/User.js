import DB from '../db'
import chResponse from '../db/chDbResponse'
//User class
export default class User{
	constructor(id, name, eventId){
		this.id = id
		this.name = name
		this.eventId = eventId
	}
}

//name: string; eventId: integer
export const createUser = async(name, eventId) =>{
	let data = await DB.insert('User', ['name', 'eventId'], [name, eventId])        
	if(chResponse(data, 'Create user')){
		data = await DB.query('SELECT ident_current(\'User\') as id')
		if(chResponse(data, 'Create user')){        
			data = data.recordset[0].id
			return data
		}
	}
}
  
//idUser: integer
export const deleteUser = async(idUser) =>{
	let data = await DB.delete('User', idUser)
	if(chResponse(data, 'Delete user')){
		data = data.recordset[0]
		return true
	}
}
  
//idUser, eventId: integer; name: string
export const updateUser = async(idUser, name, eventId) =>{
	let data = await DB.update('User', idUser, ['idUser','name', 'eventId'], [idUser,name, eventId])
	if(chResponse(data, 'Update user')){
		return new User(idUser, name, eventId)
	}
}

//idUser: integer
export const getUserById = async(idUser) =>{
	let data = await DB.query(`select idUser, name, eventId from [User] where idUser = '${idUser}' AND [User].isDelete = '0'`)
	if(chResponse(data, 'Get user')){
		data = data.recordset[0]
		return new User(data.idUser, data.name, data.eventId)
	}
}

//Retrieving user information by event ID and identifier
//idUser, eventId: integer
export const getUserByIdandEventId = async(idUser, eventId) =>{
    
	let data = await DB.query(`select idUser, name, eventId from [User] where idUser = '${idUser}' AND EventId = '${eventId}' AND [User].isDelete = '0'`)
    
	if(chResponse(data, 'No user in event')){
		data = data.recordset[0]
		return new User(data.idUser, data.name, data.eventId)
	}
}

//Getting multiple users by event ID
//eventId, count: integer
export const getUsersByEventId = async(eventId, count) =>{
	let data = await DB.query(`select idUser, name, eventId from [User] where EventId = '${eventId}' AND [User].isDelete = '0'`)
	if(chResponse(data, 'Get users')){
		let answer = {}
		data.recordset.forEach((element, i) => {
			if ((i + 1) === count)
				return
			answer[i] = element
		})
		return answer
	}
}

//Getting information about users by name and event identifier
//eventId: integer; name: string
export const getUserByEventIdandName = async(eventId, name) =>{
	let data = await DB.query(`select idUser, name, eventid from [User] where eventId = '${eventId}' AND name = '${name}' AND [User].isDelete = '0'`)
	if(chResponse(data, 'Get user')){
		if(chResponse(data, 'Get user in event with this name')){
			data = data.recordset[0]
			return new User(data.idUser, data.name, data.eventId)
		}
	}
}
//Getting user information by log ID
//logId, count: integer
export const getUserByLogId = async(logId, count) =>{       
	let data =  await DB.query(`select TOP ${count} idUser, [User].name
    from [Log] join [User] on UserId = idUser
     where idlog = '${logId}' AND [User].isDelete = '0'`)
	if(chResponse(data, 'Get user')){   
        
		let answer = {}
		data.recordset.forEach((element) => {
			answer = element
            
		})
		return answer
	}
}

