import {getEventAuthAdmin, getEventAuthEdit, getEventAuth} from '../../models/Event'

export const auth = async(mode, nameHash, codeHash, PassHash) =>  {
        mode = +mode
        if(typeof nameHash != 'string')
            throw new Error('Invalid auth data')
        if(typeof codeHash != 'string')
            throw new Error('Invalid auth data')
        if(PassHash != undefined && typeof PassHash != 'string')
            throw new Error('Invalid auth data')
            
        if(PassHash != undefined)
            PassHash.trim()
        nameHash.trim()
        codeHash.trim()
        
         switch (mode) {
             case 0:
                if(nameHash.length === 64 && codeHash.length === 64){
                    let event = await getEventAuth(nameHash, codeHash)
                   if(event.id > 0)
                    return event
               }
               else
                   throw new Error('Invalid data.') 
                 break;
             case 1:
                if(nameHash.length === 64 && codeHash.length === 64 && PassHash.length === 64){
                    let event = await getEventAuthEdit(nameHash, codeHash, PassHash)
                    if(event.id > 0)
                        return event
                }
                else
                    throw new Error('Invalid data.') 
                 break;
             case 2:
                if(nameHash.length === 64 && codeHash.length === 64 && PassHash.length === 64){
                    let event = await getEventAuthAdmin(nameHash, codeHash, PassHash)
                    
                    if(event.id > 0)
                        return event
                } 
                else
                    throw new Error('Invalid data') 
                 break;
         
             default:
                 throw new Error('Non existing identification method')
                 break;
         }
} 

