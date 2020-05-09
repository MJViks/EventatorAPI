import Router from 'koa-router'
import config from '../../appConfig.json'
import {deleteProductController, deleteEventController, deleteProductGroupController} from '../controllers/delete'
import errorHandler from './errorHandler'
const router = new Router()

const version = '/' + config.api.version

router.delete(version + '/Event', async(ctx)=>{
    try {
        ctx.body = await deleteEventController({...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.delete(version + '/ProductGroup', async(ctx)=>{
    try {
        ctx.body = await deleteProductGroupController({...ctx.query}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.delete(version + '/Product', async(ctx)=>{
    try {       
        ctx.body = await deleteProductController({...ctx.query}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

export default router