import DB from '../db'
import {EventID} from './auth'
import {Log} from './log'

export let deleteProduct = async({idProduct ,nameHash, codeHash, editPassHash, userId}) =>  {
      try {  
        userId = +userId
        idProduct = +idProduct        
        if(idProduct !== 0 && editPassHash.length !== 0 && userId !== 0){  

        let eventId = await EventID(nameHash, codeHash, editPassHash)

        let prodictName = false
        await DB.query(`select [Product].[Name] from Product ` +
        `join productGroup on productGroup_ID = ID_ProductGroup ` +
        `join [Event] on Event_ID = id_Event where ` +
        `ID_Event = '${eventId}' ` +
        `AND id_Product = ${idProduct}`).then(data => {
          if(data.rowsAffected)
            if(data.rowsAffected[0] > 0)
              prodictName = data.recordset[0].Name
            else
              throw new Error('Delete product error. Product not found')
          else
            throw new Error('Delete product error. Database error or product not found. Name: ' + data.name)
        }) 

        if(prodictName)
        DB.delete('Product', idProduct).then(Log(userId, 'Удален ' + prodictName,  eventId))
        }
        return({
            status: 200,
            sucses: 'ok'
        })
      } catch (err) {
            throw new Error(err)
      }
    }
   
