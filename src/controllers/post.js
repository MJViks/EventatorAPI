import {createEvent} from '../models/Event' 
import {createEventInfo, getEventInfoLastId} from '../models/EventInfo' 
import {createUser, getUserByEventIdandName} from '../models/User' 
import {createProduct} from '../models/Product' 
import {createProductGroup} from '../models/ProductGroup' 
import Log from './func/log'
import {auth} from './func/auth'
import crypto from 'crypto'

export const createUserController = async({name},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {  
    try {
      //Checking data
      if(typeof name != "string" || name.length == 0 || name.length > 30)
        throw new Error('User create error. Invalid input name.')  

        //Get event and auth
        let event = await auth(0, nameHash, codeHash)
         //delete product
        if(await createUser(name, event.id)){
            let user = await getUserByEventIdandName(event.id, name)            
          //Add log
          await Log(user.id, 'Добавлен в событие')
          return({
            //Server response
              status: 200,
              sucses: 'ok',
              user: {
                id: user.id,
                name: user.name,
                eventId: user.event_id
              }
            })
        }
        
        
    } catch (err) {
      //Error return
          throw new Error(err)
    }
}

const getRabdomCode = () =>{
    let rand = 1000 - 0.5 + Math.random() * (9999 - 1000 + 1);
    return '#' + Math.round(rand);
}

export const createEventController = async({name,  description, limitations, date, userName},{['admin-pass-hash']: adminPassHash, ['edit-pass-hash']: editPassHash}) =>  { 
    try {  
        //Checking data
        if(date != undefined && date.search(/^\d{2}[.]\d{2}[.]\d{2}$/) !== 0)
            throw new Error('Event create error. Invalid input data. DATA = __.__.__')
        if(limitations != undefined && limitations.length < 0)
            throw new Error('Event create error. limitations < 0')
        if (description != undefined && description.length > 300)
            throw new Error('Event create error. description > 300')
        if(name.length == 0 || name.length > 50)
            throw new Error('Event create error. Invalid input name.')
        if(adminPassHash.length !== 64)
            throw new Error('Event create error. Invalid input admin-pass-hash.')
        if(editPassHash.length !== 64)
            throw new Error('Event create error. Invalid input edit-pass-hash.')
        if(userName.length == 0 || userName.length > 30)
            throw new Error('Event create error. Invalid input name.')
        if(limitations == undefined)
            limitations = null
        if(description == undefined)
            description = null
        if(date == undefined)
            date = null
        
        let nameHash = crypto.createHash('sha256').update(name).digest('hex')
        let code = getRabdomCode()
        let codeHash = crypto.createHash('sha256').update(code).digest('hex')

        await createEventInfo(name, nameHash, date, limitations, description)
        let idEventInfo = await getEventInfoLastId()
        await createEvent(adminPassHash, idEventInfo, editPassHash, code, codeHash)
          await createUserController({name: userName},{['name-hash']: nameHash, ['code-hash']: codeHash})
            return({
              //Server response
                status: 200,
                sucses: 'ok',
                eventInfo:{
                    name: name,
                    date: date,
                    limitations: limitations,
                    description: description
                },
                event:{
                    idEventInfo: idEventInfo,
                    code: code
                }
              })
      } catch (err) {
        //Error return
            throw new Error(err)
      }
}

export const createProductGroupController = async({name},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  { }

export const createProductController = async({name},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  { }