import DB from '../db'
import chResponse from '../db/chDbResponse'
//event class
export default class Event{
    #id;
    constructor(id, adminPassHash, eventInfoId, editPassHash, code, codeHash){
    	this.#id = id
    	this.code = code
    	this.codeHash = codeHash
    	this.adminPassHash = adminPassHash
    	this.eventInfoId = eventInfoId
    	this.editPassHash = editPassHash
    }
    //Private field getters
    get id(){
    	return this.#id
    }
}

//Method for creating an event in the database
//editPassHash, codeHash, adminPassHash: string(64); eventInfoId: integer;  code: string 
export const createEvent = async(adminPassHash, eventInfoId, editPassHash, code, codeHash) =>{
	//Getting a database response
	let data = await DB.insert('event', ['adminPassHash', 'eventInfoId', 'editPassHash', 'code', 'codeHash'], 
		[adminPassHash, eventInfoId, editPassHash, code, codeHash])
	//Response Check
	if(chResponse(data, 'Create event')){
		data = await DB.query('SELECT ident_current(\'Event\') as id')
		if(chResponse(data, 'Create event')){        
			data = data.recordset[0].id
			return data
		}
	}
      
}

//idEvent: integer
export const deleteEvent = async(idEvent) =>{
	//Getting a database response
	let data = await DB.delete('event', idEvent)
	//Response Check
	if(chResponse(data, 'Delete event'))
		return true
}

//idEvent, eventInfoId: integer; adminPassHash, editPassHash, codeHash: string(64); code: string
export const updateEvent = async(idEvent, adminPassHash, eventInfoId, editPassHash, code, codeHash) =>{
	//Getting a database response
	let data = await DB.update('event', idEvent, ['adminPassHash', 'eventInfoId', 'editPassHash', 'code', 'codeHash'], 
		[adminPassHash, eventInfoId, editPassHash, code, codeHash])
	//Response Check
	if(chResponse(data, 'Update event')){
		return new Event(idEvent, adminPassHash, eventInfoId, editPassHash, code, codeHash)
	}
}
//eventInfoId: integer
export const getEventByEventInfoId = async(eventInfoId) =>{
	//Getting a database response
	let data = await DB.query(`select idEvent, adminPassHash, eventInfoId, editPassHash,
   idHash, id from [Event] where eventInfoId = '${eventInfoId}' AND [Event].isDelete = '0'`)
	//Response Check
	if(chResponse(data, 'Get event')){
		data = data.recordset[0]
		return new Event(data.idEvent, data.adminPassHash, data.eventInfoId, data.editPassHash, data.code, data.codeHash)
	}
}
//Event ID with edit password
//nameHash, codeHash, editPassHash: string(64)
export const getEventAuthEdit = async(nameHash, codeHash, editPassHash) =>{
	//Getting a database response
	let data = await DB.query('select idEvent, adminPassHash, eventInfoId, editPassHash, code, codeHash from [Event] ' +
    'join EventInfo on eventInfoId = idEventInfo where ' +
    `nameHash = '${nameHash}' ` +
    `AND editPassHash = '${editPassHash}' ` +
    `AND codeHash = '${codeHash}' AND [Event].isDelete = '0' AND [EventInfo].isDelete = '0'`)
	//Response Check
	if(chResponse(data, 'Get event identification')){
		data = data.recordset[0]  
		if(data == undefined)
			throw new Error('Auth error.')
		return new Event(data.idEvent, data.adminPassHash, data.eventInfoid, data.editPassHash, data.code, data.codeHash)
	}
}
//Identification of an event with an administration password
//nameHash, codeHash, adminPassHash: string(64)
export const getEventAuthAdmin = async(nameHash, codeHash, adminPassHash) =>{
	//Getting a database response
	let data = await DB.query('select idEvent, adminPassHash, eventInfoId, editPassHash, code, codeHash from [Event] ' +
  'join EventInfo on eventInfoId = idEventInfo where ' +
  `nameHash = '${nameHash}' ` +
  `AND adminPassHash = '${adminPassHash}' ` +
  `AND codeHash = '${codeHash}' AND [Event].isDelete = '0' AND [EventInfo].isDelete = '0'`)
	//Response Check
	if(chResponse(data, 'Get event identification')){   
		data = data.recordset[0]
		if(data === undefined)
			throw new Error('Auth error.') 
		return new Event(data.idEvent, data.adminPassHash, data.eventInfoId, data.editPassHash, data.code, data.codeHash)
	}
}
//Event identification without passwords
//nameHash, codeHash: string(64)
export const getEventAuth = async(nameHash, codeHash) =>{
	//Getting a database response
	let data = await DB.query('select idEvent, adminPassHash, eventInfoid, editPassHash, code, codeHash from [Event] ' +
    'join EventInfo on eventInfoId = idEventInfo where ' +
    `nameHash = '${nameHash}' ` +
    `AND codeHash = '${codeHash}' AND [Event].isDelete = '0' AND [EventInfo].isDelete = '0'`)
	//Response Check
	if(chResponse(data, 'Get event identification')){
		data = data.recordset[0]
		if(data == undefined)
			throw new Error('Auth error.')
		return new Event(data.idEvent, data.adminPassHash, data.eventInfoid, data.editPassHash, data.code, data.codeHash)
	}
}

//idEvent: integer; editPassHash: string(64)
export const updateEditPassEvent = async(idEvent, editPassHash) =>{
	//Getting a database response
	let data = await DB.update('event', idEvent, ['editPassHash'], [editPassHash])
	//Response Check
	if(chResponse(data, 'Update event edit pass')){
		return true
	}
}
//idEvent: integer; adminPassHash: string(64)
export const updateAdminPassEvent = async(idEvent, adminPassHash) =>{
	//Getting a database response
	let data = await DB.update('event', idEvent, ['adminPassHash'], [adminPassHash])
	//Response Check
	if(chResponse(data, 'Update event admin pass')){
		return true
	}
}

