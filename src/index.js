// import DB from './db'
import Koa from 'koa'
import koaBody from 'koa-body'
import config from '../appConfig.json'
import https from 'https'
import getRouter from './router/getRouter'
import postRouter from './router/postRouter'
import putRouter from './router/putRouter'
import deleteRouter from './router/deleteRouter'
import chAPIKey from './middleware/chAPIKey'

const app = new Koa();


app.env = "Release v1.0.0.0"

app.use(koaBody())
app.use(async (ctx, next) =>{
  await chAPIKey(ctx, next)
})

app.use(getRouter.routes())
app.use(getRouter.allowedMethods())

app.use(postRouter.routes())
app.use(postRouter.allowedMethods())

app.use(putRouter.routes())
app.use(putRouter.allowedMethods())

app.use(deleteRouter.routes())
app.use(deleteRouter.allowedMethods())

app.use(async(ctx) => {
    ctx.status = 404
    ctx.body = {
        status: 404,
        message: 'Page not found'
     };
})

// https.createServer(app.callback()).listen(config.api.port)
app.listen(8080, ()=> console.log('Server has been started ;)'))