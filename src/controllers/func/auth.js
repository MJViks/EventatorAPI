import {getEventAuthAdmin, getEventAuthEdit, getEventAuth} from '../../models/Event'

export const auth = async(mode, nameHash, codeHash, PassHash) =>  {
        mode = +mode
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