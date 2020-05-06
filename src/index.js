// import DB from './db'
import Koa from 'koa'
import koaBody from 'koa-body'

import getRouter from './router/getRouter'
import postRouter from './router/postRouter'
import putRouter from './router/putRouter'
import deleteRouter from './router/deleteRouter'

const app = new Koa();





app.use(koaBody())
app.use(async (ctx, next) =>{
   
   await next()
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

app.listen(8080, ()=> console.log('Server has been started ;)'))