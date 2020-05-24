// import DB from './db'
import Koa from 'koa'
import koaBody from 'koa-body'
import getRouter from './router/getRouter'
import postRouter from './router/postRouter'
import putRouter from './router/putRouter'
import deleteRouter from './router/deleteRouter'
import chAPIKey from './middleware/chAPIKey'
import ddos from './middleware/ddos'
import env from 'dotenv'
env.config()

const app = new Koa()

//version
app.env = 'Release v1.0.4'

app.use(ddos)

app.use(koaBody())

//API Key Check
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

//If the route is not found
app.use(async(ctx) => {
	ctx.status = 404
	ctx.body = {
		status: 404,
		message: 'Page not found'
	}
})

// https.createServer(app.callback()).listen(config.api.port)
app.listen(process.env.APP_PORT, ()=> console.log('Server has been started ;)'))