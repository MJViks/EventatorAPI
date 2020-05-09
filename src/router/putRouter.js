import Router from 'koa-router'
import config from '../../appConfig.json'
import errorHandler from './errorHandler'
import {setProductBuyController, updateEventInfoController,
        updateEditPassController, updateAdminPassController,
        updateProductGroupController} from '../controllers/put'
const router = new Router()

const version = '/' + config.api.version

router.put(version + '/setBuy', async(ctx)=>{
    try {
        ctx.body = await setProductBuyController({...ctx.request.body}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.put(version + '/EventInfo', async(ctx)=>{
    try {
        ctx.body = await updateEventInfoController({...ctx.request.body}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.put(version + '/EditPass', async(ctx)=>{
    try {
        ctx.body = await updateEditPassController({...ctx.request.body}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.put(version + '/AdminPass', async(ctx)=>{
    try {
        ctx.body = await updateAdminPassController({...ctx.request.body}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.put(version + '/ProductGroup', async(ctx)=>{
    try {
        ctx.body = await updateProductGroupController({...ctx.request.body}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

export default router