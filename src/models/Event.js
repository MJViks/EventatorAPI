import DB from '../db'
import chResponse from '../db/chDbResponse'

export default class Event{
    #id;
    constructor(id, adminPassHash, eventInfo_id, editPassHash, code, codeHash){
        this.#id = id;
        this.code = code;
        this.codeHash = codeHash;
        this.adminPassHash = adminPassHash;
        this.eventInfo_id = eventInfo_id;
        this.editPassHash = editPassHash
    }
   
    //Private field getters
    get id(){
      return this.#id;
    }
}

export const createEvent = async(adminPassHash, eventInfo_id, editPassHash, code, codeHash) =>{
      let data = await DB.insert('event', ['adminPassHash', 'eventInfo_id', 'editPassHash', 'id', 'idHash'], [adminPassHash, eventInfo_id, editPassHash, code, codeHash])
      if(chResponse(data, 'Create event'))
        return true
}

export const deleteEvent = async(id_Event) =>{
      let data = await DB.delete('event', id_Event)
      if(chResponse(data, 'Delete event'))
        return true
}

export const updateEvent = async(id_Event, adminPassHash, eventInfo_id, editPassHash, code, codeHash) =>{
    let data = await DB.update('event', id_Event, ['adminPassHash', 'eventInfo_id', 'editPassHash', 'id', 'idHash'], [adminPassHash, eventInfo_id, editPassHash, code, codeHash])
    if(chResponse(data, 'Update event')){
      data = data.recordset[0]
      return new Event(id_Event, adminPassHash, eventInfo_id, editPassHash, code, codeHash)
    }
}

export const getEventByEventInfoId = async(eventInfoId) =>{
  let data = await DB.query(`select id_Event, adminPassHash, eventInfo_Id, editPassHash, idHash, id from [Event] where EventInfo_id = '${eventInfoId}' AND [Event].idDelete = '0'`)
  if(chResponse(data, 'Get event')){
    data = data.recordset[0]
    return new Event(data.id_Event, data.adminPassHash, data.eventInfo_id, data.editPassHash, data.id, data.idHash)
  }
}

export const getEventAuthEdit = async(nameHash, codeHash, editPassHash) =>{
    let data = await DB.query(`select id_Event, adminPassHash, eventInfo_id, editPassHash, id, idHash from [Event] ` +
    `join EventInfo on eventInfo_id = id_EventInfo where ` +
    `nameHash = '${nameHash}' ` +
    `AND editPassHash = '${editPassHash}' ` +
    `AND idHash = '${codeHash}' AND [Event].idDelete = '0' AND [EventInfo].idDelete = '0'`)
    if(chResponse(data, 'Get event identification')){
      data = data.recordset[0]
      return new Event(data.id_Event, data.adminPassHash, data.eventInfo_id, data.editPassHash, data.id, data.idHash)
    }
}

export const getEventAuthAdmin = async(nameHash, codeHash, adminPassHash) =>{
  let data = await DB.query(`select id_Event, adminPassHash, eventInfo_id, editPassHash, id, idHash from [Event] ` +
  `join EventInfo on eventInfo_id = id_EventInfo where ` +
  `nameHash = '${nameHash}' ` +
  `AND adminPassHash = '${adminPassHash}' ` +
  `AND idHash = '${codeHash}' AND [Event].idDelete = '0' AND [EventInfo].idDelete = '0'`)
  if(chResponse(data, 'Get event identification')){    
    data = data.recordset[0]
    return new Event(data.id_Event, data.adminPassHash, data.eventInfo_id, data.editPassHash, data.id, data.idHash)
  }
}

export const getEventAuth = async(nameHash, codeHash) =>{
    let data = await DB.query(`select id_Event, adminPassHash, eventInfo_id, editPassHash, id, idHash from [Event] ` +
    `join EventInfo on eventInfo_id = id_EventInfo where ` +
    `nameHash = '${nameHash}' ` +
    `AND idHash = '${codeHash}' AND [Event].idDelete = '0' AND [EventInfo].idDelete = '0'`)
    if(chResponse(data, 'Get event identification')){
      data = data.recordset[0]
      return new Event(data.id_Event, data.adminPassHash, data.eventInfo_id, data.editPassHash, data.id, data.idHash)
    }
}

