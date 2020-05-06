import DB from '../db'
import chResponse from './chDbResponse'
export default async(userId, action, eventId) =>  {
    try { 
        userId = +userId
        eventId = +eventId
        let userName
        
        if(typeof userId === "number" && typeof eventId === "number" &&
         typeof action === "string" && action.length > 0){
            let date = await DB.query(`select Name from [User] ` +
            `join [Event] on event_ID = id_Event where ` +
            `ID_Event = '${eventId}' ` +
            `AND ID_User = '${userId}'`)

            if(await chResponse(data, 'Log'))
                userName = data.recordset[0].Name
                
            if(userName)
                await DB.insert('Log', ['date', 'time', 'action', 'User_ID'], [getDate(), getTime(), userName + ' -> ' + action, userId])
        }
        else
            throw new Error('Logging error. Invalid data') 
            
    } catch (err) {
            throw new Error(err)
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
