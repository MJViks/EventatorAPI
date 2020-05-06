export default (ctx, err) => {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
    status: ctx.status,
    message: err.message
};  
console.log(err);

}