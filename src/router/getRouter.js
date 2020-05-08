import Router from 'koa-router'
import config from '../../appConfig.json'
import errorHandler from './errorHandler'
const router = new Router()

const version = '/' + config.api.version


router.get(version + '/', async(ctx, next) =>{
    ctx.body = 'Hello World!'
})

router.get(version + '/EventInfo', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/ProductGroupsInfo', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/ProductGroupInfo', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/Products', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/Product', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/ProductsByGroup', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/Logs', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/Users', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/StatsByGroup', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/StatsByEvent', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/StatsByUser', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

export default router