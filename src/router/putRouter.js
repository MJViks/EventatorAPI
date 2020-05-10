import Router from 'koa-router'
import config from '../../appConfig.json'
import errorHandler from './errorHandler'
const router = new Router()

const version = '/' + config.api.version

router.put(version + '/setBuy', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.put(version + '/EventInfo', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.put(version + '/EditPass', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.put(version + '/AdminPass', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.put(version + '/ProductGroup', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})






export default router