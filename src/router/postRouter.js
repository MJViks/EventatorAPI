import Router from 'koa-router'
import config from '../../appConfig.json'
import errorHandler from './errorHandler'
import {createUserController, createEventController, createProductGroupController, createProductController} from '../controllers/post'
const router = new Router()

const version = '/' + config.api.version

router.post(version + '/createUser', async(ctx)=>{
    try {        
       ctx.body = await createUserController({...ctx.request.body}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.post(version + '/createEvent', async(ctx)=>{
    try { 
        ctx.body = await createEventController({...ctx.request.body}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.post(version + '/createProductGroup', async(ctx)=>{
    try {
        ctx.body = await createProductGroupController({...ctx.request.body}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.post(version + '/createProduct', async(ctx)=>{
    try { 
        ctx.body = await createProductController({...ctx.request.body}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

export default router