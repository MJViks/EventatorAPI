import DB from '../db'
import chResponse from '../db/chDbResponse'

export default class Event{
    #id;
    constructor(id, adminPassHash, eventInfoId, editPassHash, code, codeHash){
        this.#id = id;
        this.code = code;
        this.codeHash = codeHash;
        this.adminPassHash = adminPassHash;
        this.eventInfoId = eventInfoId;
        this.editPassHash = editPassHash
    }
   
    //Private field getters
    get id(){
      return this.#id;
    }
}

export const createEvent = async(adminPassHash, eventInfoId, editPassHash, code, codeHash) =>{
      let data = await DB.insert('event', ['adminPassHash', 'eventInfoId', 'editPassHash', 'code', 'codeHash'], [adminPassHash, eventInfoId, editPassHash, code, codeHash])
      if(chResponse(data, 'Create event')){
        data = await DB.query(`SELECT ident_current('Event') as id`)
        if(chResponse(data, 'Create event')){        
            data = data.recordset[0].id
            return data
        }
      }
      
}

export const deleteEvent = async(idEvent) =>{
      let data = await DB.delete('event', idEvent)
      if(chResponse(data, 'Delete event'))
        return true
}

export const updateEvent = async(idEvent, adminPassHash, eventInfoId, editPassHash, code, codeHash) =>{
    let data = await DB.update('event', idEvent, ['adminPassHash', 'eventInfoId', 'editPassHash', 'code', 'codeHash'], [adminPassHash, eventInfoId, editPassHash, code, codeHash])
    if(chResponse(data, 'Update event')){
      return new Event(idEvent, adminPassHash, eventInfoId, editPassHash, code, codeHash)
    }
}

export const getEventByEventInfoId = async(eventInfoId) =>{
  let data = await DB.query(`select idEvent, adminPassHash, eventInfoId, editPassHash, idHash, id from [Event] where eventInfoId = '${eventInfoId}' AND [Event].isDelete = '0'`)
  if(chResponse(data, 'Get event')){
    data = data.recordset[0]
    return new Event(data.idEvent, data.adminPassHash, data.eventInfoId, data.editPassHash, data.code, data.codeHash)
  }
}

export const getEventAuthEdit = async(nameHash, codeHash, editPassHash) =>{
    let data = await DB.query(`select idEvent, adminPassHash, eventInfoId, editPassHash, code, codeHash from [Event] ` +
    `join EventInfo on eventInfoId = idEventInfo where ` +
    `nameHash = '${nameHash}' ` +
    `AND editPassHash = '${editPassHash}' ` +
    `AND codeHash = '${codeHash}' AND [Event].isDelete = '0' AND [EventInfo].isDelete = '0'`)
    if(chResponse(data, 'Get event identification')){
      data = data.recordset[0]  
      if(data == undefined)
        throw new Error('Auth error.')
      return new Event(data.idEvent, data.adminPassHash, data.eventInfoid, data.editPassHash, data.code, data.codeHash)
    }
}

export const getEventAuthAdmin = async(nameHash, codeHash, adminPassHash) =>{
  
  let data = await DB.query(`select idEvent, adminPassHash, eventInfoId, editPassHash, code, codeHash from [Event] ` +
  `join EventInfo on eventInfoId = idEventInfo where ` +
  `nameHash = '${nameHash}' ` +
  `AND adminPassHash = '${adminPassHash}' ` +
  `AND codeHash = '${codeHash}' AND [Event].isDelete = '0' AND [EventInfo].isDelete = '0'`)
  if(chResponse(data, 'Get event identification')){   
    data = data.recordset[0]
    if(data === undefined)
      throw new Error('Auth error.') 
    return new Event(data.idEvent, data.adminPassHash, data.eventInfoId, data.editPassHash, data.code, data.codeHash)
  }
}

export const getEventAuth = async(nameHash, codeHash) =>{
    let data = await DB.query(`select idEvent, adminPassHash, eventInfoid, editPassHash, code, codeHash from [Event] ` +
    `join EventInfo on eventInfoId = idEventInfo where ` +
    `nameHash = '${nameHash}' ` +
    `AND codeHash = '${codeHash}' AND [Event].isDelete = '0' AND [EventInfo].isDelete = '0'`)
    if(chResponse(data, 'Get event identification')){
      data = data.recordset[0]
      if(data == undefined)
        throw new Error('Auth error.')
      return new Event(data.idEvent, data.adminPassHash, data.eventInfoid, data.editPassHash, data.code, data.codeHash)
    }
}

export const updateEditPassEvent = async(idEvent, editPassHash) =>{
  let data = await DB.update('event', idEvent, ['editPassHash'], [editPassHash])
  if(chResponse(data, 'Update event edit pass')){
    return true
  }
}

export const updateAdminPassEvent = async(idEvent, adminPassHash) =>{
  let data = await DB.update('event', idEvent, ['adminPassHash'], [adminPassHash])
  if(chResponse(data, 'Update event admin pass')){
    return true
  }
}

