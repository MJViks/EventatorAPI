import DB from '../db'
import {EventID} from './auth'
import Log from './log'
import chResponse from './chDbResponse'

export const deleteProduct = async({idProduct ,nameHash, codeHash, editPassHash, userId}) =>  {
      try {  
        //Make numbers
        userId = +userId
        idProduct = +idProduct 
        //Checking data
        if(idProduct !== 0 && userId !== 0){  
          //Get Event ID
          let eventId = await EventID(nameHash, codeHash, editPassHash)
          //Create a product name
          let prodictName = false
          //Check product availability
          let data = await DB.query(`select [Product].[Name] from Product ` +
          `join productGroup on productGroup_ID = ID_ProductGroup ` +
          `join [Event] on Event_ID = id_Event where ` +
          `ID_Event = ${eventId} ` +
          `AND id_Product = ${idProduct}`)
         
            // Response test
            if(await chResponse(data, 'Product delete'))
                prodictName = data.recordset[0].Name
          //if a product name exists
      
          if(prodictName)
          //Product removal
            data = await DB.delete('Product', idProduct)

              if(await chResponse(data, 'Product delete'))
                Log(userId, 'Удален ' + prodictName,  eventId)
           
            
            return({
              //Server response
                status: 200,
                sucses: 'ok'
              })
        }
        else
          throw new Error('Product delete error. Invalid input data.')
          
      } catch (err) {
        //Error return
            throw new Error(err)
      }
    }
   
