import Router from 'koa-router'
import config from '../../appConfig.json'
import errorHandler from './errorHandler'
import {getStatsByUsersController, getStatsByEventController, getStatsByGroupController,
        getUsersController, getLogsController,
        getProductController, getProductsController, getProductGroupController,
        getProductGroupsController, getEventInfoController, getUserController, getAuth} from '../controllers/get'
const router = new Router()

const version = '/' + config.api.version


router.get(version + '/', async(ctx, next) =>{
    ctx.body = 'Hello World!'
})

router.get(version + '/EventInfo', async(ctx)=>{
    try {
        ctx.body = await getEventInfoController({...ctx.request.query},{...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/Auth', async(ctx)=>{
    try {
        ctx.body = await getAuth({...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/ProductGroups', async(ctx)=>{
    try {
        ctx.body = await getProductGroupsController({...ctx.request.query}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/ProductGroup', async(ctx)=>{
    try {
        ctx.body = await getProductGroupController({...ctx.request.query}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/Products', async(ctx)=>{
    try {
        ctx.body = await getProductsController({...ctx.request.query}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/Product', async(ctx)=>{
    try {
        ctx.body = await getProductController({...ctx.request.query}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/Logs', async(ctx)=>{
    try {
        ctx.body = await getLogsController({...ctx.request.query}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/Users', async(ctx)=>{
    try {
        ctx.body = await getUsersController({...ctx.request.query}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/User', async(ctx)=>{
    try {
        ctx.body = await getUserController({...ctx.request.query}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/getStatsByGroup', async(ctx)=>{
    try {
        ctx.body = await getStatsByGroupController({...ctx.request.query}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/getStatsByEvent', async(ctx)=>{
    try {
        ctx.body = await getStatsByEventController({...ctx.request.query}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

router.get(version + '/StatsByUsers', async(ctx)=>{
    try {
        ctx.body = await getStatsByUsersController({...ctx.request.query}, {...ctx.header})
    } catch (error) {
        errorHandler(ctx, error)
    }
})

export default router