import DB from '../db'
import chResponse from '../db/chDbResponse'

export default class User{
    constructor(id, name, eventId){
        this.id = id;
        this.name = name;
        this.eventId = eventId;
    }
}

export const createUser = async(name, eventId) =>{
        let data = await DB.insert('User', ['name', 'eventId'], [name, eventId])        
        if(chResponse(data, 'Create user')){
            data = await DB.query(`SELECT ident_current('User') as id`)
            if(chResponse(data, 'Create user')){        
                data = data.recordset[0].id
                return data
            }
        }
  }
  
  export const deleteUser = async(idUser) =>{
        let data = await DB.delete('User', idUser)
        if(chResponse(data, 'Delete user')){
            data = data.recordset[0]
            return true
        }
  }
  
  export const updateUser = async(idUser, name, eventId) =>{
        let data = await DB.update('User', idUser, ['idUser','name', 'eventId'], [idUser,name, eventId])
        if(chResponse(data, 'Update user')){
            return new User(idUser, name, eventId)
        }
  }

  export const getUserById = async(idUser) =>{
    let data = await DB.query(`select idUser, name, eventId from [User] where idUser = '${idUser}' AND [User].isDelete = '0'`)
    if(chResponse(data, 'Get user')){
        data = data.recordset[0]
        return new User(data.idUser, data.name, data.eventId)
    }
}

export const getUserByIdandEventId = async(idUser, eventId) =>{
    
    let data = await DB.query(`select idUser, name, eventId from [User] where idUser = '${idUser}' AND EventId = '${eventId}' AND [User].isDelete = '0'`)
    
    if(chResponse(data, 'No user in event')){
        data = data.recordset[0]
        return new User(data.idUser, data.name, data.eventId)
    }
}

export const getUsersByEventId = async(eventId, count) =>{
    let data = await DB.query(`select idUser, name, eventId from [User] where EventId = '${eventId}' AND [User].isDelete = '0'`)
    if(chResponse(data, 'Get users')){
        let answer = {}
        data.recordset.forEach((element, i) => {
            if ((i + 1) === count)
                return
            answer[i] = element
        });
        return answer
    }
}

export const getUserByEventIdandName = async(eventId, name) =>{
    let data = await DB.query(`select idUser, name, eventid from [User] where eventId = '${eventId}' AND name = '${name}' AND [User].isDelete = '0'`)
    if(chResponse(data, 'Get user')){
        if(chResponse(data, 'Get user in event with this name')){
            data = data.recordset[0]
            return new User(data.idUser, data.name, data.eventId)
        }
    }
}

export const getUsersByLogId = async(logId, count) =>{       
    let data =  await DB.query(`select TOP ${count} idUser, [User].name
    from [Log] join [User] on UserId = idUser
     where idlog = '${logId}' AND [User].isDelete = '0'`)
    if(chResponse(data, 'Get users')){   
        
        let answer = {}
        data.recordset.forEach((element, i) => {
            answer = element
            
        });
        return answer
    }
}

export const getUserByEventId = async(eventId) =>{
    let data = await DB.query(`select idUser, name from [User] where eventId = '${eventId}' AND [User].isDelete = '0'`)
    if(chResponse(data, 'Get user')){
        data = data.recordset[0]
        return new User(data.idUser, data.name, data.eventId)
    }
}