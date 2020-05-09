// getStatsByUsersController, getStatsByEventController, getStatsByGroupController,
//         getUsersByEventController, getLogsController, getProductsByGroupController, 
//         getProductController, getProductsController, getEventController
//         
import {auth} from './func/auth'
import {getEventInfoByEventId} from '../models/EventInfo'
import {getProductGroupsByEventId, getProductGroupById} from '../models/ProductGroup'
import config from '../../appConfig.json'
import {getProductByIdandEventId, getProductsByProductGroupId, getProductsByEventId} from '../models/Product'
import {getLogsByEventId, getLogsByUserId} from '../models/Log'
import {getUsersByLogId, getUsersByEventId, getUserByIdandEventId} from '../models/User'

export const getEventInfoController = async({depth},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
    try {
          //Get event and auth
        let event = await auth(0, nameHash, codeHash)
         
        if(depth === 1 || depth === '1' || depth === 'true')    
            depth = true
        if(depth === 0 || depth === '0' || depth === 'false')    
            depth = false

        let EventInfo = await getEventInfoByEventId(event.id)
        EventInfo.nameHash = '***'
        
        if(depth){
            EventInfo.ProdictGroups = await getProductGroupsByEventId(event.id, config.api.getConstreint)
            for (let ProductGroup in  EventInfo.ProdictGroups)
                EventInfo.ProdictGroups[ProductGroup]['products'] = await getProductsByProductGroupId(EventInfo.ProdictGroups[ProductGroup].idProductGroup, config.api.getConstreint)
        }
            
        return({
            //Server response
            status: 200,
            sucses: 'ok',
            EventInfo
            })
    } catch (err) {
        //Error return
        throw new Error(err)
    }
}

export const getProductGroupsController = async({count, depth},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
    try {
        count = +count
        if(isNaN(count) || count > config.api.getConstreint)
            throw new Error('invalid input data.')
        count = Math.floor(count)
          //Get event and auth

          if(depth === 1 || depth === '1' || depth === 'true')    
          depth = true
          if(depth === 0 || depth === '0' || depth === 'false' || depth === undefined)    
          depth = false

        let event = await auth(0, nameHash, codeHash)
        let ProductGroups = await getProductGroupsByEventId(event.id, count)
        if(depth)
        for (let ProductGroup in  ProductGroups)
            ProductGroups[ProductGroup]['products'] = await getProductsByProductGroupId(ProductGroups[ProductGroup].idProductGroup, config.api.getConstreint)

        return({
            //Server response
            status: 200,
            sucses: 'ok',
            ProductGroups
            })
    } catch (err) {
        //Error return
        throw new Error(err)
    }
}

export const getProductGroupController = async({id, depth},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
    try {
        id = +id
        if(isNaN(id))
            throw new Error('invalid input data.')
        if(depth === 1 || depth === '1' || depth === 'true')    
            depth = true
        if(depth === 0 || depth === '0' || depth === 'false' || depth === undefined)    
            depth = false
          //Get event and auth
        await auth(0, nameHash, codeHash)
         
        let ProductGroup = await getProductGroupById(id)
        if(depth)
            ProductGroup['products'] = await getProductsByProductGroupId(id, config.api.getConstreint)
        return({
            //Server response
            status: 200,
            sucses: 'ok',
            ProductGroup
            })
    } catch (err) {
        //Error return
        throw new Error(err)
    }
}

export const getProductController = async({id},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
    try {
        id = +id
        
        if(isNaN(id))
            throw new Error('invalid input data.')
        id = Math.floor(id)
        
        //Get event and auth
      let event = await auth(0, nameHash, codeHash)
       
      let product = await getProductByIdandEventId(id, event.id)
      return({
          //Server response
          status: 200,
          sucses: 'ok',
          product
          })
  } catch (err) {
      //Error return
      throw new Error(err)
  }
}

export const getProductsController = async({count},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
    try {
        count = +count
        
        if(isNaN(count) || count > config.api.getConstreint)
            throw new Error('invalid input data.')
        count = Math.floor(count)
          //Get event and auth

        let event = await auth(0, nameHash, codeHash)
        let Products = await getProductsByEventId(event.id, count)

        return({
            //Server response
            status: 200,
            sucses: 'ok',
            Products
            })
    } catch (err) {
        //Error return
        throw new Error(err)
    }
}

export const getLogsController = async({count, depth},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
    try {
        count = +count

        if(depth === 1 || depth === '1' || depth === 'true')    
            depth = true
        if(depth === 0 || depth === '0' || depth === 'false' || depth === undefined)    
            depth = false

        if(isNaN(count) || count > config.api.getConstreint)
            throw new Error('invalid input data.')
        count = Math.floor(count)
          //Get event and auth

        let event = await auth(0, nameHash, codeHash)
        let Logs = await getLogsByEventId(event.id, count)
        if(depth)
            for (let Log in Logs)
                Logs[Log]['user'] = await getUsersByLogId(Logs[Log].idLog, config.api.getConstreint)


        return({
            //Server response
            status: 200,
            sucses: 'ok',
            Logs
            })
    } catch (err) {
        //Error return
        throw new Error(err)
    }
}

export const getUsersController = async({count, depth},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
    try {
        count = +count

        if(depth === 1 || depth === '1' || depth === 'true')    
            depth = true
        if(depth === 0 || depth === '0' || depth === 'false' || depth === undefined)    
            depth = false

        if(isNaN(count) || count > config.api.getConstreint)
            throw new Error('invalid input data.')
        count = Math.floor(count)
          //Get event and auth

        let event = await auth(0, nameHash, codeHash)
        let Users = await getUsersByEventId(event.id, count)
        if(depth)
            for (let User in Users)
                Users[User]['logs'] = await getLogsByUserId(Users[User].idUser, config.api.getConstreint)


        return({
            //Server response
            status: 200,
            sucses: 'ok',
            Users
            })
    } catch (err) {
        //Error return
        throw new Error(err)
    }
}

export const getUserController = async({id, depth},{['name-hash']: nameHash, ['code-hash']: codeHash}) =>  {
    try {   
        id = +id
        
        if(isNaN(id))
            throw new Error('invalid input data.')
        id = Math.floor(id)
        if(depth > 1 || depth === '1' || depth === 'true')    
            depth = true
        if(depth === 0 || depth === '0' || depth === 'false' || depth === undefined)    
            depth = false

          //Get event and auth

        let event = await auth(0, nameHash, codeHash)
        let User = await getUserByIdandEventId(id, event.id)
        if(depth)
            User['logs'] = await getLogsByUserId(User.id, config.api.getConstreint)
        return({
            //Server response
            status: 200,
            sucses: 'ok',
            User
            })
    } catch (err) {
        //Error return
        throw new Error(err)
    }
}