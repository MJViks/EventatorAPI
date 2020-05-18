import DB from '../db'
import chResponse from '../db/chDbResponse'
//Log class
export default class Log{
	constructor(id, date, time, action, userId){
		this.id = id
		this.time = time
		this.action = action
		this.date = date
		this.userId = userId
	}
}

//action: string; userId: integer
export const createLog = async(action, userId) =>{
	let data = await DB.insert('Log', ['date', 'time', 'action', 'userId'], [getDate(), getTime(), action, userId])
	if(chResponse(data, 'Create Log')){
		data = await DB.query('SELECT ident_current(\'Log\') as id')
		if(chResponse(data, 'Create log')){        
			data = data.recordset[0].id
			return data
		}
	}
}
  
//idLog: integer
export const deleteLog = async(idLog) =>{
	let data = await DB.delete('Log', idLog)
	if(chResponse(data, 'Delete Log'))
		return true
}
  
//idLog, userId: integer; date: string as __.__.____; time: string as __:__; action: string
export const updateLog = async(idLog, date, time, action, userId) =>{
	let data = await DB.update('Log', idLog, ['date', 'time', 'action', 'userId'], [date, time, action, userId])
	if(chResponse(data, 'Update Log')){
		return new Log(idLog, date, time, action, userId)
	}
}

//Getting current date
const getDate = () =>{
	let date = new Date()
	return setZiro(date.getDate()) + '.' + setZiro(date.getMonth()) + '.' + date.getFullYear().toString().slice(2,4)
}

//Getting current time
const getTime = () =>{
	let date = new Date()
	return setZiro(date.getHours()) + ':' + setZiro(date.getMinutes())
}

//Setting zeros in dates and times
const setZiro = (num) =>{
	return num.toString().length < 2 ? `0${num}` : num
}

//eventId, count: integer
export const getLogsByEventId = async(eventId, count) =>{
	let data = await DB.query(`select TOP ${count} idLog, [Log].date, time, action from Log 
    join [User] on UserId = idUser
    where eventId = '${eventId}' AND [Log].isDelete = '0'`)
	if(chResponse(data, 'Get Logs')){
		let answer = {}
        
		data.recordset.forEach((element, i) => {
			answer[i] = element
            
		})
		return answer
	}
}

//userId, count: integer
export const getLogsByUserId = async(userId, count) =>{       
	let data =  await DB.query(`select TOP ${count} idLog, [Log].date, time, action
    from [Log] join [User] on UserId = idUser
     where userId = '${userId}' AND [Log].isDelete = '0'`)
	if(chResponse(data, 'Get Users')){   
        
		let answer = {}
		data.recordset.forEach((element, i) => {
			answer[i] = element
            
		})
		return answer
	}
}