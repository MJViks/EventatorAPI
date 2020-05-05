import DB from '../db'

export const Log = async(userId, action, eventId) =>  {
    try { 
        userId = +userId
        eventId = +eventId
        let userName
        
        if(typeof userId === "number" && typeof eventId === "number" &&
         typeof action === "string" && action.length > 0){
            await DB.query(`select Name from [User] ` +
            `join [Event] on event_ID = id_Event where ` +
            `ID_Event = '${eventId}' ` +
            `AND ID_User = '${userId}'`).then(data => {
                if(data.rowsAffected)
                    if (data.rowsAffected[0] == 1)
                    userName = data.recordset[0].Name
                    else
                        throw new Error('Error Log. User is not found')
                else
                    throw new Error('Delete product error. Database error. Name: ' + data.name)
                })
               

            if(userName)
                await DB.insert('Log', ['date', 'time', 'action', 'User_ID'], [getDate(), getTime(), userName + ' -> ' + action, userId])
        }
            else
                throw new Error('Error Log. Invalid data') 
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
