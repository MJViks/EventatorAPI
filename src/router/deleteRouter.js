import Router from 'koa-router'
import config from '../../appConfig.json'
import {deleteProduct} from '../api/delete'
import errorHandler from './errorHandler'
const router = new Router()

const version = '/' + config.api.version

router.delete(version + '/deleteEvent', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.delete(version + '/deleteProductGroup', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.delete(version + '/deleteProduct', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    const result = await deleteProduct({...ctx.query})
    ctx.body = result
    } catch (error) {
        errorHandler(ctx, error)
    }
})

export default router