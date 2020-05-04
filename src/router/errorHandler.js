export default (ctx, err) => {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
    message: err.message
 };
}