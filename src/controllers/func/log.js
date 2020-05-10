import {getUserById} from '../../models/User'
import {createLog} from '../../models/Log'
export default async(idUser, action) =>  {
        idUser = +idUser
        
        if(typeof action === "string" && action.length > 0){
           let user = await getUserById(idUser)

            if(user)
                await createLog(user.name + ' -> ' + action, user.id)
        }
        else
            throw new Error('Logging error. Invalid data') 
} 
