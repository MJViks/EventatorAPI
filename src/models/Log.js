import DB from '../db'
import chResponse from '../db/chDbResponse'

export default class Log{
    #id;
    constructor(id, date, time, action, user_id){
        this.#id = id;
        this.time = time;
        this.action = action;
        this.date = date;
        this.user_id = user_id;
    }
    get id(){
        return this.#id;
      }
}

export const createLog = async(action, user_id) =>{
        let data = await DB.insert('Log', ['date', 'time', 'action', 'user_id'], [getDate(), getTime(), action, user_id])
        if(chResponse(data, 'Create Log'))
            return true
  }
  
  export const deleteLog = async(id_Log) =>{
        let data = await DB.delete('Log', id_Log)
        if(chResponse(data, 'Delete Log'))
            return true
  }
  
  export const updateLog = async(id_Log, date, time, action, user_id) =>{
        let data = await DB.update('Log', id_Log, ['date', 'time', 'action', 'user_id'], [date, time, action, user_id])
        if(chResponse(data, 'Update Log')){
            data = data.recordset[0]
            return new Log(id_Log, date, time, action, user_id)
        }
  }

const getDate = () =>{
    let date = new Date()
    return setZiro(date.getDate()) + '.' + setZiro(date.getMonth()) + '.' + date.getFullYear().toString().slice(2,4)
}

const getTime = () =>{
    let date = new Date()
    return setZiro(date.getHours()) + ':' + setZiro(date.getMinutes())
}

const setZiro = (num) =>{
    return num.toString().length < 2 ? `0${num}` : num
}