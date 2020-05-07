import {auth} from './func/auth'
import Log from './func/log'
import {deleteProduct, getProductById} from '../models/Product'
import {getUserByIdandEventId} from '../models/User'
import {deleteEvent} from '../models/Event'
import {getProductGroupById, deleteProductGroup} from '../models/ProductGroup'

export const deleteProductController = async({idProduct, userId},{['name-hash']: nameHash, ['code-hash']: codeHash, ['edit-pass-hash']: editPassHash}) =>  {  
      try {  
        userId = +userId
        idProduct = +idProduct 
        //Checking data
        if(idProduct !== 0 && userId !== 0){  
          //Get event and auth
          let event = await auth(1, nameHash, codeHash, editPassHash)
          //Check User in event
          await getUserByIdandEventId(userId, event.id)
           //Get product
          let product = await getProductById(idProduct)
           //delete product
          if(await deleteProduct(idProduct)){
            //Add log
            await Log(userId, 'Удалена группа ' + product.name)
            return({
              //Server response
                status: 200,
                sucses: 'ok'
              })
          }
        }
        else
          throw new Error('Product delete error. Invalid input data.')
          
      } catch (err) {
        //Error return
            throw new Error(err)
      }
}

export const deleteEventController = async({['name-hash']: nameHash, ['code-hash']: codeHash, ['admin-pass-hash']: adminPassHash}) =>  {
  try {  
      //Get event and auth
      let event = await auth(2, nameHash, codeHash, adminPassHash)
       //delete event
      if(await deleteEvent(event.id)){
        return({
          //Server response
            status: 200,
            sucses: 'ok'
          })
      }
    else
      throw new Error('Event delete error. Invalid input data.')
      
  } catch (err) {
    //Error return
        throw new Error(err)
  }
}

export const deleteProductGroupController = async({idProductGroup, userId}, 
  {['name-hash']: nameHash, ['code-hash']: codeHash, ['edit-pass-hash']: editPassHash}) =>  {
  try {  
    userId = +userId
    idProductGroup = +idProductGroup
    //Checking data
    if(idProductGroup !== 0 && userId !== 0){  
      //Get event and auth
      let event = await auth(1, nameHash, codeHash, editPassHash)
      //Check User in event
      await getUserByIdandEventId(userId, event.id)
       //Get productGroup
      let productGroup = await getProductGroupById(idProductGroup)
       //delete productGroup
      if(await deleteProductGroup(idProductGroup)){
        //Add log
        await Log(userId, 'Удален ' + productGroup.name)
        return({
          //Server response
            status: 200,
            sucses: 'ok'
          })
      }
    }
    else
      throw new Error('Product group delete error. Invalid input data.')
      
  } catch (err) {
    //Error return
        throw new Error(err)
  }
}
   
