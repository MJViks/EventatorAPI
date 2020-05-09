import config from '../../appConfig.json'
export default async(ctx, next) => {
    
    let key = ctx.header.apikey
    for(let keys in config.apiKeys)
        if (key === config.apiKeys[keys])
            await next()
        else{
            ctx.status = 500;
            ctx.body = {
            status: 500,
            message: 'Invalid API Key'
            };  
        }

}