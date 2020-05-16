import DB from '../db'
import chResponse from '../db/chDbResponse'

//Event Information Class
export default class EventInfo{
	constructor(id, name, nameHash, date, limitations, description){
		this.id = id
		this.name = name
		this.nameHash = nameHash
		this.date = date
		this.limitations = limitations
		this.description = description
	}
}
//name, description: string; date: string as __.__.____; nameHash: string(64); limitations: float
export const createEventInfo = async(name, nameHash, date, limitations, description) =>{
	let data = await DB.insert('eventInfo', ['name', 'nameHash', 'date', 'limitations', 'description'], [name, nameHash, date, limitations, description])
	if(chResponse(data, 'Create eventInfo')){
		data = await DB.query('SELECT ident_current(\'EventInfo\') as id')
		if(chResponse(data, 'Create event info')){        
			data = data.recordset[0].id
			return data
		}
	}
}
  
//idEventInfo: integer
export const deleteEventInfo = async(idEventInfo) =>{
	let data = await DB.delete('eventInfo', idEventInfo)
	if(chResponse(data, 'Delete eventInfo'))
		return true
}
  
//idEventInfo: integer; nameHash; string(64); date: string as __.__.____; limitations: float; name, description: string
export const updateEventInfo = async(idEventInfo, name, nameHash, date, limitations, description) =>{
	let data = await DB.update('eventInfo', idEventInfo, ['name', 'nameHash', 'date', 'limitations', 'description'],
		[name, nameHash, date, limitations, description])
	if(chResponse(data, 'Update eventInfo')){
		return getEventInfoById(idEventInfo)
	}
}

//idEventInfo: integer
export const getEventInfoById = async(idEventInfo) =>{
	let data = await DB.query(`select idEventInfo, name, nameHash, date, limitations, description 
        from [EventInfo] where idEventInfo = '${idEventInfo}' AND [EventInfo].isDelete = '0'`)
	if(chResponse(data, 'Get EventInfo')){
		data = data.recordset[0]
		return new EventInfo(data.idEventInfo, data.name, data.nameHash, data.date, data.limitations, data.description)
	}
}

//eventId: integer
export const getEventInfoByEventId = async(eventId) =>{
	let data = await DB.query(`select idEventInfo, name, nameHash, date, limitations, description from [Event]
    join [EventInfo] on EventInfoId = idEventInfo where idEvent = '${eventId}' AND [EventInfo].isDelete = '0'`)
	if(chResponse(data, 'Get EventInfo')){
		data = data.recordset[0]
		return new EventInfo(data.idEventInfo, data.name, data.nameHash, data.date, data.limitations, data.description)
	}
}
