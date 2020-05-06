import DB from '../db'
import chResponse from './chDbResponse'

export const EventID = async(nameHash, codeHash, editPassHash) =>  {
    try {   
        let idEvent 
        
        if (editPassHash === undefined) 
            if(nameHash.length === 64 && codeHash.length === 64){
                let data = await DB.query(`select ID_Event from [Event] ` +
                `join EventInfo on eventInfo_ID = id_EventInfo where ` +
                `nameHash = '${nameHash}' ` +
                `AND IDHash = '${codeHash}'`)

                if(await chResponse(data, 'Auth'))
                    idEvent = data.recordset[0].ID_Event  
            }
            else
                throw new Error('Invalid data.') 
        else
            if(nameHash.length === 64 && codeHash.length === 64 && editPassHash.length === 64){
                let data = await DB.query(`select ID_Event from [Event] ` +
                `join EventInfo on eventInfo_ID = id_EventInfo where ` +
                `nameHash = '${nameHash}' ` +
                `AND editPassHash = '${editPassHash}' ` +
                `AND IDHash = '${codeHash}'`)

                    if(await chResponse(data, 'Auth'))
                        idEvent = data.recordset[0].ID_Event
                
            }
            else
                throw new Error('Invalid data.') 
            
        return idEvent
    } catch (err) {
            throw new Error(err)
      }
}      

export const EventIDByAdmin = async(nameHash, codeHash, adminPassHash) =>  {
    try { 
        if(nameHash.length === 64 && codeHash.length === 64 && adminPassHash.length === 64){
                let data = await DB.query(`select ID_Event from [Event] ` +
                `join EventInfo on eventInfo_ID = id_EventInfo where ` +
                `nameHash = '${nameHash}' ` +
                `AND adminPassHash = '${adminPassHash}' ` +
                `AND IDHash = '${codeHash}'`)

                    if(await chResponse(data, 'Auth'))
                        idEvent = data.recordset[0].ID_Event
        } 
        else
            throw new Error('Invalid data') 
            
        return idEvent
    } catch (err) {
            throw new Error(err)
      }
}      