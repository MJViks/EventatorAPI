import DB from '../db'

export const EventID = async(nameHash, codeHash, editPassHash) =>  {
    try {   
        let idEvent 
        
        if (editPassHash === undefined) 
            if(nameHash.length === 64 && codeHash.length === 64)
                await DB.query(`select ID_Event from [Event] ` +
                `join EventInfo on eventInfo_ID = id_EventInfo where ` +
                `nameHash = '${nameHash}' ` +
                `AND IDHash = '${codeHash}'`).then(data => {
                    if(data.rowsAffected)
                        if (data.rowsAffected[0] == 1)
                            idEvent = data.recordset[0].ID_Event
                        else
                            throw new Error('Identification Error. Output overflow.')
                    else
                        throw new Error('Identification or database Error. Name: ' + data.name)
                        })
                    
            else
                throw new Error('Invalid data') 
        else
            if(nameHash.length === 64 && codeHash.length === 64 && editPassHash.length === 64)
                await DB.query(`select ID_Event from [Event] ` +
                `join EventInfo on eventInfo_ID = id_EventInfo where ` +
                `nameHash = '${nameHash}' ` +
                `AND editPassHash = '${editPassHash}' ` +
                `AND IDHash = '${codeHash}'`).then(data => {
                    if(data.rowsAffected)
                        if (data.rowsAffected[0] == 1)
                            idEvent = data.recordset[0].ID_Event
                        else
                            throw new Error('Identification Error. Output overflow.')
                    else
                        throw new Error('Identification or database Error. Name: ' + data.name)
                        })
            else
                throw new Error('Invalid data') 
            
        return idEvent
    } catch (err) {
            throw new Error(err)
      }
}      

export const EventIDByAdmin = async(nameHash, codeHash, adminPassHash) =>  {
    try { 
        if(nameHash.length === 64 && codeHash.length === 64 && adminPassHash.length === 64)
                await DB.query(`select ID_Event from [Event] ` +
                `join EventInfo on eventInfo_ID = id_EventInfo where ` +
                `nameHash = '${nameHash}' ` +
                `AND adminPassHash = '${adminPassHash}' ` +
                `AND IDHash = '${codeHash}'`).then(data => {
                    if(data.rowsAffected)
                        if (data.rowsAffected[0] == 1)
                            idEvent = data.recordset[0].ID_Event
                        else
                            throw new Error('Output overflow')
                    else
                        throw new Error('Delete product error. Database error. Name: ' + data.name)
                        })
        else
            throw new Error('Invalid data') 
            
        return idEvent
    } catch (err) {
            throw new Error(err)
      }
}      