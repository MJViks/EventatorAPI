import DB from '../db'
import chResponse from '../db/chDbResponse'

export default class User{
    #id;
    constructor(id, name, event_id){
        this.#id = id;
        this.name = name;
        this.event_id = event_id;
    }
    get id(){
        return this.#id;
      }
}

export const createUser = async(name, event_id) =>{
        let data = await DB.insert('User', ['name', 'event_id'], [name, event_id])        
        if(chResponse(data, 'Create user')){
            data = await DB.query(`SELECT ident_current('User') as id`)
            if(chResponse(data, 'Create user')){        
                data = data.recordset[0].id
                return data
            }
        }
  }
  
  export const deleteUser = async(id_User) =>{
        let data = await DB.delete('User', id_User)
        if(chResponse(data, 'Delete user')){
            data = data.recordset[0]
            return true
        }
  }
  
  export const updateUser = async(id_User, name, event_id) =>{
        let data = await DB.update('User', id_User, ['id_User','name', 'event_id'], [id_User,name, event_id])
        if(chResponse(data, 'Update user')){
            return new User(id_User, name, event_id)
        }
  }

  export const getUserById = async(idUser) =>{
    let data = await DB.query(`select id_User, name, event_id from [User] where id_User = '${idUser}' AND [User].idDelete = '0'`)
    if(chResponse(data, 'Get user')){
        data = data.recordset[0]
        return new User(data.id_User, data.name, data.event_id)
    }
}

export const getUserByIdandEventId = async(idUser, idEvent) =>{
    let data = await DB.query(`select id_User, name, event_id from [User] where id_User = '${idUser}' AND Event_id = '${idEvent}' AND [User].idDelete = '0'`)
    if(chResponse(data, 'No user in event')){
        data = data.recordset[0]
        return new User(data.id_User, data.name, data.event_id)
    }
}

export const getUsersByEventId = async(idEvent, count) =>{
    let data = await DB.query(`select id_User, name, event_id from [User] where Event_id = '${idEvent}' AND [User].idDelete = '0'`)
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

export const getUserByEventIdandName = async(idEvent, name) =>{
    let data = await DB.query(`select id_User, name, event_id from [User] where event_id = '${idEvent}' AND name = '${name}' AND [User].idDelete = '0'`)
    if(chResponse(data, 'Get user')){
        if(chResponse(data, 'Get user in event with this name')){
            data = data.recordset[0]
            return new User(data.id_User, data.name, data.event_id)
        }
    }
}
