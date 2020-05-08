import DB from '../db'
import chResponse from '../db/chDbResponse'

export default class EventInfo{
    #id;
    constructor(id, name, nameHash, date, limitations, description){
        this.#id = id;
        this.name = name;
        this.nameHash = nameHash;
        this.date = date;
        this.limitations = limitations;
        this.description = description;
    }
    get id(){
        return this.#id;
      }
}

export const createEventInfo = async(name, nameHash, date, limitations, description) =>{
        let data = await DB.insert('eventInfo', ['name', 'nameHash', 'date', 'limitations', 'description'], [name, nameHash, date, limitations, description])
        if(chResponse(data, 'Create eventInfo')){
            data = await DB.query(`SELECT ident_current('EventInfo') as id`)
            if(chResponse(data, 'Create event info')){        
                data = data.recordset[0].id
                return data
            }
        }
  }
  
  export const deleteEventInfo = async(id_EventInfo) =>{
        let data = await DB.delete('eventInfo', id_EventInfo)
        if(chResponse(data, 'Delete eventInfo'))
            return true
  }
  
  export const updateEventInfo = async(id_EventInfo, name, nameHash, date, limitations, description) =>{
        let data = await DB.update('eventInfo', id_EventInfo, ['name', 'nameHash', 'date', 'limitations', 'description'], [name, nameHash, date, limitations, description])
        if(chResponse(data, 'Update eventInfo')){
            return getEventInfoById(id_EventInfo)
        }
  }

  export const getEventInfoById = async(idEventInfo) =>{
    let data = await DB.query(`select id_EventInfo, name, nameHash, date, limitations, description from [EventInfo] where id_EventInfo = '${idEventInfo}' AND [EventInfo].idDelete = '0'`)
    if(chResponse(data, 'Get EventInfo')){
        data = data.recordset[0]
        return new EventInfo(data.id_EventInfo, data.name, data.nameHash, data.date, data.limitations, data.description)
    }
}