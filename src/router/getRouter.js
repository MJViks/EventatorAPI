import Router from 'koa-router'
import config from '../../appConfig.json'
import errorHandler from './errorHandler'
const router = new Router()

const version = '/' + config.api.version


router.get(version + '/', async(ctx, next) =>{
    ctx.body = 'Hello World!'
})

router.get(version + '/getEventInfo', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/getProductGroupsInfo', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/getProductGroupInfo', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/getProducts', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/getProduct', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/getProductsByGroup', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/getLogs', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/getUsers', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/getStatsByGroup', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/getStatsByEvent', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/getStatsByUser', async(ctx)=>{
    try {
    //    console.log(ctx.query.id); 
    console.log(ctx.request.body);
    } catch (error) {
        errorHandler(ctx, error)
    }
})

export default router